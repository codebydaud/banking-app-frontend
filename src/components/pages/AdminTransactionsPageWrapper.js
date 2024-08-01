import React from "react";
import { useParams } from "react-router-dom";
import AdminTransactionsPage from "./AdminTrasanctionPage";

export default function AdminTransactionsPageWrapper() {
  const { accountNumber } = useParams(); // Assuming the account number is passed as a URL parameter

  return <AdminTransactionsPage accountNumber={accountNumber} />;
}
