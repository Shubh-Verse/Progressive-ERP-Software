"use client";

import { ReferenceSearchResult } from "@/types/dsr";
import DSRSearchItem from "./DSRSearchItem";

interface Props {
  results: ReferenceSearchResult[];
  onSelect: (id: number) => void;
}

export default function DSRSearchResults({
  results,
  onSelect,
}: Props) {
  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-slate-500">
        Search CPWD DSR to see matching items.
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {results.map((item) => (
        <DSRSearchItem
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}