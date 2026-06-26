import { supabase } from "@/lib/supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id");

  if (error) throw error;

  return data;
}

export async function getProjectById(id: number) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function createProject(project: any) {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProject(
  id: number,
  project: any
) {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getProjectDetails(
  projectId: number
) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    console.error("PROJECT DETAILS ERROR");
    console.error(error);
    return null;
  }

  return data;
}

export async function deleteProject(id: number) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}