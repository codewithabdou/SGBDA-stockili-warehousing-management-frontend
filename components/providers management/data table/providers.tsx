import getProviders from "@api/getProviders";
import { columns } from "./columns";
import { Provider } from "@typings/entities";
import { DataTable } from "@components/shared/Table/table";

export default async function ProvidersTable() {
  const providers: Provider[] = await getProviders();

  return (
    <div className="w-full py-10">
      <DataTable columns={columns} data={providers} />
    </div>
  );
}
