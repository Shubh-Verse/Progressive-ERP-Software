import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function RABillsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: bills, error } = await supabase
    .from("ra_bills")
    .select("*")
    .eq("project_id", Number(id))
    .order("bill_no", { ascending: false });

  if (error) {
    return (
      <div className="p-10">
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-black mb-6">
        RA Bills
      </h1>

      <Link
        href={`/projects/${id}/ra-bills/generate`}
        className="inline-block bg-green-600 text-white px-5 py-3 rounded mb-6"
      >
        Generate New Bill
      </Link>

      <div className="bg-white rounded-lg shadow p-6">
        {bills?.length === 0 && (
          <p className="text-black">
            No bills generated yet.
          </p>
        )}

        {bills?.map((bill) => (
          <div
            key={bill.id}
            className="border rounded-lg p-4 mb-4"
          >
            <h3 className="text-xl font-bold text-black">
              RA Bill #{bill.bill_no}
            </h3>

            <p className="text-black mt-2">
              Amount:
              ₹ {Number(bill.total_amount).toLocaleString()}
            </p>

            <Link
              href={`/projects/${id}/ra-bills/${bill.id}`}
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Open Bill
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}