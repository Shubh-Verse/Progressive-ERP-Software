import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";

/* =========================================================
   TYPES
========================================================= */

export type BOQRowType =
  | "document_title"
  | "section"
  | "instruction"
  | "group"
  | "subgroup"
  | "item"
  | "subtotal"
  | "grand_total"
  | "tax"
  | "note";

interface ParsedBOQRow {
  serial_no: string | null;
  description: string;

  unit: string | null;
  quantity: number | null;
  rate: number | null;
  amount: number | null;

  row_type: BOQRowType;

  parent_serial: string | null;

  sort_order: number;
  source_row: number;

  parentKey: string | null;
  rowKey: string;
}

/* =========================================================
   READ EXCEL
========================================================= */

export function parseBOQExcel(file: File) {
  return new Promise<any[][]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;

        if (!data) {
          throw new Error("Could not read Excel file");
        }

        const workbook = XLSX.read(data, {
          type: "array",
          cellDates: false,
          cellText: true,
        });

        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) {
          throw new Error("No worksheet found");
        }

        const sheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json<any[]>(sheet, {
          header: 1,
          defval: "",
          raw: false,
          blankrows: true,
        });

        resolve(rows);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read Excel file"));
    };

    reader.readAsArrayBuffer(file);
  });
}

/* =========================================================
   CLEAN VALUES
========================================================= */

function cleanText(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/*
  Excel BOQs often contain:
  -
  --
  —
  –  

  These mean "no serial", not a real serial.
*/

function cleanSerial(value: unknown): string {
  const serial = cleanText(value);

  if (
    serial === "-" ||
    serial === "--" ||
    serial === "—" ||
    serial === "–"
  ) {
    return "";
  }

  return serial;
}

function parseNumber(value: unknown): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const cleaned = String(value)
    .replace(/₹/g, "")
    .replace(/Rs\.?/gi, "")
    .replace(/,/g, "")
    .replace(/\s/g, "")
    .trim();

  if (
    cleaned === "" ||
    cleaned === "-" ||
    cleaned === "--"
  ) {
    return null;
  }

  const number = Number(cleaned);

  return Number.isFinite(number)
    ? number
    : null;
}

/* =========================================================
   BASIC CHECKS
========================================================= */

function isEmptyRow(row: any[]): boolean {
  return row.every(
    (cell) => cleanText(cell) === ""
  );
}

function hasCommercialData(
  unit: string,
  quantity: number | null,
  rate: number | null,
  amount: number | null
) {
  return (
    unit !== "" ||
    quantity !== null ||
    rate !== null ||
    amount !== null
  );
}

/* =========================================================
   HEADER DETECTION
========================================================= */

function isTableHeader(
  serial: string,
  description: string,
  unit: string
) {
  const combined =
    `${serial} ${description} ${unit}`
      .toLowerCase()
      .replace(/\./g, "");

  return (
    (
      combined.includes("sno") ||
      combined.includes("serial no")
    ) &&
    combined.includes("description")
  );
}

/* =========================================================
   DOCUMENT TITLE DETECTION
========================================================= */

function isDocumentTitle(
  serial: string,
  description: string,
  hasData: boolean
) {
  if (hasData) {
    return false;
  }

  if (serial !== "") {
    return false;
  }

  const value = description.toLowerCase();

  return (
    value.includes("supply, installation") ||
    value.includes("supply installation") ||
    value.includes(
      "testing & commissioning"
    ) ||
    value.includes(
      "testing and commissioning"
    ) ||
    value.includes("bill of quantities") ||
    value === "boq" ||
    value.startsWith("annexure") ||
    value.startsWith("name of work")
  );
}

/* =========================================================
   SECTION DETECTION

   Examples:
   A
   A.
   A)
   (A)
========================================================= */

function normalizeSerial(serial: string) {
  return serial
    .replace(/\s+/g, "")
    .replace(/[()]/g, "")
    .replace(/\.$/, "")
    .trim();
}

function isMainSection(
  serial: string,
  description: string,
  hasData: boolean
) {
  if (hasData) {
    return false;
  }

  const normalized =
    normalizeSerial(serial);

  return (
    /^[A-Z]$/.test(normalized) &&
    description !== ""
  );
}

/* =========================================================
   SERIAL TYPES
========================================================= */

function isAlphabeticSerial(serial: string) {
  const value =
    normalizeSerial(serial);

  return /^[a-z]$/i.test(value);
}

function isDecimalSerial(serial: string) {
  const value =
    normalizeSerial(serial);

  return /^\d+\.\d+$/.test(value);
}

function isWholeNumberSerial(serial: string) {
  const value =
    normalizeSerial(serial);

  return /^\d+$/.test(value);
}

/*
  Major BOQ group:

  1.0
  2.0
  3.0

  These are headings, not costable items,
  when Unit / Qty / Rate / Amount are empty.
*/

function isMajorDecimalGroup(serial: string) {
  const value =
    normalizeSerial(serial);

  return /^\d+\.0$/.test(value);
}

/*
  Actual decimal item:

  2.1
  2.2
  3.1

  Usually these contain commercial data.
*/

function isDecimalItemSerial(serial: string) {
  const value =
    normalizeSerial(serial);

  return (
    /^\d+\.\d+$/.test(value) &&
    !/^\d+\.0$/.test(value)
  );
}

/* =========================================================
   TOTAL DETECTION
========================================================= */

function getTotalType(
  serial: string,
  description: string
): BOQRowType | null {
  const combined =
    `${serial} ${description}`
      .toLowerCase();

  if (
    combined.includes("grand total") ||
    combined.includes(
      "total of a+b+c+d"
    ) ||
    combined.includes(
      "total of a + b + c + d"
    )
  ) {
    return "grand_total";
  }

  if (
    combined.includes("gst") ||
    combined.includes(
      "goods and service tax"
    )
  ) {
    return "tax";
  }

  if (
    combined.includes("sub total") ||
    combined.includes("sub-total") ||
    combined.includes("subtotal")
  ) {
    return "subtotal";
  }

  return null;
}

/* =========================================================
   PARSE ORIGINAL BOQ STRUCTURE
========================================================= */

function buildStructuredRows(
  rows: any[][]
): ParsedBOQRow[] {
  const result: ParsedBOQRow[] = [];

  let currentSectionKey: string | null = null;
  let currentSectionSerial: string | null = null;

  let currentGroupKey: string | null = null;
  let currentGroupSerial: string | null = null;

  let currentSubgroupKey: string | null = null;
  let currentSubgroupSerial: string | null = null;

  let sortOrder = 0;

  for (
    let rowIndex = 0;
    rowIndex < rows.length;
    rowIndex++
  ) {
    const row = rows[rowIndex] || [];

    if (isEmptyRow(row)) {
      continue;
    }

    /*
      Original BOQ columns:

      A = Serial
      B = Description
      C = Unit
      D = Quantity
      E = Rate
      F = Amount
    */

    const serial =
      cleanSerial(row[0]);

    const description =
      cleanText(row[1]);

    const unit =
      cleanText(row[2]);

    const quantity =
      parseNumber(row[3]);

    const rate =
      parseNumber(row[4]);

    const amount =
      parseNumber(row[5]);

    const sourceRow =
      rowIndex + 1;

    /* -----------------------------------------
       EMPTY ROW
    ----------------------------------------- */

    if (
      serial === "" &&
      description === "" &&
      unit === "" &&
      quantity === null &&
      rate === null &&
      amount === null
    ) {
      continue;
    }

    /* -----------------------------------------
       TABLE HEADER
    ----------------------------------------- */

    if (
      isTableHeader(
        serial,
        description,
        unit
      )
    ) {
      continue;
    }

    sortOrder++;

    const hasData =
      hasCommercialData(
        unit,
        quantity,
        rate,
        amount
      );

    /* =========================================
       1. TOTAL / TAX
    ========================================= */

    const totalType =
      getTotalType(
        serial,
        description
      );

    if (totalType) {
      result.push({
        serial_no:
          serial || null,

        description:
          description ||
          serial ||
          "Total",

        unit:
          unit || null,

        quantity,
        rate,
        amount,

        row_type:
          totalType,

        parent_serial:
          currentSectionSerial,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey:
          currentSectionKey,

        rowKey:
          `total-${sourceRow}`,
      });

      continue;
    }

    /* =========================================
       2. DOCUMENT TITLE
    ========================================= */

    if (
      description !== "" &&
      isDocumentTitle(
        serial,
        description,
        hasData
      )
    ) {
      result.push({
        serial_no: null,

        description,

        unit: null,
        quantity: null,
        rate: null,
        amount: null,

        row_type:
          "document_title",

        parent_serial: null,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey: null,

        rowKey:
          `title-${sourceRow}`,
      });

      continue;
    }

    /* =========================================
       3. MAIN SECTION

       A.
       INSTALLATION OF SUB-STATION EQUIPMENT
    ========================================= */

    if (
      isMainSection(
        serial,
        description,
        hasData
      )
    ) {
      const sectionKey =
        `section-${sourceRow}`;

      currentSectionKey =
        sectionKey;

      currentSectionSerial =
        serial;

      currentGroupKey = null;
      currentGroupSerial = null;

      currentSubgroupKey = null;
      currentSubgroupSerial = null;

      result.push({
        serial_no: serial,

        description,

        unit: null,
        quantity: null,
        rate: null,
        amount: null,

        row_type:
          "section",

        parent_serial: null,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey: null,

        rowKey:
          sectionKey,
      });

      continue;
    }

    /* =========================================
       4. MAJOR DECIMAL GROUP

       1.0  33 KV HT PANELS
       2.0  33 KV HT CABLE

       THIS WAS THE MAIN BUG.
    ========================================= */

    if (
      isMajorDecimalGroup(serial) &&
      description !== "" &&
      !hasData
    ) {
      const groupKey =
        `group-${sourceRow}`;

      currentGroupKey =
        groupKey;

      currentGroupSerial =
        serial;

      currentSubgroupKey = null;
      currentSubgroupSerial = null;

      result.push({
        serial_no:
          serial,

        description,

        unit: null,
        quantity: null,
        rate: null,
        amount: null,

        row_type:
          "group",

        parent_serial:
          currentSectionSerial,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey:
          currentSectionKey,

        rowKey:
          groupKey,
      });

      continue;
    }

    /* =========================================
       5. ACTUAL COSTABLE ITEM

       a.
       b.
       2.1
       2.2

       Commercial data decides this.
    ========================================= */

    if (
      description !== "" &&
      hasData
    ) {
      result.push({
        serial_no:
          serial || null,

        description,

        unit:
          unit || null,

        quantity,
        rate,
        amount,

        row_type:
          "item",

        parent_serial:
          currentSubgroupSerial ||
          currentGroupSerial ||
          currentSectionSerial,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey:
          currentSubgroupKey ||
          currentGroupKey ||
          currentSectionKey,

        rowKey:
          `item-${sourceRow}`,
      });

      continue;
    }

    /* =========================================
       6. ALPHABETIC SUBGROUP

       Only after a real group exists.

       This prevents section letters and
       actual a./b. items being confused.
    ========================================= */

    if (
      currentGroupKey &&
      isAlphabeticSerial(serial) &&
      description !== "" &&
      !hasData
    ) {
      const subgroupKey =
        `subgroup-${sourceRow}`;

      currentSubgroupKey =
        subgroupKey;

      currentSubgroupSerial =
        serial;

      result.push({
        serial_no:
          serial,

        description,

        unit: null,
        quantity: null,
        rate: null,
        amount: null,

        row_type:
          "subgroup",

        parent_serial:
          currentGroupSerial,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey:
          currentGroupKey,

        rowKey:
          subgroupKey,
      });

      continue;
    }

    /* =========================================
       7. NUMBERED INSTRUCTION

       Before first major group:

       1 Assembling loose components
       2 Bonding on masonry
       ...
       10 Providing MS channel

       These are requirements, NOT groups.
    ========================================= */

    if (
      serial !== "" &&
      description !== "" &&
      !hasData
    ) {
      result.push({
        serial_no:
          serial,

        description,

        unit: null,
        quantity: null,
        rate: null,
        amount: null,

        row_type:
          currentGroupKey
            ? "note"
            : "instruction",

        parent_serial:
          currentGroupSerial ||
          currentSectionSerial,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey:
          currentGroupKey ||
          currentSectionKey,

        rowKey:
          `instruction-${sourceRow}`,
      });

      continue;
    }

    /* =========================================
       8. DESCRIPTION-ONLY ROW

       Example:

       The rates shall include the following:
    ========================================= */

    if (
      description !== "" &&
      serial === "" &&
      !hasData
    ) {
      result.push({
        serial_no: null,

        description,

        unit: null,
        quantity: null,
        rate: null,
        amount: null,

        row_type:
          currentSectionKey
            ? "instruction"
            : "note",

        parent_serial:
          currentGroupSerial ||
          currentSectionSerial,

        sort_order:
          sortOrder,

        source_row:
          sourceRow,

        parentKey:
          currentGroupKey ||
          currentSectionKey,

        rowKey:
          `note-${sourceRow}`,
      });
    }
  }

  return result;
}

/* =========================================================
   SAVE BOQ TO SUPABASE
========================================================= */

export async function saveBOQRows(
  projectId: number,
  rows: any[][]
) {
  const structuredRows =
    buildStructuredRows(rows);

  console.log(
    "STRUCTURED BOQ ROWS:",
    structuredRows
  );

  if (
    structuredRows.length === 0
  ) {
    throw new Error(
      "No valid BOQ rows found"
    );
  }

  /* =========================================================
     REMOVE EXISTING BOQ FOR THIS PROJECT
  ========================================================= */

  const { error: deleteError } =
    await supabase
      .from("boq_items")
      .delete()
      .eq(
        "project_id",
        projectId
      );

  if (deleteError) {
    console.error(
      "FAILED TO REMOVE EXISTING PROJECT BOQ:",
      deleteError
    );

    throw deleteError;
  }

  console.log(
    `Existing BOQ cleared for project ${projectId}`
  );

  /* =========================================================
     TEMPORARY PARSER KEY -> REAL DATABASE ID
  ========================================================= */

  const insertedIds =
    new Map<string, number>();

  /* =========================================================
     INSERT ROWS IN ORIGINAL ORDER
  ========================================================= */

  for (
    const row of structuredRows
  ) {
    let parentId:
      number | null = null;

    if (row.parentKey) {
      parentId =
        insertedIds.get(
          row.parentKey
        ) ?? null;
    }

    const { data, error } =
      await supabase
        .from("boq_items")
        .insert({
          project_id:
            projectId,

          serial_no:
            row.serial_no,

          description:
            row.description,

          unit:
            row.unit,

          quantity:
            row.quantity,

          rate:
            row.rate,

          amount:
            row.amount,

          row_type:
            row.row_type,

          parent_serial:
            row.parent_serial,

          parent_id:
            parentId,

          sort_order:
            row.sort_order,

          source_row:
            row.source_row,

          short_description:
            null,

          category:
            null,

          dsr_id:
            null,
        })
        .select("id")
        .single();

    if (error) {
      console.error(
        "BOQ INSERT ERROR:",
        row,
        error
      );

      throw error;
    }

    insertedIds.set(
      row.rowKey,
      data.id
    );
  }

  console.log(
    "BOQ IMPORT COMPLETED:",
    structuredRows.length,
    "rows"
  );

  return {
    success: true,

    insertedCount:
      structuredRows.length,
  };
}