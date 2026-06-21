import { supabase } from "@/lib/supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id");

  if (error) throw error;

  return data;
}