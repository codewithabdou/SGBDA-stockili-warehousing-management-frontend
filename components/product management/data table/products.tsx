import { Product } from "@typings/entities";
import { columns } from "./columns";
import getProducts from "@api/getProducts";
import { DataTable } from "@components/shared/Table/table";

export default async function ProductsTable() {
  const products: Product[] = await getProducts();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={products} />
    </div>
  );
}
