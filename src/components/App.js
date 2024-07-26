import "../styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Layout from "./Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import AdminLogin from "./pages/AdminLogin";
import FundTrasferPage from "./pages/FundTransferPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionsPage from "./pages/TransactionsPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePageAdmin from "./pages/ProfilePageAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/user/transfer-funds"
              element={
                <PrivateRoute>
                  <FundTrasferPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/transactions"
              element={
                <PrivateRoute>
                  <TransactionsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/profile/:accountNumber"
              element={
                <PrivateRoute adminOnly>
                  <ProfilePageAdmin />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
