// Import necessary libraries
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  // Handle preflight OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the user's authorization
    const userSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Get the currently authenticated user
    const { data: { user } } = await userSupabaseClient.auth.getUser();

    // If no user is authenticated, return an error
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized: No user is authenticated.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // Fetch the profile of the authenticated user to check their role
    const { data: profile, error: profileError } = await userSupabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Could not retrieve user profile.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      });
    }

    // Check if the user's role is 'bookkeeper'
    if (profile.role !== 'bookkeeper') {
      return new Response(JSON.stringify({ error: 'Forbidden: Only bookkeepers can create users.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      });
    }

    // --- All security checks passed ---
    
    // Create a Supabase admin client with the service role key for elevated privileges
    const adminSupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the new user's details from the request body
    const { fullName, email, password, role } = await req.json();

    // Validate the incoming data
    if (!fullName || !email || !password || !role) {
      return new Response(JSON.stringify({ error: 'Missing required fields: fullName, email, password, role.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    
    if (role !== 'client' && role !== 'bookkeeper') {
        return new Response(JSON.stringify({ error: "Invalid role. Must be 'client' or 'bookkeeper'." }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
    }


    // Create the new user in Supabase Auth
    const { data: newUserData, error: createError } = await adminSupabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
    });

    if (createError) {
      throw createError;
    }
    
    const newUserId = newUserData.user.id;

    // Add the new user's details to the 'profiles' table
    const { error: insertError } = await adminSupabaseClient
      .from('profiles')
      .insert({
        id: newUserId,
        full_name: fullName,
        role: role,
        email: email, // Also storing email in profiles table for convenience
      });

    if (insertError) {
        // If inserting the profile fails, we should attempt to delete the auth user
        // to avoid having an orphaned auth user without a profile.
        await adminSupabaseClient.auth.admin.deleteUser(newUserId);
        throw insertError;
    }

    // Return a success response
    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    // Handle any unexpected errors
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}); 