# Sample Admin User Creation

This directory contains scripts to create a sample admin (bookkeeper) user for testing the Financial Flow Dashboard.

## Sample Admin Credentials

- **Email**: `admin@financialflow.com`
- **Password**: `Admin123!`
- **Role**: `bookkeeper`
- **Full Name**: `Sample Admin User`

## Method 1: Using Node.js Script (Recommended)

### Prerequisites
1. Node.js installed
2. Supabase service role key

### Steps
1. Get your Supabase service role key:
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy the "service_role" key (not the anon key)

2. Set the environment variable:
   ```bash
   # On Windows PowerShell
   $env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   
   # On Windows Command Prompt
   set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   
   # On macOS/Linux
   export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

3. Run the script:
   ```bash
   node scripts/create-sample-admin.js
   ```

## Method 2: Using SQL Script

### Steps
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `create-admin-simple.sql`
4. Click "Run" to execute the script

## Method 3: Manual Creation via UI

### Steps
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/auth?type=bookkeeper`

3. Click on "Sign Up" tab

4. Fill in the form:
   - Full Name: `Sample Admin User`
   - Email: `admin@financialflow.com`
   - Role: `bookkeeper`
   - Password: `Admin123!`
   - Confirm Password: `Admin123!`

5. Click "Create Account"

6. Check your email and confirm the account (or use the email confirmation link)

## Testing the Admin User

After creating the admin user, you can:

1. Login at: `http://localhost:5173/auth?type=bookkeeper`
2. Use the credentials:
   - Email: `admin@financialflow.com`
   - Password: `Admin123!`

3. You should be redirected to the bookkeeper dashboard where you can:
   - View all clients
   - Create financial statements
   - Manage tax computations
   - Access all admin features

## Security Notes

⚠️ **Important**: These are sample credentials for testing only. In production:

- Use strong, unique passwords
- Change the default credentials immediately
- Consider using environment variables for sensitive data
- Implement proper password policies
- Enable two-factor authentication for admin accounts

## Troubleshooting

### User already exists
If you get an error that the user already exists, you can either:
- Use a different email address
- Delete the existing user from Supabase Auth dashboard
- Use the SQL script to update the existing user

### Profile not created
If the user exists but the profile wasn't created, run this SQL in Supabase:
```sql
INSERT INTO public.profiles (id, email, role, full_name)
SELECT id, email, 'bookkeeper', 'Sample Admin User'
FROM auth.users
WHERE email = 'admin@financialflow.com'
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  full_name = EXCLUDED.full_name;
``` 