import React from "react";
import MainLayout from "../_components/MainLayout";
import DataTransaction from "./DataTransaction";

const Transaction = () => {
  return (
    <MainLayout header>
      <h5 className="font-bold">Semua Transaksi</h5>

      <DataTransaction />
    </MainLayout>
  );
};

export default Transaction;
