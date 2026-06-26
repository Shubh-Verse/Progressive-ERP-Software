import { getCostingItems } from "@/services/costingService";

interface Props {
  projectId: number;
}

export default async function CostingTable({
  projectId,
}: Props) {

  const items = await getCostingItems(projectId);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-8 text-slate-900">
        Costing Table
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead className="bg-slate-50 text-slate-700 text-sm font-semibold border-b border-slate-200">

            <tr>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4 text-center">Client Rate</th>
              <th className="p-4 text-center">Mat</th>
              <th className="p-4 text-center">Overhead</th>
              <th className="p-4 text-center">Fit</th>
              <th className="p-4 text-center">HW</th>
              <th className="p-4 text-center">Labour</th>
              <th className="p-4 text-center">Total</th>
              <th className="p-4 text-center">Margin %</th>
              <th className="p-4 text-center">Final Rate</th>
              <th className="p-4 text-center">Profit</th>
            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {items.map((item: any) => (

              <tr
                key={item.id}
                className="hover:bg-slate-50"
              >

                <td className="p-4">

                  <div className="font-semibold text-slate-900">
                    {item.boq_items?.description?.substring(0, 60)}
                  </div>

                  <div className="text-xs text-slate-500 mt-1 truncate">
                    {item.boq_items?.description}
                  </div>

                </td>

                <td className="p-4 text-center">
                  {item.boq_items?.quantity}
                </td>

                <td className="p-4 text-center">
                  ₹ {Number(item.boq_items?.rate || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  ₹ {Number(item.material_cost || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  ₹ {Number(item.overhead || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  ₹ {Number(item.fitting_cost || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  ₹ {Number(item.hardware_cost || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  ₹ {Number(item.labour_cost || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center font-semibold">
                  ₹ {Number(item.total_cost || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center">
                  {item.margin_percent || 0}%
                </td>

                <td className="p-4 text-center text-blue-600 font-bold">
                  ₹ {Number(item.final_rate || 0).toLocaleString()}
                </td>

                <td className="p-4 text-center text-green-600 font-bold">
                  ₹ {Number(item.profit || 0).toLocaleString()}
                </td>

              </tr>

            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={12}
                  className="p-8 text-center text-slate-400"
                >
                  No costing items found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}