import { supabase } from "@/lib/supabase";

export async function getCostingItems(projectId: number) {
  const { data, error } = await supabase
    .from("costing_items")
    .select(`
      *,
      boq_items(
        id,
        description,
        quantity,
        rate
      )
    `)
    .eq("project_id", projectId)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createCosting(costingData: any) {

    console.log("INSERTING:", costingData);
  
    const { data, error } = await supabase
      .from("costing_items")
      .insert([costingData])
      .select()
      .single();
  
    console.log("INSERT DATA:", data);
    console.log("INSERT ERROR:", error);
  
    if (error) {
      throw error;
    }
  
    return data;
  }