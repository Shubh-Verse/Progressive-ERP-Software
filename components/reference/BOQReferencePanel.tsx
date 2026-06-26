"use client";

import { Search, FileText } from "lucide-react";
import { ReferenceDetail } from "@/types/dsr";

interface Props {
  reference: ReferenceDetail | null;
  loading: boolean;
  onSearch: () => void;
}

export default function BOQReferencePanel({
  reference,
  loading,
  onSearch,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            CPWD DSR Reference
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search CPWD DSR and compare it with this BOQ item.
          </p>

        </div>

        <button
          onClick={onSearch}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-white
            hover:bg-blue-700
          "
        >
          <Search size={18} />
          Search
        </button>

      </div>

      {loading && (

        <div className="mt-8 animate-pulse space-y-4">

          <div className="h-5 w-48 rounded bg-slate-200" />

          <div className="h-4 w-full rounded bg-slate-100" />

          <div className="h-4 w-3/4 rounded bg-slate-100" />

        </div>

      )}

      {!loading && !reference && (

        <div
          className="
            mt-8
            rounded-2xl
            border-2
            border-dashed
            border-slate-200
            p-8
            text-center
          "
        >

          <FileText
            size={40}
            className="mx-auto text-slate-400"
          />

          <h3 className="mt-4 text-lg font-semibold">
            No DSR Selected
          </h3>

          <p className="mt-2 text-slate-500">
            Search the CPWD DSR to compare rates and specifications.
          </p>

        </div>

      )}

      {!loading && reference && (

        <div className="mt-8 space-y-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                DSR Code
              </p>

              <h3 className="text-xl font-bold text-blue-700">
                {reference.master.dsr_code}
              </h3>

            </div>

            <div className="text-right">

              <p className="text-sm text-slate-500">
                DSR Rate
              </p>

              <h3 className="text-xl font-bold text-green-700">
                ₹ {Number(reference.master.rate).toLocaleString()}
              </h3>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <p className="text-sm text-slate-500">
                Unit
              </p>

              <p className="font-semibold">
                {reference.master.unit}
              </p>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Category
              </p>

              <p className="font-semibold">
                {reference.master.category || "-"}
              </p>

            </div>

          </div>

          <div>

            <p className="text-sm text-slate-500">
              DSR Description
            </p>

            <div className="mt-2 rounded-xl bg-slate-50 p-4 leading-7">
              {reference.master.description}
            </div>

          </div>

        </div>

      )}

    </div>
  );
}