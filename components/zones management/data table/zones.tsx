import getZones from "@api/getZones";
import { columns } from "./columns";
import { Zone } from "@typings/entities";
import { DataTable } from "@components/shared/Table/table";

export default async function ZonesTable() {
  const zones: Zone[] = await getZones();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={zones} />
    </div>
  );
}
