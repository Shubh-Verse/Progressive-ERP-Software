import { supabase } from "@/lib/supabase";


// ===============================
// Get All DSR Items
// ===============================
export async function getDSRItems() {
  const { data, error } = await supabase
    .from("dsr_master")
    .select("*")
    .order("dsr_code");

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
}


// ===============================
// Create DSR Item
// ===============================
export async function createDSRItem(item: any) {
  const { data, error } = await supabase
    .from("dsr_master")
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}


// ===============================
// Get DSR By ID
// ===============================
export async function getDSRById(id: number) {
  const { data, error } = await supabase
    .from("dsr_master")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}


// ===============================
// Get DSR By Code
// ===============================
export async function getDSRByCode(
  dsrCode: string
) {
  const { data, error } = await supabase
    .from("dsr_master")
    .select("*")
    .eq("dsr_code", dsrCode)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}


// ===============================
// Update DSR Item
// ===============================
export async function updateDSRItem(
  id: number,
  values: any
) {
  const { data, error } = await supabase
    .from("dsr_master")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}


// ===============================
// Delete DSR Item
// ===============================
export async function deleteDSRItem(
  id: number
) {

  // Delete components first
  await supabase
    .from("dsr_components")
    .delete()
    .eq("dsr_id", id);

  // Delete master row
  const { error } = await supabase
    .from("dsr_master")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  return true;
}


// ===============================
// Search DSR Items
// ===============================
export async function searchDSRItems(
  search: string
) {

  if (!search.trim()) {
    return [];
  }

  const { data, error } = await supabase
    .from("dsr_master")
    .select("*")
    .or(
      `dsr_code.ilike.%${search}%,description.ilike.%${search}%`
    )
    .order("dsr_code")
    .limit(50);

  if (error) {
    console.error(error);
    throw error;
  }

  return data || [];
}