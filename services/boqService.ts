import { supabase } from "@/lib/supabase";

export async function getBOQItems(projectId: number) {
  const { data: boqItems, error } = await supabase
    .from("boq_items")
    .select("*")
    .eq("project_id", projectId)
    .order("id");

  if (error) {
    console.error(error);
    throw error;
  }

  

  const { data: costingItems, error: costingError } = await supabase
    .from("costing_items")
    .select("boq_item_id")
    .eq("project_id", projectId);

  if (costingError) {
    console.error(costingError);
    throw costingError;
  }

  const costingSet = new Set(
    costingItems?.map((item) => item.boq_item_id)
  );

  return (
    boqItems?.map((item) => ({
      ...item,
      hasCosting: costingSet.has(item.id),
    })) || []
  );
}

export async function createBOQItem(item: any) {
  const { data, error } = await supabase
    .from("boq_items")
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// =====================================
// SEARCH DSR
// =====================================

export async function searchDSR(
  keyword: string
) {
  if (!keyword) return [];

  const { data, error } = await supabase
    .from("dsr_master")
    .select(`
      id,
      dsr_code,
      description
    `)
    .ilike("description", `%${keyword}%`)
    .limit(10);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// =====================================
// LINK DSR
// =====================================

export async function linkDSRToBOQ(
  boqId: number,
  dsrId: number
) {

  const { error } = await supabase
    .from("boq_items")
    .update({
      dsr_id: dsrId,
    })
    .eq("id", boqId);

  if (error) {
    throw error;
  }

  return true;
}

export async function getBOQItemById(id: number) {
  const { data, error } = await supabase
    .from("boq_items")
    .select(`
      *,
      projects(*)
    `)
    .eq("id", id)
    .single();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) throw error;

  return data;
}

export async function updateBOQItem(
  id: number,
  item: any
) {
  const { data, error } = await supabase
    .from("boq_items")
    .update(item)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// ================================
// BOQ Summary
// ================================
export async function getBOQSummary(
  boqId: number
) {
  const { data, error } = await supabase
    .from("boq_items")
    .select(`
      *,
      projects (
        id,
        name
       ),
       
       dsr_master (
        id,
        dsr_code,
        description
       )
    `)
    .eq("id", boqId)
    .single();

    if (error) {
      console.error("========== BOQ SUMMARY ERROR ==========");
      console.error(error);
      console.error(JSON.stringify(error, null, 2));
      return null;
    }

  return data;
}

export async function deleteBOQItem(id: number) {
  // Delete related costing rows first
  const { error: costingError } = await supabase
    .from("costing_items")
    .delete()
    .eq("boq_item_id", id);

  if (costingError) {
    console.error(costingError);
    throw costingError;
  }

  // Delete BOQ item
  const { error } = await supabase
    .from("boq_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return true;
}