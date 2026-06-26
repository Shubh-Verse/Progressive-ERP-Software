"use client";

import {
  Building2,
  Calendar,
  CircleDollarSign,
  MapPin,
  User,
  Briefcase,
  FileText,
} from "lucide-react";

interface Props {
  project: any;
}

export default function ProjectInformation({
  project,
}: Props) {
  if (!project) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="rounded-xl bg-blue-100 p-3">

          <Building2
            className="text-blue-600"
            size={24}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Project Information
          </h2>

          <p className="text-slate-500 mt-1">
            General information about the selected project.
          </p>

        </div>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-4 gap-x-10 gap-y-8">

        <InfoItem
          label="Project Name"
          value={project.name}
        />

        <InfoItem
          label="Client"
          value={project.client_name}
          icon={<User size={16} />}
        />

        <InfoItem
          label="Location"
          value={project.location}
          icon={<MapPin size={16} />}
        />

        <InfoItem
          label="Project Type"
          value={project.project_type}
          icon={<Briefcase size={16} />}
        />

        <InfoItem
          label="Contract Value"
          value={
            project.contract_value
              ? `₹ ${Number(
                  project.contract_value
                ).toLocaleString()}`
              : "-"
          }
          className="text-green-700"
          icon={<CircleDollarSign size={16} />}
        />

        <InfoItem
          label="Status"
          value={project.status}
        />

        <InfoItem
          label="Start Date"
          value={project.start_date}
          icon={<Calendar size={16} />}
        />

        <InfoItem
          label="Completion Date"
          value={project.end_date}
          icon={<Calendar size={16} />}
        />

        <InfoItem
          label="Consultant"
          value={project.consultant}
        />

        <InfoItem
          label="Contractor"
          value={project.contractor}
        />

        <InfoItem
          label="Currency"
          value={project.currency || "INR"}
        />

        <InfoItem
          label="BOQ Version"
          value={project.boq_version || "Rev. 01"}
        />

      </div>

      {/* Description */}

      <div className="mt-10">

        <div className="flex items-center gap-2 mb-3">

          <FileText
            size={16}
            className="text-slate-500"
          />

          <p className="text-sm font-medium text-slate-600">
            Project Description
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700">

          {project.description ||
            "No project description available."}

        </div>

      </div>

    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: any;
  icon?: React.ReactNode;
  className?: string;
}

function InfoItem({
  label,
  value,
  icon,
  className,
}: InfoItemProps) {
  return (
    <div>

      <div className="flex items-center gap-2 text-sm text-slate-500">

        {icon}

        <span>{label}</span>

      </div>

      <p
        className={`mt-2 font-semibold text-slate-900 ${className || ""}`}
      >
        {value || "-"}
      </p>

    </div>
  );
}