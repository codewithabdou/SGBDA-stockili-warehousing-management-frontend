import { CreateZone } from "@components/zones management/CreateZoneForm";
import ZonesTable from "@components/zones management/data table/zones";
import React from "react";

const ZonesPages = async () => {
  return (
    <div className="w-full">
      <div className="flex gap-6 flex-wrap justify-between items-center mt-6">
        <h1 className="md:text-3xl text-2xl  font-bold ">Zones Management</h1>
        <CreateZone />
      </div>
      <ZonesTable />
    </div>
  );
};

export default ZonesPages;
