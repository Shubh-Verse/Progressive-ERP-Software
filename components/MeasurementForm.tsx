"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MeasurementForm({
  projectId,
  boqItemId,
}: {
  projectId: number;
  boqItemId: number;
}) {
  const [qty, setQty] = useState("");
  const [remarks, setRemarks] = useState("");

  const saveMeasurement = async () => {
    if (!qty) {
      alert("Enter Measurement Quantity");
      return;
    }

    const { error } = await supabase
      .from("measurements")
      .insert([
        {
          project_id: projectId,
          boq_item_id: boqItemId,
          measured_qty: Number(qty),
          remarks,
        },
      ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Measurement Saved");

    setQty("");
    setRemarks("");
  };

  return (
    <div className="mt-4 flex gap-3">
      <input
        type="number"
        placeholder="Measured Qty"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="border border-gray-300 p-2 rounded text-black"
      />

      <input
        type="text"
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="border border-gray-300 p-2 rounded text-black"
      />

      <button
        onClick={saveMeasurement}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}