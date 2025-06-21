import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qoxrvutbthltejghhqzb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveHJ2dXRidGhsdGVqZ2hocXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI5NzAsImV4cCI6MjA1MDU0ODk3MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAndCreateUser() {
  console.log('🔍 Checking if admin@ibnzelt.com exists...')
  
  try {
    // First, let's check if the user exists in auth.users
    const { data: authUsers, error: authError } = await supabase
      .from('auth.users')
      .select('*')
      .eq('email', 'admin@ibnzelt.com')
    
    if (authError) {
      console.log('❌ Error checking auth.users:', authError.message)
      return
    }
    
    console.log('📧 Auth users found:', authUsers?.length || 0)
    
    if (authUsers && authUsers.length > 0) {
      console.log('✅ User exists in auth.users:', authUsers[0])
      
      // Check if user is confirmed
      if (!authUsers[0].email_confirmed_at) {
        console.log('⚠️  User email not confirmed. Confirming now...')
        
        // We can't directly update auth.users, so we'll need to use the admin API
        console.log('💡 You need to confirm the email manually in Supabase Dashboard:')
        console.log('   Go to Authentication > Users > Find admin@ibnzelt.com > Click "Confirm"')
      }
    } else {
      console.log('❌ User does not exist in auth.users')
      console.log('💡 You need to create the user in Supabase Dashboard:')
      console.log('   Go to Authentication > Users > Add User')
      console.log('   Email: admin@ibnzelt.com')
      console.log('   Password: (set a secure password)')
    }
    
    // Check profiles table
    console.log('\n🔍 Checking profiles table...')
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@ibnzelt.com')
    
    if (profileError) {
      console.log('❌ Error checking profiles:', profileError.message)
      return
    }
    
    console.log('👤 Profiles found:', profiles?.length || 0)
    
    if (profiles && profiles.length > 0) {
      console.log('✅ Profile exists:', profiles[0])
    } else {
      console.log('❌ No profile found for admin@ibnzelt.com')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkAndCreateUser() 