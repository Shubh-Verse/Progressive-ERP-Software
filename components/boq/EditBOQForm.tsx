"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { updateBOQItem } from "@/services/boqService";

interface Props {
  item: any;
  hideBOQInformation?: boolean;
}

export default function EditBOQForm({
  item,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    item_name: item.item_name || "",
    unit: item.unit || "",
    quantity: item.quantity || 0,
    rate: item.rate || 0,
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateBOQItem(item.id, {
        ...formData,
        amount:
          Number(formData.quantity) *
          Number(formData.rate),
      });

      toast.success("BOQ Updated Successfully");

      router.push(
        `/project-management/${item.project_id}/boq`
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      toast.error("Failed to update BOQ");

    } finally {

      setLoading(false);

    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl
        border
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="mb-8">

        <h2 className="text-xl font-semibold">
          Edit BOQ Item
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update the editable values for this BOQ item.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>

          <label className="text-sm font-medium text-slate-700">
            Item Name
          </label>

          <input
            type="text"
            value={formData.item_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                item_name: e.target.value,
              })
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              p-3
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>

        <div>

          <label className="text-sm font-medium text-slate-700">
            Unit
          </label>

          <input
            type="text"
            value={formData.unit}
            onChange={(e) =>
              setFormData({
                ...formData,
                unit: e.target.value,
              })
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              p-3
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>

        <div>

          <label className="text-sm font-medium text-slate-700">
            Quantity
          </label>

          <input
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: Number(e.target.value),
              })
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              p-3
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>

        <div>

          <label className="text-sm font-medium text-slate-700">
            Rate
          </label>

          <input
            type="number"
            value={formData.rate}
            onChange={(e) =>
              setFormData({
                ...formData,
                rate: Number(e.target.value),
              })
            }
            className="
              mt-2
              w-full
              rounded-xl
              border
              p-3
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Calculated Amount
          </p>

          <p className="mt-1 text-2xl font-bold text-green-700">
            ₹{" "}
            {(
              Number(formData.quantity) *
              Number(formData.rate)
            ).toLocaleString()}
          </p>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-blue-600
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Updating..."
            : "Update BOQ"}
        </button>

      </div>
    </form>
  );
}