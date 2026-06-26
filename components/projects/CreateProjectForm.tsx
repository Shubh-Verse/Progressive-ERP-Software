"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createProject } from "@/services/projectService";

export default function CreateProjectForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    project_name: "",
    client_name: "",
    location: "",
    contract_value: "",
    contract_unit: "Crore",
    start_date: "",
    end_date: "",
    status: "Active",
    description: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await createProject({
        project_name: formData.project_name,
        client_name: formData.client_name,
        location: formData.location,
        contract_value: Number(formData.contract_value) || 0,
        contract_unit: formData.contract_unit,
        status: formData.status,
        description: formData.description,
      
        start_date:
          formData.start_date === ""
            ? null
            : formData.start_date,
      
        end_date:
          formData.end_date === ""
            ? null
            : formData.end_date,
      });

      toast.success(
        "Project created successfully"
      );

      router.push("/project-management");
      router.refresh();

    } catch (error: any) {
        console.error(error);
      
        toast.error(
          error?.message || "Failed to create project"
        );
      } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
    >
      <div className="grid grid-cols-2 gap-6">
  
        {/* Project Name */}
        <div>
          <label className="text-slate-700 font-medium">
            Project Name
          </label>
  
          <input
            required
            className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900"
            value={formData.project_name}
            placeholder="Project Name"
            onChange={(e) =>
              setFormData({
                ...formData,
                project_name: e.target.value,
              })
            }
          />
        </div>
  
        {/* Client Name */}
        <div>
          <label className="text-slate-700 font-medium">
            Client Name
          </label>
  
          <input
            className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900"
            value={formData.client_name}
            placeholder="Client Name"
            onChange={(e) =>
              setFormData({
                ...formData,
                client_name: e.target.value,
              })
            }
          />
        </div>
  
        {/* Location */}
        <div>
          <label className="text-slate-700 font-medium">
            Location
          </label>
  
          <input
            className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900"
            value={formData.location}
            placeholder="City, State"
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
          />
        </div>
  
        {/* Contract Value + Unit */}
        <div>
          <label className="text-slate-700 font-medium">
            Contract Value
          </label>
  
          <div className="grid grid-cols-2 gap-4 mt-2">
  
            <input
              type="number"
              placeholder="Contract Value"
              className="px-4 py-3 border border-slate-300 rounded-xl text-slate-900"
              value={formData.contract_value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contract_value: e.target.value,
                })
              }
            />
  
            <select
              className="px-4 py-3 border border-slate-300 rounded-xl text-slate-900"
              value={formData.contract_unit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contract_unit: e.target.value,
                })
              }
            >
              <option value="Crore">Crore</option>
              <option value="Lakh">Lakh</option>
              <option value="Million">Million</option>
            </select>
  
          </div>
        </div>
  
      </div>
  
      <button
        type="submit"
        disabled={loading}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}