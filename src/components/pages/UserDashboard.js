import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { currentUser, triggerProfileUpdate } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      // Check if user is logged in
      const token = localStorage.getItem("userAuthToken");
      if (!token) {
        navigate("/user/login", { replace: true }); // Redirect to login if no token
        return;
      }

      // Fetch user profile if necessary
      if (!currentUser) {
        try {
          // Trigger profile update if needed
          triggerProfileUpdate();
        } catch (err) {
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Set loading to false if user data is already present
      }
    }

    checkUser();
  }, [currentUser, navigate, triggerProfileUpdate]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome, {currentUser.name}</h1>
      {/* Render other user data as needed */}
    </div>
  );
}
