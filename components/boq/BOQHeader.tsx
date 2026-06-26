"use client";

import { useEffect, useState } from "react";
import { getBOQSummary } from "@/services/boqService";
import { BOQSummary } from "@/types/boq";

interface Props {
  boqId: number;
}

export default function BOQHeader({ boqId }: Props) {
  const [boq, setBOQ] = useState<BOQSummary | null>(null);

  useEffect(() => {
    getBOQSummary(boqId).then(setBOQ);
  }, [boqId]);

  // Skeleton Loader
  if (!boq) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6 animate-pulse">
        <div className="h-8 w-72 bg-slate-200 rounded"></div>

        <div className="h-4 w-full bg-slate-100 rounded mt-5"></div>
        <div className="h-4 w-5/6 bg-slate-100 rounded mt-2"></div>

        <div className="grid grid-cols-6 gap-6 mt-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <div className="h-3 w-16 bg-slate-200 rounded"></div>
              <div className="h-5 w-24 bg-slate-100 rounded mt-3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            BOQ #{boq.serial_no}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Client BOQ Summary
          </p>

          <div
            className="
              mt-4
              rounded-xl
              bg-slate-50
              p-4
              text-sm
              leading-7
              max-h-36
              overflow-y-auto
            "
          >
            {boq.short_description || boq.description}
          </div>
        </div>

        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {boq.category || "Unassigned"}
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-6 gap-6 mt-8">
        <div>
          <p className="text-sm text-slate-500">Project</p>
          <p className="font-semibold">
            {boq.projects?.name || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Unit</p>
          <p className="font-semibold">
            {boq.unit}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Quantity</p>
          <p className="font-semibold">
            {boq.quantity}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Client Rate
          </p>
          <p className="font-semibold text-green-700">
            ₹ {Number(boq.rate).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Amount
          </p>
          <p className="font-bold text-green-600">
            ₹ {Number(boq.amount).toLocaleString()}
          </p>
        </div>

        {/* DSR Reference */}
        <div>
          <p className="text-sm text-slate-500">
            DSR Reference
          </p>

          {boq.dsr_master ? (
            <div className="mt-2">
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-green-700
                "
              >
                Linked
              </span>

              <p className="mt-3 font-semibold text-blue-700">
                {boq.dsr_master.dsr_code}
              </p>

              <p className="text-sm text-slate-500 line-clamp-2">
                {boq.dsr_master.description}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-3">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>

              <span className="font-medium text-red-600">
                No Reference Linked
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}