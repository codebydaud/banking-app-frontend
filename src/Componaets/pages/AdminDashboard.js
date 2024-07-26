import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TanStackTable from "../TanStackTable";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const { currentAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminAuthToken");
    if (!adminToken) {
      navigate("/admin/login", { replace: true }); // Redirect to admin login if no token
      return;
    }

    if (!currentAdmin) {
      // Optionally handle the case where currentAdmin is not set
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [currentAdmin, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pt-4 min-h-screen bg-gray-900">
      <TanStackTable data={currentAdmin} />
    </div>
  );
}
