import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Add role/fullName fields as needed

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={() => signIn(email, password)}>Sign In</button>
      {/* Add sign up form as needed */}
    </div>
  );
}
