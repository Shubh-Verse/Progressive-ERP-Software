import { supabase } from "@/lib/supabase";

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: items, error } = await supabase
    .from("boq_progress")
    .select("*")
    .eq("project_id", Number(id))
    .order("serial_no");

  if (error) {
    return (
      <div className="p-10">
        <p className="text-red-600 font-semibold">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-black mb-6">
        RA Bill Progress
      </h1>

      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-black">
                Item No
              </th>

              <th className="border p-3 text-black">
                BOQ Qty
              </th>

              <th className="border p-3 text-black">
                Executed Qty
              </th>

              <th className="border p-3 text-black">
                Balance Qty
              </th>

              <th className="border p-3 text-black">
                Rate
              </th>

              <th className="border p-3 text-black">
                Executed Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {items?.map((item) => (
              <tr key={item.id}>
                <td className="border p-3 text-black">
                  {item.serial_no}
                </td>

                <td className="border p-3 text-black">
                  {item.boq_qty}
                </td>

                <td className="border p-3 text-black font-semibold">
                  {item.executed_qty}
                </td>

                <td className="border p-3 text-black">
                  {item.balance_qty}
                </td>

                <td className="border p-3 text-black">
                  ₹ {item.rate}
                </td>

                <td className="border p-3 text-green-700 font-bold">
                  ₹ {Number(item.executed_amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}