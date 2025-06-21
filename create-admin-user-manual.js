import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qoxrvutbthltejghhqzb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveHJ2dXRidGhsdGVqZ2hocXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODMzNDksImV4cCI6MjA2NTU1OTM0OX0.CxkMdKCvjc3zUbwjDi_8gqsjsJJRkDZ_ZizYK-AXIpI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUserManual() {
  console.log('🔧 Creating admin user manually...\n')
  
  const adminEmail = 'admin@ibnzelt.com'
  const adminPassword = 'AdminPassword123!'
  
  try {
    // Step 1: Get the existing profile UUID
    console.log('1️⃣ Getting existing profile UUID...')
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', adminEmail)
      .single()
    
    if (profileError) {
      console.log('❌ Profile error:', profileError.message)
      return
    }
    
    const profileId = profiles.id
    console.log('✅ Profile UUID:', profileId)
    
    // Step 2: Try to create user with a different email first
    console.log('\n2️⃣ Creating temporary user to test auth...')
    const tempEmail = 'temp-admin@ibnzelt.com'
    const { data: tempUser, error: tempError } = await supabase.auth.signUp({
      email: tempEmail,
      password: adminPassword
    })
    
    if (tempError) {
      console.log('❌ Temp user creation failed:', tempError.message)
      console.log('💡 This suggests there might be a database constraint issue.')
    } else {
      console.log('✅ Temp user created successfully')
      console.log('📧 Temp user ID:', tempUser.user?.id)
      
      // Step 3: Try to sign in with temp user
      console.log('\n3️⃣ Testing temp user login...')
      const { data: tempSignin, error: tempSigninError } = await supabase.auth.signInWithPassword({
        email: tempEmail,
        password: adminPassword
      })
      
      if (tempSigninError) {
        console.log('❌ Temp user login failed:', tempSigninError.message)
      } else {
        console.log('✅ Temp user login successful!')
        console.log('📧 Email confirmed:', !!tempSignin.user?.email_confirmed_at)
      }
    }
    
    // Step 4: Provide manual solution
    console.log('\n🎯 MANUAL SOLUTION REQUIRED:')
    console.log('The issue is that the profile exists but the user does not exist in Supabase Auth.')
    console.log('You need to create the user manually in the Supabase Dashboard:')
    console.log('')
    console.log('1. Go to https://app.supabase.com/')
    console.log('2. Select your project')
    console.log('3. Go to Authentication > Users')
    console.log('4. Click "Add User"')
    console.log('5. Enter the following details:')
    console.log('   - Email: admin@ibnzelt.com')
    console.log('   - Password: AdminPassword123!')
    console.log('   - Confirm the email immediately')
    console.log('')
    console.log('6. After creating the user, you may need to update the profile UUID:')
    console.log('   - Get the new user ID from the dashboard')
    console.log('   - Update the profile to match:')
    console.log(`   UPDATE profiles SET id = 'NEW_USER_ID' WHERE email = 'admin@ibnzelt.com';`)
    console.log('')
    console.log('7. Try logging in with:')
    console.log('   Email: admin@ibnzelt.com')
    console.log('   Password: AdminPassword123!')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

createAdminUserManual() 