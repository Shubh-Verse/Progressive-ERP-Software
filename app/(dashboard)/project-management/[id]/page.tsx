import Link from "next/link";
import { getProjectById } from "@/services/projectService";
import {
  ClipboardList,
  Ruler,
  FileText,
  TrendingUp,
  FolderOpen,
  Users,
  DollarSign,
} from "lucide-react";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await getProjectById(Number(id));

  const cards = [
    {
      title: "BOQ",
      icon: ClipboardList,
      href: `/project-management/${id}/boq`,
    },
    {
      title: "Costing",
      icon: DollarSign,
      href: `/project-management/${id}/costing`,
    },
    {
      title: "Measurements",
      icon: Ruler,
      href: `/project-management/${id}/measurements`,
    },
    {
      title: "RA Bills",
      icon: FileText,
      href: `/project-management/${id}/ra-bills`,
    },
    {
      title: "Progress",
      icon: TrendingUp,
      href: `/project-management/${id}/progress`,
    },
    {
      title: "Documents",
      icon: FolderOpen,
      href: `/project-management/${id}/documents`,
    },
    {
      title: "Contacts",
      icon: Users,
      href: `/project-management/${id}/contacts`,
    },
  ];

  const iconStyles: Record<string, string> = {
    BOQ: "text-blue-600 bg-blue-100",
    Costing: "text-green-600 bg-green-100",
    Measurements: "text-yellow-600 bg-yellow-100",
    "RA Bills": "text-purple-600 bg-purple-100",
    Progress: "text-red-600 bg-red-100",
    Documents: "text-slate-600 bg-slate-100",
    Contacts: "text-indigo-600 bg-indigo-100",
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            {project?.project_name || "Untitled Project"}
          </h1>

          <p className="text-slate-500 mt-1">
            Project Details
          </p>
        </div>

        <Link
          href={`/project-management/${project?.id || id}/edit`}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          "
        >
          Edit Project
        </Link>

      </div>

      {/* Project Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="text-sm text-slate-500">
              Client
            </h3>

            <p className="text-lg font-semibold text-slate-900 mt-1">
              {project?.client_name || "-"}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">
              Location
            </h3>

            <p className="text-lg font-semibold text-slate-900 mt-1">
              {project?.location || "-"}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">
              Contract Value
            </h3>

            <p className="text-lg font-semibold text-slate-900 mt-1">
              ₹ {project?.contract_value || 0}{" "}
              {project?.contract_unit || ""}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">
              Status
            </h3>

            <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              {project?.status || "Active"}
            </span>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">
              Start Date
            </h3>

            <p className="text-slate-900 mt-1">
              {project?.start_date || "-"}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">
              End Date
            </h3>

            <p className="text-slate-900 mt-1">
              {project?.end_date || "-"}
            </p>
          </div>

        </div>

        <div className="mt-8">

          <h3 className="text-sm text-slate-500">
            Description
          </h3>

          <p className="text-slate-700 mt-2">
            {project?.description || "No description available"}
          </p>

        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-500">
            Contract Value
          </h3>

          <p className="text-2xl font-bold text-slate-900 mt-3">
            ₹ {project?.contract_value || 0}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-500">
            BOQ Items
          </h3>

          <p className="text-2xl font-bold text-blue-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-500">
            RA Bills
          </h3>

          <p className="text-2xl font-bold text-purple-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-500">
            Progress
          </h3>

          <p className="text-2xl font-bold text-green-600 mt-3">
            0%
          </p>
        </div>

      </div>

      {/* BOQ Setup */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

        <h2 className="text-2xl font-bold text-slate-900">
          BOQ Setup
        </h2>

        <p className="text-slate-500 mt-2">
          No BOQ uploaded yet. Upload the client's BOQ to begin Costing,
          Measurements and Billing.
        </p>

        <div className="flex gap-4 mt-6">

          <Link
            href={`/project-management/${id}/upload-boq`}
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            "
          >
            Upload BOQ Excel
          </Link>

          <Link
            href={`/project-management/${id}/boq/new`}
            className="
            border
            border-slate-300
            hover:bg-slate-50
            px-6
            py-3
            rounded-xl
            font-semibold
            "
          >
            Add BOQ Manually
          </Link>

        </div>

      </div>

      {/* Modules */}
      <div className="grid md:grid-cols-3 gap-6">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <Link
              key={card.title}
              href={card.href}
              className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              "
            >

              <Icon
                size={40}
                className={`p-2 rounded-2xl mb-5 ${iconStyles[card.title]}`}
              />

              <h2 className="text-xl font-bold text-slate-900">
                {card.title}
              </h2>

              <p className="text-slate-500 mt-2">
                Open {card.title}
              </p>

            </Link>

          );

        })}

      </div>

    </div>
  );
}