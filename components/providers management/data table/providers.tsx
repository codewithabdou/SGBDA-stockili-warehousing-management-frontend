import { Provider, columns } from "./columns";
import { DataTable } from "./table";

async function getData(): Promise<Provider[]> {
  return [
    {
      id: "1",
      providerName: "Provider A",
    },
    {
      id: "2",
      providerName: "Provider B",
    },
    {
      id: "3",
      providerName: "Provider C",
    },
    {
      id: "4",
      providerName: "Provider D",
    },
  ];
}

export default async function ProvidersTable() {
  const data = await getData();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
