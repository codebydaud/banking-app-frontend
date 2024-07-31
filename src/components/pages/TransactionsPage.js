import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/TransactionsPage.css";

const getToken = (propAccountNumber) => {
  return propAccountNumber
    ? localStorage.getItem("adminAuthToken")
    : localStorage.getItem("userAuthToken");
};

export default function TransactionsPage({ accountNumber: propAccountNumber }) {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accountNumber =
    propAccountNumber || (currentUser && currentUser.accountNumber);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const token = getToken(propAccountNumber);

        if (!token) {
          setError("No authentication token found.");
          return;
        }

        const endpoint = propAccountNumber
          ? `http://localhost:8080/api/admin/account/${accountNumber}/transactions`
          : "http://localhost:8080/api/user/transactions";

        const { data } = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (accountNumber) {
      fetchTransactions();
    } else {
      setError("Account number not provided.");
      setLoading(false);
    }
  }, [accountNumber, propAccountNumber]);

  if (loading) return <p className="loading">Loading transactions...</p>;

  return (
    <div className="transactions-container">
      {error && <p className="error">{error}</p>}
      {transactions.length === 0 ? (
        <p>No previous transactions.</p>
      ) : (
        <ul className="transactions-list">
          {transactions.map((transaction) => {
            const isSource = transaction.sourceAccountNumber === accountNumber;
            const isTarget = transaction.targetAccountNumber === accountNumber;

            return (
              <li key={transaction.transactionId} className="transaction-item">
                <div>
                  <strong>
                    {isSource ? "To" : isTarget ? "From" : "From"} Account
                    Number:
                  </strong>{" "}
                  {isSource
                    ? transaction.targetAccountNumber
                    : isTarget
                    ? transaction.sourceAccountNumber
                    : `${transaction.sourceAccountNumber} to ${transaction.targetAccountNumber}`}
                </div>
                <div>
                  <strong>Amount:</strong> ${transaction.amount}
                </div>
                <div>
                  <strong>Type:</strong>{" "}
                  {isSource
                    ? "Sent"
                    : isTarget
                    ? "Received"
                    : transaction.transactionType}
                </div>
                <div>
                  <strong>Description:</strong> {transaction.description}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
