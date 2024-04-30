import { Zone, columns } from "./columns";
import { DataTable } from "./table";

async function getData(): Promise<Zone[]> {
  return [
    {
      id: "1",
      zoneName: "Zone A",
    },
    {
      id: "2",
      zoneName: "Zone B",
    },
    {
      id: "3",
      zoneName: "Zone C",
    },
    {
      id: "4",
      zoneName: "Zone D",
    },
  ];
}

export default async function ZonesTable() {
  const data = await getData();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
