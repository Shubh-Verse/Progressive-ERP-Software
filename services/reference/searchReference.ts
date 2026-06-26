import { supabase } from "@/lib/supabase";

export interface ReferenceSearchResult {
  id: number;
  dsr_code: string;
  description: string;
}

export async function searchReference(
  keyword: string
): Promise<ReferenceSearchResult[]> {

  const search = keyword.trim();

  if (!search) {
    return [];
  }

  const { data, error } = await supabase
    .from("dsr_master")
    .select(`
  id,
  dsr_code,
  description,
  unit,
  rate
`)
    .or(
      `description.ilike.%${search}%,dsr_code.ilike.%${search}%`
    )
    .order("dsr_code")
    .limit(20);

  if (error) {
    console.error("REFERENCE SEARCH ERROR");
    console.error(error);
    return [];
  }

  return (data || []) as ReferenceSearchResult[];
}