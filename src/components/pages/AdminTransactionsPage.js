import React from "react";
import { useParams } from "react-router-dom";
import TransactionsPage from "./TransactionsPage";

export default function AdminTransactionsPage() {
  const { accountNumber } = useParams(); 

  return <TransactionsPage accountNumber={accountNumber} />;
}
