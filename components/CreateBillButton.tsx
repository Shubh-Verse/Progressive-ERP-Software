"use client";

import { supabase } from "@/lib/supabase";

export default function CreateBillButton({
  projectId,
}: {
  projectId: number;
}) {
  const createBill = async () => {
    try {
      // Get existing bills
      const { data: existingBills } = await supabase
        .from("ra_bills")
        .select("*")
        .eq("project_id", projectId);

      const billNo =
        (existingBills?.length || 0) + 1;

      // Get progress data
      const { data: progressData, error: progressError } =
        await supabase
          .from("boq_progress")
          .select("*")
          .eq("project_id", projectId);

      if (progressError) {
        alert(progressError.message);
        return;
      }

      if (!progressData?.length) {
        alert("No progress data found");
        return;
      }

      // Calculate total amount
      const totalAmount =
        progressData.reduce(
          (sum, item) =>
            sum +
            Number(item.executed_amount || 0),
          0
        );

      // Create RA Bill
      const {
        data: billData,
        error: billError,
      } = await supabase
        .from("ra_bills")
        .insert({
          project_id: projectId,
          bill_no: billNo,
          total_amount: totalAmount,
        })
        .select()
        .single();

      if (billError) {
        alert(billError.message);
        return;
      }

      // Create bill items
      const billItems = progressData
  .filter(
    (item) =>
      Number(item.executed_qty) > 0 &&
      Number(item.executed_amount) > 0
  )
  .map((item) => ({
    bill_id: billData.id,
    boq_item_id: item.id,
    previous_qty: 0,
    current_qty: Number(item.executed_qty) || 0,
    total_qty: Number(item.executed_qty) || 0,
    rate: Number(item.rate) || 0,
    amount: Number(item.executed_amount) || 0,
  }));

      const { error: itemsError } =
        await supabase
          .from("ra_bill_items")
          .insert(billItems);

      if (itemsError) {
        alert(itemsError.message);
        return;
      }

      alert(
        `RA Bill ${billNo} Generated Successfully`
      );

      window.location.href =
        `/projects/${projectId}/ra-bills`;

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <button
      onClick={createBill}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
    >
      Create Bill
    </button>
  );
}