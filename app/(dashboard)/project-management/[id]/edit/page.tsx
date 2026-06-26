import { getProjectById } from "@/services/projectService";
import ProjectForm from "@/components/projects/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const project = await getProjectById(Number(id));

  return (
    <div>

      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Edit Project
      </h1>

      <ProjectForm project={project} />

    </div>
  );
}