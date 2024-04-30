import { CreateProvider } from "@components/providers management/CreateProviderForm";
import ProvidersTable from "@components/providers management/data table/providers";
import React from "react";

const ProvidersPage = () => {
  return (
    <div className="w-full">
      <div className="flex gap-6 flex-wrap justify-between items-center">
        <h1 className="md:text-3xl text-2xl  font-bold mt-6">
          Providers Management
        </h1>
        <CreateProvider />
      </div>
      <ProvidersTable />
    </div>
  );
};

export default ProvidersPage;
