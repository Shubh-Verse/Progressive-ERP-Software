import ProjectTable from "@/components/projects/ProjectTable";
import { getProjects } from "@/services/projectService";

export default async function ProjectsPage() {

  const projects = await getProjects();

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="text-gray-500">
            Manage all projects
          </p>

        </div>

      </div>

      <ProjectTable projects={projects} />

    </div>
  );
}