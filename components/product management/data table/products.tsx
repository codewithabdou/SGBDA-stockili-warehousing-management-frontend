import { Product } from "@typings/entities";
import { columns } from "./columns";
import { DataTable } from "./table";
import getProducts from "@api/getProducts";

export default async function ProductsTable() {
  const products: Product[] = await getProducts();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
