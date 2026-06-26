"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { createBOQItem } from "@/services/boqService";

export default function CreateBOQForm() {

  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    unit: "",
    quantity: "",
    rate: "",
  });

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    try {

      setLoading(true);

      await createBOQItem({

        project_id: Number(params.id),

        item_name: formData.item_name,

        description: formData.description,

        unit: formData.unit,

        quantity: Number(formData.quantity),

        rate: Number(formData.rate),

        amount:
          Number(formData.quantity) *
          Number(formData.rate),

      });

      toast.success("BOQ Item Added");

      router.push(`/project-management/${params.id}/boq`);

      router.refresh();

    } catch (error: any) {

      toast.error(error.message);

    } finally {

      setLoading(false);

    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6"
    >

      <input
        placeholder="Item Name"
        className="w-full p-3 border rounded-xl text-slate-900"
        value={formData.item_name}
        onChange={(e)=>
          setFormData({
            ...formData,
            item_name:e.target.value
          })
        }
      />

      <textarea
        placeholder="Description"
        className="w-full p-3 border rounded-xl text-slate-900"
        value={formData.description}
        onChange={(e)=>
          setFormData({
            ...formData,
            description:e.target.value
          })
        }
      />

      <div className="grid grid-cols-3 gap-4">

        <input
          placeholder="Unit"
          className="p-3 border rounded-xl text-slate-900"
          value={formData.unit}
          onChange={(e)=>
            setFormData({
              ...formData,
              unit:e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          className="p-3 border rounded-xl text-slate-900"
          value={formData.quantity}
          onChange={(e)=>
            setFormData({
              ...formData,
              quantity:e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Rate"
          className="p-3 border rounded-xl text-slate-900"
          value={formData.rate}
          onChange={(e)=>
            setFormData({
              ...formData,
              rate:e.target.value
            })
          }
        />

      </div>

      <button
        disabled={loading}
        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6 py-3
        rounded-xl
        font-semibold
        "
      >
        {loading ? "Saving..." : "Save Item"}
      </button>

    </form>
  );
}