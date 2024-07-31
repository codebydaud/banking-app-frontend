import React from "react";
import { useParams } from "react-router-dom";
import TransactionsPage from "./TransactionsPage";

export default function AdminTransactionsPage() {
  const { accountNumber } = useParams(); // Assuming the account number is passed as a URL parameter

  return <TransactionsPage accountNumber={accountNumber} />;
}
