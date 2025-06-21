import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qoxrvutbthltejghhqzb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveHJ2dXRidGhsdGVqZ2hocXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODMzNDksImV4cCI6MjA2NTU1OTM0OX0.CxkMdKCvjc3zUbwjDi_8gqsjsJJRkDZ_ZizYK-AXIpI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugUserStatus() {
  console.log('🔍 Debugging user status for admin@ibnzelt.com...\n')
  
  try {
    // Check profiles table first (this should work)
    console.log('1️⃣ Checking profiles table...')
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@ibnzelt.com')
    
    if (profileError) {
      console.log('❌ Profile error:', profileError.message)
    } else {
      console.log('✅ Profiles found:', profiles?.length || 0)
      if (profiles && profiles.length > 0) {
        console.log('📋 Profile data:', JSON.stringify(profiles[0], null, 2))
      }
    }
    
    // Try to get all profiles to see what's in the table
    console.log('\n2️⃣ Checking all profiles...')
    const { data: allProfiles, error: allProfilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5)
    
    if (allProfilesError) {
      console.log('❌ All profiles error:', allProfilesError.message)
    } else {
      console.log('📊 Total profiles in table:', allProfiles?.length || 0)
      if (allProfiles && allProfiles.length > 0) {
        console.log('📋 Sample profiles:')
        allProfiles.forEach((profile, index) => {
          console.log(`   ${index + 1}. ${profile.email} (${profile.role})`)
        })
      }
    }
    
    // Try to create a test user via signup
    console.log('\n3️⃣ Attempting to create test user...')
    const testEmail = 'test@ibnzelt.com'
    const testPassword = 'TestPassword123!'
    
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          role: 'bookkeeper',
          full_name: 'Test User'
        }
      }
    })
    
    if (signupError) {
      console.log('❌ Signup error:', signupError.message)
    } else {
      console.log('✅ Signup successful:', signupData.user?.email)
      console.log('📧 Check email for confirmation or confirm manually in dashboard')
    }
    
    // Try to sign in with the test user
    console.log('\n4️⃣ Testing login with test user...')
    const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    })
    
    if (signinError) {
      console.log('❌ Signin error:', signinError.message)
    } else {
      console.log('✅ Signin successful:', signinData.user?.email)
      
      // Check if profile was created
      const { data: newProfile, error: newProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', signinData.user?.id)
        .single()
      
      if (newProfileError) {
        console.log('❌ New profile error:', newProfileError.message)
      } else {
        console.log('✅ New profile found:', newProfile)
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
  
  console.log('\n🎯 Next Steps:')
  console.log('1. Go to Supabase Dashboard > Authentication > Users')
  console.log('2. Check if admin@ibnzelt.com exists')
  console.log('3. If not, create it manually with a password')
  console.log('4. If it exists, make sure email is confirmed')
  console.log('5. Try logging in with the correct password')
}

debugUserStatus() 