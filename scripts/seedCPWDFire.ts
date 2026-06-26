import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {

  const workbook = XLSX.readFile(
    "./data/cpwd_fire.xlsx"
  );

  const sheet = workbook.Sheets[
    workbook.SheetNames[0]
  ];

  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(rows.length);

  // loop rows
  // insert into dsr_master
  // insert into dsr_components

}

seed();