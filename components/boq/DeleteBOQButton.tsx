"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteBOQItem } from "@/services/boqService";

export default function DeleteBOQButton({
  id,
}: {
  id: number;
}) {

  const router = useRouter();

  async function handleDelete() {

    const confirmed = confirm(
      "Delete this BOQ item?"
    );

    if (!confirmed) return;

    try {

      await deleteBOQItem(id);

      toast.success("BOQ Item Deleted");

      router.refresh();

    } catch {

      toast.error("Failed to delete");

    }

  }

  return (
    <button
      onClick={handleDelete}
      className="
      bg-red-500
      hover:bg-red-600
      text-white
      px-3 py-2
      rounded-lg
      font-medium
      "
    >
      Delete
    </button>
  );
}