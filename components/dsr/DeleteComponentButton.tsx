"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteDSRComponent } from "@/services/dsrComponentService";

interface Props {
  id: number;
}

export default function DeleteComponentButton({
  id,
}: Props) {

  const router = useRouter();

  async function handleDelete() {

    const confirmed = confirm(
      "Delete this component?"
    );

    if (!confirmed) return;

    try {

      await deleteDSRComponent(id);

      toast.success(
        "Component deleted"
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to delete"
      );
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="
      bg-red-600
      hover:bg-red-700
      text-white
      px-3
      py-2
      rounded-xl
      "
    >
      Delete
    </button>
  );
}