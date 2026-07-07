"use client";

import Link from "next/link";

interface Props {
  item: any;
}

export default function BOQItemCard({
  item,
}: Props) {

  return (

    <div className="grid grid-cols-12 gap-4 border-b p-5 items-start">

      <div className="col-span-1">

        {item.serial_no || "-"}

      </div>

      <div className="col-span-6">

        <div className="font-semibold">

          {item.short_description || "-"}

        </div>

        <div className="text-sm text-slate-500 mt-2">

          {item.description}

        </div>

      </div>

      <div className="text-center">

        {item.unit}

      </div>

      <div className="text-center">

        {item.quantity}

      </div>

      <div className="text-center">

        ₹ {Number(item.rate).toLocaleString()}

      </div>

      <div className="text-center font-bold text-green-600">

        ₹ {Number(item.amount).toLocaleString()}

      </div>

      <div className="text-right">

        <Link
          href={`/project-management/${item.project_id}/boq/${item.id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Edit
        </Link>

      </div>

    </div>

  );

}