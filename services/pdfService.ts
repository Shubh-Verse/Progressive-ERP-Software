import { supabase } from "@/lib/supabase";

export function getPDFUrl(path: string) {
  const { data } = supabase.storage
    .from("dsr-pdfs")
    .getPublicUrl(path);

  return data.publicUrl;
}