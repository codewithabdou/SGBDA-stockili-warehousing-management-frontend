import getZones from "@api/getZones";
import { Zone, columns } from "./columns";
import { DataTable } from "./table";

export default async function ZonesTable() {
  const zones: Zone[] = await getZones();
  console.log(zones);

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={zones} />
    </div>
  );
}
