import Link from "next/link";

interface Props {
  projects: any[];
}

export default function ProjectTable({ projects }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Project</th>
            <th className="p-4 text-left">Client</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((project) => (

            <tr key={project.id} className="border-b">

              <td className="p-4">
                {project.project_name}
              </td>

              <td className="p-4">
                {project.client_name}
              </td>

              <td className="p-4">
                {project.location}
              </td>

              <td className="p-4">

                <Link
                  href={`/projects/${project.id}`}
                  className="text-blue-600"
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