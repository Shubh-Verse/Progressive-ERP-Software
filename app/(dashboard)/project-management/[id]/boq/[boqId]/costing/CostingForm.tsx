"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { createCosting } from "@/services/costingService";

interface Props {
  boqItemId: number;
  projectId: number;
}

export default function CostingForm({ boqItemId, projectId }: Props) {

    const router = useRouter();
  
    const [formData, setFormData] = useState({
      material_cost: 0,
      fitting_cost: 0,
      hardware_cost: 0,
      labour_cost: 0,
      overhead: 0,
      margin_percent: 0,
    });

  // Calculate live summary breakdown metrics
  const totalCost =
    Number(formData.material_cost) +
    Number(formData.fitting_cost) +
    Number(formData.hardware_cost) +
    Number(formData.labour_cost) +
    Number(formData.overhead);

  const profit = (totalCost * Number(formData.margin_percent)) / 100;
  const finalRate = totalCost + profit;

  // Handle generalized structural changes for inputs
  const handleInputChange = (key: keyof typeof formData, value: string) => {
    // Gracefully handle empty fields or backspaces by defaulting to 0
    const numericValue = value === "" ? 0 : Number(value);
    setFormData((prev) => ({
      ...prev,
      [key]: numericValue,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      project_id: projectId,
      boq_item_id: boqItemId,
      material_cost: formData.material_cost,
      fitting_cost: formData.fitting_cost,
      hardware_cost: formData.hardware_cost,
      labour_cost: formData.labour_cost,
      overhead: formData.overhead,
      margin_percent: formData.margin_percent,
      total_cost: totalCost,
      profit,
      final_rate: finalRate,
    };

    console.log("PAYLOAD:", payload);

    try {
        const result = await createCosting(payload);
      
        console.log("SAVED RESULT:", result);
      
        toast.success("Costing saved successfully");
      
        router.push(`/project-management/${projectId}/boq`);
        router.refresh();
      
      } catch (error) {
        console.error("SAVE ERROR:", error);
        toast.error("Failed to save costing");
      }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-2">Margin (%)</label>
          <input
            type="number"
            placeholder="Margin %"
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.margin_percent || ""}
            onChange={(e) => handleInputChange("margin_percent", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block mb-2">Material Cost (₹)</label>
          <input
            type="number"
            placeholder="Material Cost"
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.material_cost || ""}
            onChange={(e) => handleInputChange("material_cost", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block mb-2">Fitting Cost (₹)</label>
          <input
            type="number"
            placeholder="Fitting Cost"
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fitting_cost || ""}
            onChange={(e) => handleInputChange("fitting_cost", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block mb-2">Hardware Cost (₹)</label>
          <input
            type="number"
            placeholder="Hardware Cost"
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.hardware_cost || ""}
            onChange={(e) => handleInputChange("hardware_cost", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block mb-2">Labour Cost (₹)</label>
          <input
            type="number"
            placeholder="Labour Cost"
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.labour_cost || ""}
            onChange={(e) => handleInputChange("labour_cost", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 block mb-2">Overhead (₹)</label>
          <input
            type="number"
            placeholder="Overhead"
            className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.overhead || ""}
            onChange={(e) => handleInputChange("overhead", e.target.value)}
          />
        </div>
      </div>

      {/* Live Financial Overview Table Section */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4 text-center">Mat</th>
                <th className="p-4 text-center">Fitt</th>
                <th className="p-4 text-center">HW</th>
                <th className="p-4 text-center">Labour</th>
                <th className="p-4 text-center">Overhead</th>
                <th className="p-4 text-center">Total Cost</th>
                <th className="p-4 text-center">Margin</th>
                <th className="p-4 text-center">Profit</th>
                <th className="p-4 text-center">Final Rate</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="text-center font-semibold bg-white">
                <td className="p-4">₹ {formData.material_cost.toLocaleString()}</td>
                <td className="p-4">₹ {formData.fitting_cost.toLocaleString()}</td>
                <td className="p-4">₹ {formData.hardware_cost.toLocaleString()}</td>
                <td className="p-4">₹ {formData.labour_cost.toLocaleString()}</td>
                <td className="p-4">₹ {formData.overhead.toLocaleString()}</td>
                <td className="p-4 bg-slate-50">₹ {totalCost.toLocaleString()}</td>
                <td className="p-4">{formData.margin_percent}%</td>
                <td className="p-4 text-green-600 bg-green-50/50">
                  ₹ {profit.toLocaleString()}
                </td>
                <td className="p-4 text-blue-600 bg-blue-50/50 text-base">
                  ₹ {finalRate.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-sm transition-colors duration-200"
        >
          Save Cost Components
        </button>
      </div>
    </form>
  );
}