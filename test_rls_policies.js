// Test script to verify RLS policies are working
const { createClient } = require('@supabase/supabase-js');

// Get environment variables from .env file
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables');
  console.log('VITE_SUPABASE_URL:', !!supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY:', !!supabaseKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRLSPolicies() {
  console.log('Testing RLS policies...\n');

  // Test 1: Public read access to blog posts (should work without auth)
  console.log('1. Testing public read access to blog posts...');
  try {
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Blog posts public read failed:', error.message);
    } else {
      console.log('✅ Blog posts public read successful:', blogPosts?.length || 0, 'posts found');
    }
  } catch (err) {
    console.error('❌ Blog posts public read error:', err.message);
  }

  // Test 2: Public read access to tax rates (should work without auth)
  console.log('\n2. Testing public read access to individual tax rates...');
  try {
    const { data: taxRates, error } = await supabase
      .from('individual_tax_rates')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Tax rates public read failed:', error.message);
    } else {
      console.log('✅ Tax rates public read successful:', taxRates?.length || 0, 'rates found');
    }
  } catch (err) {
    console.error('❌ Tax rates public read error:', err.message);
  }

  // Test 3: Check if there are any bookkeeper users
  console.log('\n3. Checking for bookkeeper users...');
  try {
    const { data: bookkeepers, error } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('role', 'bookkeeper');
    
    if (error) {
      console.error('❌ Bookkeeper query failed:', error.message);
    } else {
      console.log('✅ Found', bookkeepers?.length || 0, 'bookkeeper users:');
      bookkeepers?.forEach(bk => {
        console.log(`   - ${bk.email} (${bk.id})`);
      });
    }
  } catch (err) {
    console.error('❌ Bookkeeper query error:', err.message);
  }

  // Test 4: Check if there are any admin users in user_roles table
  console.log('\n4. Checking for admin users in user_roles table...');
  try {
    const { data: admins, error } = await supabase
      .from('user_roles')
      .select('user_id, role');
    
    if (error) {
      console.error('❌ Admin roles query failed:', error.message);
    } else {
      console.log('✅ Found', admins?.length || 0, 'admin role entries:');
      admins?.forEach(admin => {
        console.log(`   - User ${admin.user_id} has role: ${admin.role}`);
      });
    }
  } catch (err) {
    console.error('❌ Admin roles query error:', err.message);
  }

  console.log('\nRLS policy testing complete!');
}

testRLSPolicies().catch(console.error); 