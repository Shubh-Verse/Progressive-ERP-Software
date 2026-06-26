"use client";

import ReferenceSearch from "./ReferenceSearch";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
}

export default function ReferenceSearchDialog({
  open,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
      "
    >
      <div
        className="
          w-[800px]
          max-h-[90vh]
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              Search CPWD DSR
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search by DSR code or description.
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              px-4
              py-2
              hover:bg-slate-100
            "
          >
            Close
          </button>

        </div>

        {/* Search */}

        <div className="p-6">

          <ReferenceSearch
            onSelect={(id) => {
              onSelect(id);
              onClose();
            }}
          />

        </div>

      </div>
    </div>
  );
}