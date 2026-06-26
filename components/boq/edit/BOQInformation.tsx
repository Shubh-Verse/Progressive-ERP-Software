"use client";

import {
  FileSpreadsheet,
  Hash,
  Boxes,
  Ruler,
  Calculator,
  BadgeIndianRupee,
  FileText,
} from "lucide-react";

interface Props {
  item: any;
}

export default function BOQInformation({
  item,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="rounded-xl bg-green-100 p-3">

          <FileSpreadsheet
            size={24}
            className="text-green-700"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Client BOQ Item
          </h2>

          <p className="mt-1 text-slate-500">
            Original BOQ information received from the client.
          </p>

        </div>

      </div>

      {/* Details */}

      <div className="grid grid-cols-3 gap-8">

        <InfoItem
          icon={<Hash size={16} />}
          label="BOQ Serial"
          value={item.serial_no}
        />

        <InfoItem
          icon={<Boxes size={16} />}
          label="Category"
          value={item.category}
        />

        <InfoItem
          icon={<Ruler size={16} />}
          label="Unit"
          value={item.unit}
        />

        <InfoItem
          icon={<Calculator size={16} />}
          label="Quantity"
          value={item.quantity}
        />

        <InfoItem
          icon={<BadgeIndianRupee size={16} />}
          label="Client Rate"
          value={`₹ ${Number(
            item.rate
          ).toLocaleString()}`}
          valueClass="text-green-700"
        />

        <InfoItem
          icon={<BadgeIndianRupee size={16} />}
          label="Amount"
          value={`₹ ${Number(
            item.amount
          ).toLocaleString()}`}
          valueClass="text-blue-700"
        />

      </div>

      {/* Description */}

      <div className="mt-10">

        <div className="flex items-center gap-2">

          <FileText
            size={16}
            className="text-slate-500"
          />

          <p className="text-sm font-medium text-slate-500">
            Client BOQ Description
          </p>

        </div>

        <div className="mt-3 rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700 max-h-56 overflow-y-auto">

          {item.description}

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-xl bg-blue-50 p-4">

        <p className="text-sm font-semibold text-blue-700">

          Source

        </p>

        <p className="mt-1 text-sm text-blue-600">

          Imported directly from the client's BOQ.
          This information is read-only and is used
          as the reference while preparing the estimate.

        </p>

      </div>

    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: any;
  valueClass?: string;
}

function InfoItem({
  icon,
  label,
  value,
  valueClass,
}: InfoItemProps) {
  return (
    <div>

      <div className="flex items-center gap-2 text-sm text-slate-500">

        {icon}

        <span>{label}</span>

      </div>

      <p
        className={`mt-2 font-semibold text-slate-900 ${valueClass || ""}`}
      >
        {value || "-"}
      </p>

    </div>
  );
}