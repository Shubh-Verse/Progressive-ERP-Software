import { supabase } from "@/lib/supabase";

import {
  DSRItem,
  DSRComponent,
  ReferenceDetail,
} from "@/types/dsr";

export async function getReference(
  id: number
): Promise<ReferenceDetail | null> {

  const { data: master, error: masterError } =
    await supabase
      .from("dsr_master")
      .select("*")
      .eq("id", id)
      .single();

  if (masterError || !master) {
    console.error(masterError);
    return null;
  }

  const {
    data: components,
    error: componentError,
  } = await supabase
    .from("dsr_components")
    .select("*")
    .eq("dsr_id", id)
    .order("id");

  if (componentError) {
    console.error(componentError);
  }

  return {
    master: master as DSRItem,
    components: (components ?? []) as DSRComponent[],
  };
}