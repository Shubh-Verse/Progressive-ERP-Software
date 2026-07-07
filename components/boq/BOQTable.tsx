"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import CreateBOQButton from "./CreateBOQButton";

interface Props {
  items: any[];
}

export default function BOQTable({ items }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  function getTitle(item: any) {
    if (item.short_description?.trim()) return item.short_description;
    if (item.item_name?.trim()) return item.item_name;

    return (
      item.description?.split(".")[0]?.substring(0, 80) || "BOQ Item"
    );
  }

  const filteredItems = items.filter((item) => {
    const target = `${getTitle(item)} ${item.description || ""} ${item.category || ""}`.toLowerCase();
    return target.includes(searchQuery.toLowerCase());
  });

  const totalAmount = filteredItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Project BOQ</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredItems.length} BOQ Items
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search BOQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <button className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-medium transition hover:bg-slate-200">
              Export Excel
            </button>

            <CreateBOQButton />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-slate-100">
            <tr className="text-sm font-semibold text-slate-700">
              <th className="w-20 px-5 py-4 text-center">BOQ</th>
              <th className="min-w-[520px] px-5 py-4 text-left">Description</th>
              <th className="w-28 px-5 py-4 text-center">Unit</th>
              <th className="w-28 px-5 py-4 text-center">Qty</th>
              <th className="w-36 px-5 py-4 text-center">Rate</th>
              <th className="w-40 px-5 py-4 text-center">Amount</th>
              <th className="w-32 px-5 py-4 text-center">Status</th>
              <th className="w-28 px-5 py-4 text-center">Open</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, index) => {
              const showCategory =
                index === 0 ||
                item.category !== filteredItems[index - 1]?.category;

              return (
                <Fragment key={item.id}>
                  {showCategory && (
                    <tr>
                      <td
                        colSpan={8}
                        className="bg-slate-800 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
                      >
                        {item.category || "General BOQ"}
                      </td>
                    </tr>
                  )}

                  <tr className="border-b border-slate-100 transition hover:bg-slate-50">
                    {/* BOQ Number */}
                    <td className="px-5 py-7 text-center">
                      <span className="font-semibold text-slate-700">
                        {item.serial_no || index + 1}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-5 py-7">
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {getTitle(item)}
                        </h3>
                        <p className="text-sm leading-7 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </td>

                    {/* Unit */}
                    <td className="text-center">
                      <div>
                        <p className="text-xs text-slate-400">Unit</p>
                        <p className="mt-1 font-semibold">{item.unit || "-"}</p>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="text-center">
                      <div>
                        <p className="text-xs text-slate-400">Qty</p>
                        <p className="mt-1 font-semibold">{item.quantity || 0}</p>
                      </div>
                    </td>

                    {/* Rate */}
                    <td className="text-center">
                      <div>
                        <p className="text-xs text-slate-400">Rate</p>
                        <p className="mt-1 font-semibold text-slate-800 whitespace-nowrap">
                          ₹ {Number(item.rate || 0).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="text-center">
                      <div>
                        <p className="text-xs text-slate-400">Amount</p>
                        <p className="mt-1 font-bold text-green-600 whitespace-nowrap">
                          ₹ {Number(item.amount || 0).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="text-center">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Pending
                      </span>
                    </td>

                    {/* Open */}
                    <td className="px-4">
                      <div className="flex justify-center">
                        <Link
                          href={`/project-management/${item.project_id}/boq/${item.id}/edit`}
                          className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Open
                        </Link>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16 text-center text-slate-400">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">No BOQ Items Found</p>
                    <p className="text-sm">Try changing your search keyword.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-7 py-5">
        <div className="text-sm text-slate-500">
          Showing
          <span className="mx-1 font-semibold text-slate-700">
            {filteredItems.length}
          </span>
          BOQ Items
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Total BOQ Value
          </p>
          <p className="text-2xl font-bold text-green-700">
            ₹ {totalAmount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}