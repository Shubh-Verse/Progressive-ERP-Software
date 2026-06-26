import BOQTable from "@/components/boq/BOQTable";
import { getBOQItems } from "@/services/boqService";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export default async function BOQPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  noStore();

  const items = await getBOQItems(Number(id)) || [];

  // 1. Move JavaScript calculations ABOVE the return statement
  const totalValue = items.reduce(
    (sum: number, item: any) => sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">BOQ Items</h1>
          <p className="text-slate-500">Manage project BOQ</p>
        </div>
      </div>

      {/* KPI KPI Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">BOQ Items</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {items.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Contract Value</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ₹ {totalValue.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Main Table Interface */}
      <BOQTable items={items} />
    </div>
  );
}