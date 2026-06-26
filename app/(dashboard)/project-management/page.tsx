import Link from "next/link";
import ProjectTable from "@/components/projects/ProjectTable";
import { getProjects } from "@/services/projectService";

export default async function ProjectManagementPage() {
  const projects = await getProjects();

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Project Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all projects
          </p>
        </div>

        <Link
          href="/project-management/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          + New Project
        </Link>

      </div>

      <ProjectTable projects={projects} />

    </div>
  );
}