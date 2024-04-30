import { Product, columns } from "./columns";
import { DataTable } from "./table";

async function getData(): Promise<Product[]> {
  return [
    {
      id: "1",
      productName: "Product A",
      cost: 100,
      quantity: 10,
    },
    {
      id: "2",
      productName: "Product B",
      cost: 200,
      quantity: 20,
    },
    {
      id: "3",
      productName: "Product C",
      cost: 300,
      quantity: 30,
    },
    {
      id: "4",
      productName: "Product D",
      cost: 400,
      quantity: 40,
    },
  ];
}

export default async function ProductsTable() {
  const data = await getData();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
