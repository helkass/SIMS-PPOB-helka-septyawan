import React from "react";
import MainLayout from "../../_components/MainLayout";
import FormData from "./FormData";
import Header from "./Header";

interface ServicePageProps {
  params: {
    service: string;
  };
}
const TopupService = ({ params }: ServicePageProps) => {
  const { service } = params;
  return (
    <MainLayout header>
      <Header service={service} />

      <FormData service={service} />
    </MainLayout>
  );
};

export default TopupService;
