"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";

export default function BOQUpload({
  projectId,
}: {
  projectId: string;
}) {
  const [rows, setRows] = useState<any[]>([]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });

      console.log("Excel Loaded:", jsonData);

      setRows(jsonData as any[]);
    };

    reader.readAsBinaryString(file);
  };

  const importBOQ = async () => {
    if (rows.length === 0) {
      alert("Please upload an Excel file first");
      return;
    }

    // Find header row
    const headerIndex = rows.findIndex((row: any) => {
      const text = row
        .join(" ")
        .toLowerCase()
        .replace(/\r/g, "")
        .replace(/\n/g, " ");

      return (
        text.includes("description") &&
        text.includes("unit") &&
        text.includes("qty")
      );
    });

    console.log("Header Index:", headerIndex);

    if (headerIndex === -1) {
      alert("BOQ Table Not Found");
      return;
    }

    const boqRows = rows
      .slice(headerIndex + 2)
      .filter(
        (row: any) =>
          row &&
          row.length >= 6 &&
          !isNaN(Number(row[0]))
      );

    console.log("BOQ Rows:", boqRows);

    const formattedData = boqRows.map((row: any) => ({
      project_id: Number(projectId),
      serial_no: String(row[0]),
      description: String(row[1] || ""),
      unit: String(row[2] || ""),
      quantity: Number(row[3] || 0),
      rate: Number(row[4] || 0),
      amount: Number(row[5] || 0),
    }));

    console.log("Formatted Data:", formattedData);

    if (formattedData.length === 0) {
      alert("No BOQ Items Found");
      return;
    }

    const { error } = await supabase
      .from("boq_items")
      .insert(formattedData);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert(
      `${formattedData.length} BOQ Items Imported Successfully`
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-black mb-4">
        Upload BOQ Excel
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="border border-gray-300 p-3 rounded text-black"
      />

      <button
        onClick={importBOQ}
        className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Import BOQ
      </button>

      <p className="text-black mt-4 font-medium">
        Rows Loaded: {rows.length}
      </p>
    </div>
  );
}