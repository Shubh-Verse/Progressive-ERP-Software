"use client";

import { useState } from "react";
import Link from "next/link";
import BOQToolbar from "./BOQToolbar";
import EmptyBOQ from "./EmptyBOQ";

interface Props {
  items: any[];
}

/* =========================================================
   SHARED GRID
   S.No. | Description | Unit | Qty | Rate | Amount | Action
========================================================= */

const GRID_LAYOUT =
  "grid grid-cols-[60px_minmax(600px,1fr)_80px_90px_110px_130px_70px] gap-4 px-5";

/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(value: any) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString("en-IN", {
    maximumFractionDigits: 3,
  });
}

/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(value: any) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return `₹ ${number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

/* =========================================================
   CLEAN TEXT
========================================================= */

function cleanText(value: any) {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value).trim();
}

/* =========================================================
   NORMALIZE NUMBER
========================================================= */

function getNumber(
  value: any
): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

/* =========================================================
   CHECK COMMERCIAL DATA
   Zero alone does not make a row commercial.
========================================================= */

function hasCommercialData(item: any) {
  const unit = cleanText(item.unit);

  const quantity = getNumber(
    item.quantity
  );

  const rate = getNumber(
    item.rate
  );

  const amount = getNumber(
    item.amount
  );

  return (
    unit !== "" ||
    (quantity !== null &&
      quantity !== 0) ||
    (rate !== null &&
      rate !== 0) ||
    (amount !== null &&
      amount !== 0)
  );
}

/* =========================================================
   DETECT GROUP-LIKE ROW

   Handles imported rows such as:

   1.0  33 KV HT PANELS
   2.0  33 KV HT CABLE
   3.0  TRANSFORMER
   4.0  BUS DUCT
   5.0  LT PANELS

   even if old database data has the wrong row_type.
========================================================= */

function isGroupLikeRow(
  item: any,
  commercial: boolean
) {
  if (commercial) {
    return false;
  }

  const serial = cleanText(
    item.serial_no
  );

  const description = cleanText(
    item.description
  );

  if (!description) {
    return false;
  }

  return /^\d+\.0$/.test(serial);
}

/* =========================================================
   COMMERCIAL ITEM ROW
========================================================= */

function BOQItemRow({
  item,
}: {
  item: any;
}) {
  const [isExpanded, setIsExpanded] =
    useState(false);

  const description =
    cleanText(item.description);

  const isLongDescription =
    description.length > 180;

  return (
    <div
      className={`
        group/item
        ${GRID_LAYOUT}
        items-start
        border-b
        border-slate-200
        bg-white
        py-3.5
        transition-colors
        duration-150
        hover:bg-blue-50/30
      `}
    >
      {/* Serial */}

      <div className="pt-0.5 font-mono text-[11px] font-semibold text-slate-500">
        {item.serial_no || ""}
      </div>

      {/* Description */}

      <div className="min-w-0 pr-3">
        <p
          className={`
            text-[12.5px]
            font-medium
            leading-5
            text-slate-800
            ${
              !isExpanded &&
              isLongDescription
                ? "line-clamp-2"
                : ""
            }
          `}
        >
          {description}
        </p>

        {isLongDescription && (
          <button
            type="button"
            onClick={() =>
              setIsExpanded(
                (current) => !current
              )
            }
            className="
              mt-1
              text-[10.5px]
              font-semibold
              text-blue-600
              transition-colors
              hover:text-blue-800
            "
          >
            {isExpanded
              ? "Show less"
              : "View full description"}
          </button>
        )}
      </div>

      {/* Unit */}

      <div className="pt-0.5 text-center">
        {item.unit ? (
          <span
            className="
              inline-flex
              min-w-8
              items-center
              justify-center
              rounded-md
              bg-slate-100
              px-2
              py-1
              text-[10px]
              font-semibold
              text-slate-600
            "
          >
            {item.unit}
          </span>
        ) : (
          <span className="text-xs text-slate-300">
            —
          </span>
        )}
      </div>

      {/* Quantity */}

      <div className="pt-1 text-right font-mono text-xs font-bold tabular-nums text-slate-800">
        {formatNumber(
          item.quantity
        )}
      </div>

      {/* Rate */}

      <div className="pt-1 text-right font-mono text-xs tabular-nums text-slate-500">
        {formatMoney(
          item.rate
        )}
      </div>

      {/* Amount */}

      <div className="pt-1 text-right font-mono text-xs font-bold tabular-nums text-slate-900">
        {formatMoney(
          item.amount
        )}
      </div>

      {/* Action */}

      <div className="flex justify-center pt-0.5">
        <Link
          href={`/project-management/${item.project_id}/boq/${item.id}/edit`}
          className="
            inline-flex
            h-[26px]
            items-center
            justify-center
            rounded-md
            border
            border-slate-200
            bg-white
            px-2.5
            text-[10.5px]
            font-semibold
            text-slate-500
            opacity-60
            shadow-sm
            transition-all
            duration-150
            hover:border-blue-600
            hover:bg-blue-600
            hover:text-white
            hover:opacity-100
            group-hover/item:opacity-100
          "
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   INSTRUCTION / COMMENT ROW

   No badge.
   No "NOTE" text.
   No card.

   Distinguished only through:
   - subtle background
   - lighter typography
   - slightly smaller text
========================================================= */

function BOQInstructionRow({
  item,
}: {
  item: any;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[60px_minmax(0,1fr)]
        gap-4
        border-b
        border-slate-100
        bg-slate-50/50
        px-5
        py-2.5
      "
    >
      {/* Serial */}

      <div className="pt-px font-mono text-[10.5px] font-medium text-slate-400">
        {item.serial_no || ""}
      </div>

      {/* Description */}

      <p
        className="
          max-w-6xl
          text-[11.5px]
          font-normal
          italic
          leading-5
          text-slate-500
        "
      >
        {item.description}
      </p>
    </div>
  );
}

/* =========================================================
   BOQ VIEWER
========================================================= */

export default function BOQViewer({
  items,
}: Props) {
  if (
    !items ||
    items.length === 0
  ) {
    return <EmptyBOQ />;
  }

  /* ---------------------------------------------------------
     PRESERVE ORIGINAL EXCEL ORDER
  --------------------------------------------------------- */

  const orderedItems = [
    ...items,
  ].sort(
    (a, b) =>
      Number(a.sort_order || 0) -
      Number(b.sort_order || 0)
  );

  /* ---------------------------------------------------------
     FIND FIRST REAL GROUP

     Includes old imported group-like rows.
  --------------------------------------------------------- */

  const firstGroupIndex =
    orderedItems.findIndex(
      (item) => {
        const commercial =
          hasCommercialData(item);

        return (
          item.row_type ===
            "group" ||
          isGroupLikeRow(
            item,
            commercial
          )
        );
      }
    );

  return (
    <div className="w-full space-y-5">
      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <BOQToolbar />

      {/* =====================================================
          BOQ DOCUMENT
      ===================================================== */}

      <div
        className="
          w-full
          overflow-x-auto
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div className="min-w-[1180px]">
          {orderedItems.map(
            (item, index) => {
              const rowType =
                item.row_type ||
                "item";

              const commercial =
                hasCommercialData(
                  item
                );

              const groupLike =
                rowType ===
                  "group" ||
                isGroupLikeRow(
                  item,
                  commercial
                );

              const isInstruction =
                !groupLike &&
                (rowType ===
                  "instruction" ||
                  rowType ===
                    "note" ||
                  (rowType ===
                    "item" &&
                    !commercial));

              const showColumnHeader =
                firstGroupIndex !==
                  -1 &&
                index ===
                  firstGroupIndex;

              return (
                <div
                  key={item.id}
                >
                  {/* =========================================
                      COMMERCIAL COLUMN HEADER
                  ========================================= */}

                  {showColumnHeader && (
                    <div
                      className={`
                        ${GRID_LAYOUT}
                        sticky
                        top-0
                        z-20
                        items-center
                        border-y
                        border-slate-200
                        bg-slate-50/95
                        py-2.5
                        text-[9.5px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-slate-500
                        backdrop-blur-md
                      `}
                    >
                      <div>
                        S.No.
                      </div>

                      <div>
                        Description
                      </div>

                      <div className="text-center">
                        Unit
                      </div>

                      <div className="text-right">
                        Qty
                      </div>

                      <div className="text-right">
                        Rate
                      </div>

                      <div className="text-right">
                        Amount
                      </div>

                      <div className="text-center">
                        Action
                      </div>
                    </div>
                  )}

                  {/* =========================================
                      DOCUMENT TITLE
                  ========================================= */}

{rowType === "document_title" && (
  <div
    className="
      border-b
      border-slate-100
      bg-white
      px-6
      py-3
      text-center
    "
  >
    <h1
      className="
        mx-auto
        max-w-6xl
        text-[13px]
        font-bold
        leading-5
        text-slate-900
      "
    >
      {item.description}
    </h1>
  </div>
)}

                  {/* =========================================
                      MAIN SECTION
                  ========================================= */}

                  {rowType ===
                    "section" && (
                    <div
                      className="
                        grid
                        grid-cols-[60px_minmax(0,1fr)]
                        items-center
                        gap-4
                        border-b
                        border-slate-900
                        bg-slate-900
                        px-5
                        py-3.5
                        text-white
                      "
                    >
                      <div className="font-mono text-xs font-bold text-slate-300">
                        {item.serial_no ||
                          ""}
                      </div>

                      <h2
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-[0.06em]
                        "
                      >
                        {
                          item.description
                        }
                      </h2>
                    </div>
                  )}

                  {/* =========================================
                      INSTRUCTION / COMMENT
                  ========================================= */}

                  {isInstruction && (
                    <BOQInstructionRow
                      item={item}
                    />
                  )}

                  {/* =========================================
                      GROUP HEADING

                      Also catches:
                      3.0 TRANSFORMER
                      4.0 BUS DUCT
                      5.0 LT PANELS
                  ========================================= */}

                  {groupLike && (
                    <div
                      className={`
                        ${GRID_LAYOUT}
                        items-center
                        border-b
                        border-blue-100
                        bg-blue-50
                        py-3
                      `}
                    >
                      <div className="font-mono text-xs font-bold text-blue-800">
                        {item.serial_no ||
                          ""}
                      </div>

                      <div className="col-span-6 text-xs font-bold uppercase tracking-[0.04em] text-blue-950">
                        {
                          item.description
                        }
                      </div>
                    </div>
                  )}

                  {/* =========================================
                      SUBGROUP
                  ========================================= */}

                  {rowType ===
                    "subgroup" &&
                    !groupLike && (
                    <div
                      className={`
                        ${GRID_LAYOUT}
                        items-center
                        border-b
                        border-slate-200
                        bg-slate-100/70
                        py-2.5
                      `}
                    >
                      <div className="font-mono text-xs font-semibold text-slate-500">
                        {item.serial_no ||
                          ""}
                      </div>

                      <div className="col-span-6 text-xs font-bold tracking-wide text-slate-700">
                        {
                          item.description
                        }
                      </div>
                    </div>
                  )}

                  {/* =========================================
                      COMMERCIAL ITEM

                      Prevent group-like rows from rendering
                      again as normal items.
                  ========================================= */}

                  {rowType ===
                    "item" &&
                    commercial &&
                    !groupLike && (
                    <BOQItemRow
                      item={item}
                    />
                  )}

                  {/* =========================================
                      SUBTOTAL / TAX
                  ========================================= */}

                  {(rowType ===
                    "subtotal" ||
                    rowType ===
                      "tax") && (
                    <div
                      className={`
                        ${GRID_LAYOUT}
                        items-center
                        border-b
                        border-amber-200
                        bg-amber-50
                        py-3.5
                      `}
                    >
                      <div className="font-mono text-xs font-bold text-amber-800">
                        {item.serial_no ||
                          ""}
                      </div>

                      <div className="text-xs font-bold uppercase tracking-wide text-slate-800">
                        {
                          item.description
                        }
                      </div>

                      <div />
                      <div />
                      <div />

                      <div className="text-right font-mono text-sm font-bold tabular-nums text-amber-900">
                        {formatMoney(
                          item.amount
                        )}
                      </div>

                      <div />
                    </div>
                  )}

                  {/* =========================================
                      GRAND TOTAL
                  ========================================= */}

                  {rowType ===
                    "grand_total" && (
                    <div
                      className={`
                        ${GRID_LAYOUT}
                        items-center
                        bg-slate-950
                        py-4
                        text-white
                      `}
                    >
                      <div className="font-mono text-sm font-bold text-slate-400">
                        {item.serial_no ||
                          ""}
                      </div>

                      <div className="text-xs font-black uppercase tracking-widest text-white">
                        {
                          item.description
                        }
                      </div>

                      <div />
                      <div />
                      <div />

                      <div className="text-right font-mono text-base font-black tabular-nums">
                        {formatMoney(
                          item.amount
                        )}
                      </div>

                      <div />
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}