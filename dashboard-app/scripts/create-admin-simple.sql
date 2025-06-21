-- Create a sample admin (bookkeeper) user for testing
-- This script should be run in the Supabase SQL editor

-- First, create the user in auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@financialflow.com',
  crypt('Admin123!', gen_salt('bf')),
  NOW(),
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{"role":"bookkeeper","full_name":"Sample Admin User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Get the user ID we just created
DO $$
DECLARE
  user_id UUID;
BEGIN
  -- Get the user ID
  SELECT id INTO user_id 
  FROM auth.users 
  WHERE email = 'admin@financialflow.com';
  
  -- Insert the profile (this should also be done by the trigger, but we'll do it manually to be sure)
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (user_id, 'admin@financialflow.com', 'bookkeeper', 'Sample Admin User')
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name;
    
  RAISE NOTICE 'Sample admin user created with ID: %', user_id;
END $$;

-- Display the created user
SELECT 
  u.id,
  u.email,
  p.role,
  p.full_name,
  u.created_at
FROM auth.users u
JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@financialflow.com'; 