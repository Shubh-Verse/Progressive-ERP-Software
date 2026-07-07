import { supabase } from "@/lib/supabase";

export async function getDSRCategories() {
  const { data, error } = await supabase
    .from("dsr_categories")
    .select("*")
    .order("id");

  if (error) throw error;

  return data;
}

export async function getDSRChapters(
  categoryId: number
) {
  const { data, error } = await supabase
    .from("dsr_chapters")
    .select("*")
    .eq("category_id", categoryId)
    .order("chapter_no");

  if (error) throw error;

  return data;
}

export function getPDFUrl(
  pdfPath: string
) {
  return supabase.storage
    .from("dsr-pdfs")
    .getPublicUrl(pdfPath).data.publicUrl;
}