"use client";

export default function BOQToolbar() {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-slate-300
        bg-white
        px-5
        py-3
      "
    >
      <h1 className="text-xl font-bold text-slate-900">
        BOQ
      </h1>

      <button
        type="button"
        className="
          inline-flex
          h-9
          items-center
          justify-center
          rounded-lg
          bg-blue-600
          px-4
          text-sm
          font-semibold
          text-white
          transition-colors
          hover:bg-blue-700
        "
      >
        + Add Item
      </button>
    </div>
  );
}