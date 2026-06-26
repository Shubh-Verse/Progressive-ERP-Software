import Link from "next/link";

interface Props {
  projects: any[];
}

export default function ProjectTable({ projects }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full">

        <thead className="bg-slate-50">
          <tr className="text-slate-700 text-sm font-semibold">
            <th className="p-4 text-left">Project</th>
            <th className="p-4 text-left">Client</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-slate-200 hover:bg-slate-50 transition"
            >
              <td className="p-4 text-slate-900 font-medium">
                {project.project_name}
              </td>

              <td className="p-4 text-slate-700">
                {project.client_name}
              </td>

              <td className="p-4 text-slate-700">
                {project.location}
              </td>

              <td className="p-4">
                <Link
                  href={`/project-management/${project.id}`}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}