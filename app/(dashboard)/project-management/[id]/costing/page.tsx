import CostingTable from "@/components/costing/CostingTable";
export default async function CostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Costing
        </h1>

        <p className="text-slate-500">
          Cost analysis for BOQ items
        </p>
      </div>

      <CostingTable projectId={Number(id)} />

    </div>
  );
}