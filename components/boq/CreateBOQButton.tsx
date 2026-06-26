"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function CreateBOQButton() {

  const params = useParams();

  return (
    <Link
      href={`/project-management/${params.id}/boq/new`}
      className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5 py-3
      rounded-xl
      font-semibold
      "
    >
      + Add Item
    </Link>
  );
}