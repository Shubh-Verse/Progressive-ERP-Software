"use client";

import { 
  Search, 
  FileText, 
  Hash, 
  IndianRupee, 
  Layers, 
  Tags, 
  BookOpen,
  Loader2
} from "lucide-react";
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
    <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-xs">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
            <BookOpen size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-950">CPWD DSR Reference</h2>
            <p className="text-xs text-slate-500 mt-0.5">Search CPWD DSR and compare it with this BOQ item.</p>
          </div>
        </div>

        <button
          onClick={onSearch}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Search size={16} className="stroke-[2.5]" />
          )}
          Search DSR
        </button>
      </div>

      {/* Loading State Skeleton */}
      {loading && (
        <div className="mt-6 animate-pulse space-y-4">
          <div className="h-16 w-full rounded-xl bg-slate-50/80 border border-slate-100" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-14 rounded-xl bg-slate-50/50" />
            <div className="h-14 rounded-xl bg-slate-50/50" />
          </div>
          <div className="h-24 w-full rounded-xl bg-slate-50/30" />
        </div>
      )}

      {/* Empty State / No DSR Selected */}
      {!loading && !reference && (
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/30 py-10 px-4 text-center">
          <div className="rounded-full bg-slate-100 p-3 text-slate-400">
            <FileText size={24} />
          </div>
          <h3 className="mt-3 text-sm font-bold text-slate-800">No DSR Selected</h3>
          <p className="mt-1 max-w-xs text-xs leading-normal text-slate-400">
            Tap the search button above to explore the CPWD DSR catalog and cross-verify rates or specifications.
          </p>
        </div>
      )}

      {/* Populated Data State */}
      {!loading && reference && (
        <div className="mt-6 space-y-5">
          
          {/* Main Attributes Wrapper Box */}
          <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/20">
            
            {/* Top Row: Core Meta (Code & Price) */}
            <div className="grid grid-cols-2 divide-x divide-slate-100 p-4 pb-4 bg-white">
              
              {/* DSR Code */}
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                  <Hash size={16} />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block tracking-wide">DSR Code</span>
                  <span className="text-base font-extrabold text-blue-700 block mt-0.5">
                    {reference.master.dsr_code}
                  </span>
                </div>
              </div>

              {/* DSR Rate */}
              <div className="flex items-center gap-3 pl-4">
                <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                  <IndianRupee size={16} />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block tracking-wide">DSR Rate</span>
                  <span className="text-base font-extrabold text-emerald-600 block mt-0.5">
                    ₹ {Number(reference.master.rate).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Row: Category & Unit Split */}
            <div className="grid grid-cols-2 border-t border-slate-100 divide-x divide-slate-100 p-4 bg-slate-50/40">
              
              {/* Unit */}
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-100 p-2 text-slate-500">
                  <Layers size={15} />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block">Unit</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5 uppercase">
                    {reference.master.unit || "—"}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3 pl-4">
                <div className="rounded-full bg-slate-100 p-2 text-slate-500">
                  <Tags size={15} />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block">Category</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5 uppercase truncate max-w-[140px]" title={reference.master.category}>
                    {reference.master.category || "—"}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* DSR Description Block */}
          <div className="space-y-1.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 tracking-wide">
              <FileText size={13} />
              DSR Description Specification
            </span>
            <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 text-xs font-medium leading-relaxed text-slate-600">
              {reference.master.description}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}