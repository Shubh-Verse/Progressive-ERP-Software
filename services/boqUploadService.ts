import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";

export function parseBOQExcel(file: File) {
  return new Promise<any[][]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;

        const workbook = XLSX.read(data, {
          type: "binary",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: "",
        });

        resolve(rows);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsBinaryString(file);
  });
}

export async function saveBOQRows(
  projectId: number,
  rows: any[][]
) {
  const formattedRows: any[] = [];

  let currentCategory = "";
  let pendingDescription = "";

  for (const row of rows) {
    if (!row || row.length === 0) continue;

    //--------------------------------------
    // Club-8 BOQ columns
    //--------------------------------------
    const description = String(row[1] || "").trim();

    const unit = String(row[2] || "").trim();

    const quantity = Number(
      String(row[3] || "0").replace(/,/g, "")
    );

    const rate = Number(
      String(row[4] || "0").replace(/,/g, "")
    );

    const amount = Number(
      String(row[5] || "0").replace(/,/g, "")
    );

    //--------------------------------------
    // Skip completely empty rows
    //--------------------------------------
    if (
      description === "" &&
      unit === "" &&
      quantity === 0 &&
      rate === 0 &&
      amount === 0
    ) {
      continue;
    }

    //--------------------------------------
    // Skip metadata rows
    //--------------------------------------
    if (
      description.includes("Name of Work") ||
      description.includes("Name of Contractor") ||
      description.includes("Name of Client") ||
      description.includes("Work Order") ||
      description.includes("RA Bill") ||
      description.includes("Description of Item") ||
      description.includes("Sub-Total")
    ) {
      continue;
    }

    //--------------------------------------
    // Skip table header row
    //--------------------------------------
    if (unit === "As Per B.O.Q.") {
      continue;
    }

    //--------------------------------------
    // Category rows
    //--------------------------------------
    if (/^[A-Z]\)/.test(description)) {
      currentCategory = description;
      continue;
    }

    //--------------------------------------
    // Description-only rows (continuation lines)
    //--------------------------------------
    if (
      description !== "" &&
      unit === "" &&
      quantity === 0 &&
      rate === 0 &&
      amount === 0
    ) {
      pendingDescription =
        pendingDescription === ""
          ? description
          : pendingDescription + " " + description;

      continue;
    }

    //--------------------------------------
    // Build final description
    //--------------------------------------
    let finalDescription = description;

    if (
      pendingDescription !== "" &&
      (
        description.startsWith("1:") ||
        /^[a-z]/.test(description)
      )
    ) {
      finalDescription =
        pendingDescription + " " + description;
    }

    //--------------------------------------
    // Save item
    //--------------------------------------
    formattedRows.push({
      project_id: projectId,
      category: currentCategory,
      description: finalDescription,
      unit,
      quantity,
      rate,
      amount,
    });

    //--------------------------------------
    // Reset description buffer
    //--------------------------------------
    pendingDescription = "";
  }

  console.log("FINAL BOQ ITEMS:", formattedRows);

  if (formattedRows.length === 0) {
    throw new Error("No valid BOQ items found");
  }

  //--------------------------------------
  // Insert into Supabase
  //--------------------------------------
  const { error } = await supabase
    .from("boq_items")
    .insert(formattedRows);

  if (error) {
    throw error;
  }
}