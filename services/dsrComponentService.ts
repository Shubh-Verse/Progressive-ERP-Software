import { supabase } from "@/lib/supabase";

export async function createDSRComponent(item: any) {

  console.log("INSERTING:", item);

  const { data, error } = await supabase
    .from("dsr_components")
    .insert([item])
    .select();

  if (error) {

    console.log("CODE:", error.code);
    console.log("MESSAGE:", error.message);
    console.log("DETAILS:", error.details);
    console.log("HINT:", error.hint);

    throw error;
  }

  return data;
} 

export async function getDSRComponents(dsrId: number) {
  const { data, error } = await supabase
    .from("dsr_components")
    .select("*")
    .eq("dsr_id", dsrId)
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export async function getDSRComponentById(
    id: number
  ) {
  
    const { data, error } = await supabase
      .from("dsr_components")
      .select("*")
      .eq("id", id)
      .maybeSingle();
  
    if (error) {
      console.error(error);
      return null;
    }
  
    return data;
  
  }

export async function updateDSRComponent(
  id: number,
  values: any
) {
  const amount =
    Number(values.qty) *
    Number(values.rate);

  const { data, error } = await supabase
    .from("dsr_components")
    .update({
      ...values,
      amount,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteDSRComponent(id: number) {
  const { error } = await supabase
    .from("dsr_components")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}