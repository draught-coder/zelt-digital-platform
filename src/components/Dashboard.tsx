import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, userRole } = useAuth();
  if (!user) return <div>Please log in.</div>;
  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>Your role: {userRole}</p>
    </div>
  );
} 