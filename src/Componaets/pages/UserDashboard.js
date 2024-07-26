import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true }); // Redirect to login if no token
      return;
    }

    if (!currentUser) {
      // If currentUser is not set, it might be because of an error or delay in setting it
      // In this case, you might want to fetch the data again or handle the loading state differently
      // But generally, you should have currentUser available if the AuthContext is properly managed
      // Optionally set loading to false here if there's an issue
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [currentUser, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {currentUser.name}</h1>
      {/* Render other user data here */}
    </div>
  );
}
