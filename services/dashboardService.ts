import { supabase } from "@/lib/supabase";

export async function getDashboardStats() {
  try {

    const { count: projects } =
      await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

    const { count: boqItems } =
      await supabase
        .from("boq_items")
        .select("*", { count: "exact", head: true });

    const { count: raBills } =
      await supabase
        .from("ra_bills")
        .select("*", { count: "exact", head: true });

    return {
      projects: projects || 0,
      boqItems: boqItems || 0,
      raBills: raBills || 0,
      materials: 0,
    };

  } catch (error) {
    console.error(error);

    return {
      projects: 0,
      boqItems: 0,
      raBills: 0,
      materials: 0,
    };
  }
}