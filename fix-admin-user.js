import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qoxrvutbthltejghhqzb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveHJ2dXRidGhsdGVqZ2hocXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODMzNDksImV4cCI6MjA2NTU1OTM0OX0.CxkMdKCvjc3zUbwjDi_8gqsjsJJRkDZ_ZizYK-AXIpI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixAdminUser() {
  console.log('🔧 Fixing admin user login issue...\n')
  
  const adminEmail = 'admin@ibnzelt.com'
  const adminPassword = 'AdminPassword123!' // You can change this password
  
  try {
    // Step 1: Create the admin user in Supabase Auth
    console.log('1️⃣ Creating admin user in Supabase Auth...')
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          role: 'admin',
          full_name: 'Admin User'
        }
      }
    })
    
    if (signupError) {
      console.log('❌ Signup error:', signupError.message)
      
      // If user already exists, try to sign in
      if (signupError.message.includes('already registered')) {
        console.log('⚠️  User already exists, trying to sign in...')
        const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        })
        
        if (signinError) {
          console.log('❌ Signin error:', signinError.message)
          console.log('💡 The password might be different. Please check the password in Supabase Dashboard.')
        } else {
          console.log('✅ Signin successful!')
          console.log('📧 User ID:', signinData.user?.id)
          console.log('📧 Email confirmed:', !!signinData.user?.email_confirmed_at)
        }
      }
    } else {
      console.log('✅ Signup successful!')
      console.log('📧 User ID:', signupData.user?.id)
      console.log('📧 Email confirmed:', !!signupData.user?.email_confirmed_at)
      
      if (!signupData.user?.email_confirmed_at) {
        console.log('⚠️  Email not confirmed. You need to confirm it manually.')
        console.log('💡 Go to Supabase Dashboard > Authentication > Users')
        console.log('💡 Find admin@ibnzelt.com and click "Confirm"')
      }
    }
    
    // Step 2: Check if profile exists and matches
    console.log('\n2️⃣ Checking profile table...')
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', adminEmail)
    
    if (profileError) {
      console.log('❌ Profile error:', profileError.message)
    } else {
      console.log('✅ Profile found:', profiles?.length || 0)
      if (profiles && profiles.length > 0) {
        console.log('📋 Profile data:', profiles[0])
      }
    }
    
    // Step 3: Test login
    console.log('\n3️⃣ Testing login...')
    const { data: testSignin, error: testError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    })
    
    if (testError) {
      console.log('❌ Test login failed:', testError.message)
      
      if (testError.message.includes('Email not confirmed')) {
        console.log('\n🎯 SOLUTION:')
        console.log('1. Go to https://app.supabase.com/')
        console.log('2. Select your project')
        console.log('3. Go to Authentication > Users')
        console.log('4. Find admin@ibnzelt.com')
        console.log('5. Click the "Confirm" button')
        console.log('6. Try logging in again with password:', adminPassword)
      } else if (testError.message.includes('Invalid login credentials')) {
        console.log('\n🎯 SOLUTION:')
        console.log('1. Go to https://app.supabase.com/')
        console.log('2. Select your project')
        console.log('3. Go to Authentication > Users')
        console.log('4. Find admin@ibnzelt.com')
        console.log('5. Click "Edit" and set a new password')
        console.log('6. Try logging in with the new password')
      }
    } else {
      console.log('✅ Test login successful!')
      console.log('🎉 You can now log in with:')
      console.log('   Email: admin@ibnzelt.com')
      console.log('   Password:', adminPassword)
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

fixAdminUser() 