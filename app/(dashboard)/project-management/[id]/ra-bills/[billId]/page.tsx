import { supabase } from "@/lib/supabase";
import PrintButton from "@/components/PrintButton";
import { numberToWords } from "@/lib/numberToWords";
import { getShortDescription } from "@/lib/getShortDescription";
import { getCategory } from "@/lib/getCategory";

export default async function BillDetails({
  params,
}: {
  params: Promise<{
    id: string;
    billId: string;
  }>;
}) {
  const { billId } = await params;

  // Fetch Bill
  const { data: bill } = await supabase
    .from("ra_bills")
    .select("*")
    .eq("id", Number(billId))
    .single();

  if (!bill) {
    return (
      <div className="p-10">
        <p className="text-red-600 font-semibold">
          Bill not found
        </p>
      </div>
    );
  }

  // Fetch Bill Items
  const { data: billItems, error } = await supabase
    .from("ra_bill_items")
    .select("*")
    .eq("bill_id", Number(billId));

  if (error) {
    return (
      <div className="p-10">
        <p className="text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  // Executed Items Only
  const filteredItems =
    billItems?.filter(
      (item) =>
        Number(item.current_qty) > 0 &&
        Number(item.amount) > 0
    ) || [];

  const boqIds = filteredItems.map(
    (item) => item.boq_item_id
  );

  // Fetch BOQ Items
  const { data: boqItems } = boqIds.length
    ? await supabase.from("boq_items").select("*").in("id", boqIds)
    : { data: [] };

  const boqMap = new Map(
    boqItems?.map((item) => [item.id, item]) || []
  );

  // Fetch Project
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", bill.project_id)
    .single();

  const abstractData: Record<string, number> = {};

  filteredItems.forEach((item) => {
    const boq = boqMap.get(item.boq_item_id);

    const category = getCategory(
        boq?.short_description ||
        boq?.description ||
        ""
      );

    abstractData[category] =
      (abstractData[category] || 0) + Number(item.amount || 0);
  });

  // Calculate Total
  const totalAmount = filteredItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  console.log(
    Object.entries(abstractData)
  );

  return (
    <div
      id="bill-content"
      className="bg-white text-black p-6 max-w-[1100px] mx-auto"
    >
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-5">
        <h1 className="text-4xl font-extrabold text-black">
          Progressive Shelters Pvt. Ltd.
        </h1>

        <p className="text-black mt-1">Noida, Uttar Pradesh</p>

        <p className="text-lg font-semibold text-black mt-2">
          Running Account Bill
        </p>
      </div>

      {/* Bill Information */}
      <div className="bg-white border border-gray-300 p-4 mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="font-bold text-black">Bill No</p>
            <p className="text-black">RA-{bill.bill_no}</p>
          </div>

          <div>
            <p className="font-bold text-black">Date</p>
            <p className="text-black">
              {bill.bill_date
                ? new Date(bill.bill_date).toLocaleDateString("en-IN")
                : "-"}
            </p>
          </div>

          <div>
            <p className="font-bold text-black">Project Name</p>
            <p className="text-black">{project?.project_name || "-"}</p>
          </div>

          <div>
            <p className="font-bold text-black">Client</p>
            <p className="text-black">{project?.client_name || "-"}</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="mb-4 no-print">
        <PrintButton />
      </div>

      {/* Abstract Summary */}
      <div className="bg-white border border-gray-300 p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Abstract Summary</h2>

        <table className="w-full border border-black">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">S.No</th>
              <th className="border p-2">Work Description</th>
              <th className="border p-2">This Bill Amount</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(abstractData).map(([category, amount], index) => (
              <tr key={category}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{category}</td>
                <td className="border p-2 text-right">
                  ₹ {amount.toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="bg-white border border-gray-300 p-4 mb-4">
        <h2 className="text-xl font-bold text-black">Total Amount</h2>

        <p className="text-3xl font-bold text-green-700 mt-2">
          ₹ {totalAmount.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Detailed Table (Hidden) */}
      <div className="hidden">
        <table className="w-full border border-black text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-2 font-bold text-black">Sr No</th>
              <th className="border border-black p-2 font-bold text-black">Description</th>
              <th className="border border-black p-2 font-bold text-black">Unit</th>
              <th className="border border-black p-2 font-bold text-black">Qty</th>
              <th className="border border-black p-2 font-bold text-black">Rate</th>
              <th className="border border-black p-2 font-bold text-black">Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, index) => {
              const boq = boqMap.get(item.boq_item_id);

              const displayDescription = boq?.short_description?.trim()
                ? boq.short_description
                : getShortDescription(boq?.description || "");

              return (
                <tr key={item.id}>
                  <td className="border border-black p-2 text-center text-black">
                    {index + 1}
                  </td>
                  <td className="border border-black p-2 text-black">
                    {displayDescription}
                  </td>
                  <td className="border border-black p-2 text-center text-black">
                    {boq?.unit || "-"}
                  </td>
                  <td className="border border-black p-2 text-center text-black">
                    {Number(item.current_qty || 0).toLocaleString("en-IN")}
                  </td>
                  <td className="border border-black p-2 text-center text-black">
                    ₹ {Number(item.rate || 0).toLocaleString("en-IN")}
                  </td>
                  <td className="border border-black p-2 text-center font-bold text-green-700">
                    ₹ {Number(item.amount || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Grand Total */}
      <div className="mt-4 text-right">
        <h2 className="text-2xl font-bold text-green-700">
          Grand Total: ₹ {totalAmount.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* Amount In Words */}
      <div className="mt-4 border-t border-gray-300 pt-3">
        <h3 className="font-bold text-black">Amount In Words</h3>
        <p className="text-black mt-1">Rupees {numberToWords(totalAmount)} Only</p>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-3 gap-8 mt-10">
        <div className="text-center">
          <div className="border-t-2 border-black pt-2 font-bold text-black">
            Prepared By
          </div>
        </div>

        <div className="text-center">
          <div className="border-t-2 border-black pt-2 font-bold text-black">
            Checked By
          </div>
        </div>

        <div className="text-center">
          <div className="border-t-2 border-black pt-2 font-bold text-black">
            Approved By
          </div>
        </div>
      </div>
    </div>
  );
}