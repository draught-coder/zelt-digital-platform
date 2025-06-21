-- Fix Admin User Login Issue
-- This script will help resolve the "Database error saving new user" issue

-- Step 1: Check if the user exists in auth.users
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    updated_at
FROM auth.users 
WHERE email = 'admin@ibnzelt.com';

-- Step 2: Check the profiles table
SELECT 
    id,
    email,
    role,
    full_name,
    created_at,
    updated_at
FROM profiles 
WHERE email = 'admin@ibnzelt.com';

-- Step 3: Check if there are any triggers that might be causing issues
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'profiles';

-- Step 4: Check RLS policies on profiles table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Step 5: If the user doesn't exist in auth.users, we need to create it manually
-- First, let's disable any triggers temporarily
-- DROP TRIGGER IF EXISTS handle_new_user ON auth.users;

-- Step 6: Create the user manually in auth.users (if it doesn't exist)
-- This should be done through Supabase Dashboard or Auth API, not direct SQL
-- But we can check if the profile UUID matches what we expect

-- Step 7: If the profile exists but user doesn't, we need to either:
-- A) Create the user with the same UUID as the profile
-- B) Update the profile to match the new user UUID

-- Let's check what UUID the profile has:
SELECT 
    'Profile UUID' as type,
    id as uuid
FROM profiles 
WHERE email = 'admin@ibnzelt.com'

UNION ALL

SELECT 
    'Auth User UUID' as type,
    id as uuid
FROM auth.users 
WHERE email = 'admin@ibnzelt.com';

-- Step 8: Check for any foreign key constraints
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name = 'profiles'; 