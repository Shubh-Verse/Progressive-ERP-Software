"use client";

import { ReferenceSearchResult } from "@/types/dsr";

interface Props {
  item: ReferenceSearchResult;
  onSelect: (id: number) => void;
}

export default function DSRSearchItem({
  item,
  onSelect,
}: Props) {
  return (
    <button
      onClick={() => onSelect(item.id)}
      className="
        w-full
        rounded-xl
        border
        p-4
        text-left
        transition
        hover:border-blue-500
        hover:bg-blue-50
      "
    >
      <p className="font-semibold text-slate-800">
        {item.dsr_code}
      </p>

      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
        {item.description}
      </p>

      {item.rate && (
        <p className="mt-3 font-semibold text-green-600">
          ₹ {Number(item.rate).toLocaleString()}
        </p>
      )}
    </button>
  );
}