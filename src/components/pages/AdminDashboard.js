import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AdminDashboard.css"; // Import the CSS file

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [deletedAccountNumber, setDeletedAccountNumber] = useState(null);
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

    async function fetchAccounts() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/accounts",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setAccounts(response.data);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, [currentAdmin, navigate]);

  const handleViewClick = (accountNumber) => {
    navigate(`/admin/profile/${accountNumber}`); // Adjust the route as needed
  };

  const handleViewTransactionsClick = (accountNumber) => {
    navigate(`/admin/transactions/${accountNumber}`); // Adjust the route as needed
  };

  const handleDeleteClick = async (accountNumber) => {
    const adminToken = localStorage.getItem("adminAuthToken");
    try {
      await axios.delete(
        `http://localhost:8080/api/admin/account/${accountNumber}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setSuccessMessage("Account deleted successfully.");
      setDeletedAccountNumber(accountNumber);
      setTimeout(() => {
        setAccounts(
          accounts.filter((account) => account.accountNumber !== accountNumber)
        );
        setSuccessMessage("");
        setDeletedAccountNumber(null);
      }, 2000); // Wait for 2 seconds before removing the account
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard-container">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {accounts.length === 0 ? (
        <p>No accounts found</p>
      ) : (
        <ul className="accounts-list">
          {accounts.map((account) => (
            <li
              key={account.accountNumber}
              className={`account-item ${
                deletedAccountNumber === account.accountNumber ? "deleting" : ""
              }`}
            >
              <div className="account-details">
                <div>
                  <strong>Account Number:</strong> {account.accountNumber}
                </div>
                <div>
                  <strong>Account Holder Name:</strong>{" "}
                  {account.accountHolderName}
                </div>
                <div>
                  <strong>Balance:</strong> ${account.balance.toFixed(2)}
                </div>
                <div>
                  <strong>Created At:</strong>{" "}
                  {new Date(account.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="button-container">
                <button
                  className="view-button"
                  onClick={() => handleViewClick(account.accountNumber)}
                >
                  View Profile
                </button>
                <button
                  className="view-transactions-button"
                  onClick={() =>
                    handleViewTransactionsClick(account.accountNumber)
                  }
                >
                  View Transactions
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(account.accountNumber)}
                >
                  Delete Profile
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
