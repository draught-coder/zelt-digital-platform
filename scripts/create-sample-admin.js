const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = "https://zltfmtsqxetzsjusqwep.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to set this

// Sample admin user details
const ADMIN_USER = {
  email: 'admin@financialflow.com',
  password: 'Admin123!',
  fullName: 'Sample Admin User',
  role: 'bookkeeper'
};

async function createSampleAdmin() {
  if (!SUPABASE_SERVICE_KEY) {
    console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
    console.log('💡 To get your service role key:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to Settings > API');
    console.log('3. Copy the "service_role" key (not the anon key)');
    console.log('4. Set it as an environment variable:');
    console.log('   export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"');
    return;
  }

  // Create Supabase client with service role key for admin operations
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    console.log('🚀 Creating sample admin user...');
    
    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: ADMIN_USER.email,
      password: ADMIN_USER.password,
      email_confirm: true, // Auto-confirm email for testing
      user_metadata: {
        role: ADMIN_USER.role,
        full_name: ADMIN_USER.fullName
      }
    });

    if (authError) {
      console.error('❌ Error creating user in auth:', authError.message);
      return;
    }

    console.log('✅ User created successfully in auth system');
    console.log('📧 Email:', ADMIN_USER.email);
    console.log('🔑 Password:', ADMIN_USER.password);
    console.log('👤 Role:', ADMIN_USER.role);
    console.log('📝 Full Name:', ADMIN_USER.fullName);
    console.log('🆔 User ID:', authData.user.id);

    // The profile should be automatically created by the database trigger
    // Let's verify it was created
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('❌ Error fetching profile:', profileError.message);
    } else {
      console.log('✅ Profile created successfully');
      console.log('📊 Profile data:', profileData);
    }

    console.log('\n🎉 Sample admin user created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email: admin@financialflow.com');
    console.log('   Password: Admin123!');
    console.log('   Role: bookkeeper');
    console.log('\n🔗 You can now login at: http://localhost:5173/auth?type=bookkeeper');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the script
createSampleAdmin(); 