import getZones from "@api/getZones";
import { columns } from "./columns";
import { DataTable } from "./table";
import { Zone } from "@typings/entities";

export default async function ZonesTable() {
  const zones: Zone[] = await getZones();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={zones} />
    </div>
  );
}
