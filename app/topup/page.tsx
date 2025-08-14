import React from "react";
import MainLayout from "../_components/MainLayout";
import FormData from "./FormData";

const Topup = () => {
  return (
    <MainLayout header>
      <div>
        <p>Silahkan masukan</p>
        <h4 className="text-3xl font-semibold">Nominal Top Up</h4>
      </div>

      <FormData />
    </MainLayout>
  );
};

export default Topup;
