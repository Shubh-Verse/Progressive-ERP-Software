"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  parseBOQExcel,
  saveBOQRows,
} from "@/services/boqUploadService";

interface Props {
  projectId: number;
}

export default function BOQUploadForm({
  projectId,
}: Props) {

  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  async function handleUpload() {

    if (!file) {
      toast.error("Select a file first");
      return;
    }

    try {

      const rows = await parseBOQExcel(file);

      await saveBOQRows(projectId, rows);

      toast.success("BOQ uploaded successfully");

      router.push(`/project-management/${projectId}/boq`);

    } catch (error) {

      console.error(error);

      toast.error("Upload failed");

    }
  }

  return (

    <div className="space-y-8">

      <div
        className="
        border-2
        border-dashed
        border-slate-300
        rounded-3xl
        p-20
        text-center
      "
      >

        <h2 className="text-2xl font-bold">
          Upload BOQ Excel
        </h2>

        <p className="text-slate-500 mt-4">
          Supported formats: .xlsx .xls .csv
        </p>

        <div className="mt-8 flex flex-col items-center gap-6">

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="
            border
            border-slate-300
            rounded-xl
            p-3
            "
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />

          <button
            type="button"
            onClick={handleUpload}
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            "
          >
            Import BOQ
          </button>

        </div>

      </div>

    </div>

  );
}