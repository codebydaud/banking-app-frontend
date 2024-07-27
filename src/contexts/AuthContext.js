import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          setCurrentUser(null);
        });
    }

    const adminToken = localStorage.getItem("adminAuthToken");
    if (adminToken) {
      axios
        .get("http://localhost:8080/api/admin/accounts", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then((response) => {
          setCurrentAdmin(response.data);
        })
        .catch(() => {
          localStorage.removeItem("adminAuthToken");
          setCurrentAdmin(null);
        });
    }
  }, []);

  const login = async (identifier, password) => {
    const loginDetails = { identifier, password };
    const response = await axios.post(
      "http://localhost:8080/api/user/login",
      loginDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const token = response.data.token;
    localStorage.setItem("authToken", token);

    const userResponse = await axios.get(
      "http://localhost:8080/api/user/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCurrentUser(userResponse.data);
    navigate("/user/dashboard", { replace: true });
  };

  const adminLogin = async (identifier, password) => {
    const loginDetails = { identifier, password };
    const response = await axios.post(
      "http://localhost:8080/api/admin/login",
      loginDetails,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const token = response.data.token;
    localStorage.setItem("adminAuthToken", token);

    const adminResponse = await axios.get(
      "http://localhost:8080/api/admin/accounts",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCurrentAdmin(adminResponse.data);
    navigate("/admin/dashboard", { replace: true });
  };

  const logout = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      await axios.get("http://localhost:8080/api/user/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("authToken");
      setCurrentUser(null);
      navigate("/user/login", { replace: true });
    }

    const adminToken = localStorage.getItem("adminAuthToken");
    if (adminToken) {
      await axios.get("http://localhost:8080/api/admin/logout", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      localStorage.removeItem("adminAuthToken");
      setCurrentAdmin(null);
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, currentAdmin, login, adminLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
