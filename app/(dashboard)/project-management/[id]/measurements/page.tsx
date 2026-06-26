import { supabase } from "@/lib/supabase";

export default async function MeasurementsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: boqItems, error } = await supabase
    .from("boq_progress")
    .select("*")
    .eq("project_id", Number(id))
    .order("id");

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <p className="text-red-600 font-semibold">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-black mb-6">
        Measurements
      </h1>

      <div className="space-y-6">
        {boqItems?.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow border border-gray-300"
          >
            <h2 className="text-xl font-bold text-black">
              Item No. {item.serial_no}
            </h2>

            <p className="text-black mt-3">
              {item.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
              <div>
                <p className="text-gray-600">
                  BOQ Quantity
                </p>

                <p className="text-black font-bold text-lg">
                  {item.quantity}
                </p>
              </div>

              <div>
                <p className="text-gray-600">
                  Executed Quantity
                </p>

                <p className="text-green-600 font-bold text-lg">
                  {item.executed_qty}
                </p>
              </div>

              <div>
                <p className="text-gray-600">
                  Balance Quantity
                </p>

                <p className="text-red-600 font-bold text-lg">
                  {item.balance_qty}
                </p>
              </div>

              <div>
                <p className="text-gray-600">
                  Unit
                </p>

                <p className="text-black font-bold text-lg">
                  {item.unit}
                </p>
              </div>

              <div>
                <p className="text-gray-600">
                  Rate
                </p>

                <p className="text-black font-bold text-lg">
                  ₹ {item.rate}
                </p>
              </div>

              <div>
                <p className="text-gray-600">
                  Amount
                </p>

                <p className="text-black font-bold text-lg">
                  ₹ {item.amount}
                </p>
              </div>
            </div>

            {/* <MeasurementForm
              projectId={Number(id)}
              boqItemId={item.id}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}