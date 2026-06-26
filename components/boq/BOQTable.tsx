"use client"; // Switched to client-side capability to power the search input field

import { useState, Fragment } from "react";
import Link from "next/link";
import CreateBOQButton from "./CreateBOQButton";
import DeleteBOQButton from "./DeleteBOQButton";

interface Props {
  items: any[];
}

export default function BOQTable({ items }: Props) {
  console.log("ALL ITEMS:", items);
  const [searchQuery, setSearchQuery] = useState("");

  function getTitle(item: any) {
    if (item.short_description?.trim()) return item.short_description;
    if (item.item_name?.trim()) return item.item_name;
    return item.description?.split(".")[0]?.substring(0, 80) || "BOQ Item";
  }

  function getCostingStatus(item: any) {
    console.log(
      "ITEM:",
      item.id,
      "hasCosting:",
      item.hasCosting
    );
  
    return item.hasCosting;
  }

  // Live filter items based on user input queries
  const filteredItems = items.filter((item) => {
    const searchTarget = `${getTitle(item)} ${item.description || ""} ${item.category || ""}`.toLowerCase();
    return searchTarget.includes(searchQuery.toLowerCase());
  });

  const totalAmount = filteredItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">BOQ Items</h2>
          <p className="text-sm text-slate-500 mt-1">
            Total {filteredItems.length} {filteredItems.length === items.length ? "Items" : "found"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search BOQ Item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <button className="bg-slate-100 hover:bg-slate-200 px-5 py-2 rounded-xl font-medium text-sm transition-colors">
            Export Excel
          </button>

          <CreateBOQButton />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 sticky top-0 z-10">
            <tr className="text-sm text-slate-700">
              <th className="p-4 text-center w-16">#</th>
              <th className="p-4 text-left min-w-[500px]">Item Description</th>
              <th className="p-4 text-center">Unit</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4 text-center">Rate</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">Costing</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, index) => {
              // Calculate category row header dynamically relative to your matching filter stack
              const showCategory =
                index === 0 || item.category !== filteredItems[index - 1]?.category;

              return (
                <Fragment key={item.id}>
                  {showCategory && (
                    <tr>
                      <td
                        colSpan={8}
                        className="bg-slate-800 text-white font-bold text-sm tracking-wide px-6 py-3.5 uppercase"
                      >
                        {item.category || "Unassigned Category"}
                      </td>
                    </tr>
                  )}

                  <tr className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    {/* Serial */}
                    <td className="p-5 text-center text-slate-400 text-sm">{index + 1}</td>

                    {/* Description */}
                    <td className="p-5">
                      <div className="font-semibold text-slate-900 text-base">
                        {getTitle(item)}
                      </div>
                      <div className="text-xs text-slate-500 mt-1.5 max-w-3xl line-clamp-2">
                        {item.description}
                      </div>
                    </td>

                    {/* Unit */}
                    <td className="text-center text-slate-700 text-sm">{item.unit || "-"}</td>

                    {/* Qty */}
                    <td className="text-center text-slate-700 text-sm">{item.quantity || 0}</td>

                    {/* Rate */}
                    <td className="text-center whitespace-nowrap text-slate-700 text-sm">
                      ₹ {Number(item.rate || 0).toLocaleString()}
                    </td>

                    {/* Amount */}
                    <td className="text-center whitespace-nowrap font-bold text-green-600 text-sm">
                      ₹ {Number(item.amount || 0).toLocaleString()}
                    </td>

                    {/* Costing Indicator */}
                    <td className="text-center">
                      {getCostingStatus(item) ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5" />
                          Not Started
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/project-management/${item.project_id}/boq/${item.id}/edit`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/project-management/${item.project_id}/boq/${item.id}/costing`}
                          className="bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors"
                        >
                          Costing
                        </Link>

                        <DeleteBOQButton id={item.id} />
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={8} className="p-12 text-center text-slate-400 text-sm">
                  No BOQ items match your active search terms.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-t border-slate-200">
        <div className="text-sm text-slate-500">Showing {filteredItems.length} items</div>
        <div className="font-bold text-xl text-green-700">
          Total Value : ₹ {totalAmount.toLocaleString()}
        </div>
      </div>
    </div>
  );
}