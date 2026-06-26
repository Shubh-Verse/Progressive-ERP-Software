"use client";

import {
    BadgeIndianRupee,
    Scale,
    Percent,
    CheckCircle2,
    FileSearch,
} from "lucide-react";

import { ReferenceDetail } from "@/types/dsr";

interface Props {
    item: any;
    reference: ReferenceDetail | null;
}

export default function ComparisonSummary({
    item,
    reference,
}: Props) {

    const boqRate = Number(item.rate);

    const dsrRate = Number(
        item?.dsr_master?.rate || 0
    );

    const difference =
        boqRate - dsrRate;

    const variance =
        dsrRate > 0
            ? (
                  (difference / dsrRate) *
                  100
              ).toFixed(2)
            : "0";

    return (

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <div className="mb-8">

                <h2 className="text-2xl font-bold">

                    Comparison Summary

                </h2>

                <p className="text-slate-500">

                    BOQ vs CPWD DSR comparison

                </p>

            </div>

            <div className="grid grid-cols-6 gap-5">

                <SummaryCard
                    title="BOQ Rate"
                    value={`₹ ${boqRate.toLocaleString()}`}
                    icon={<BadgeIndianRupee size={18} />}
                />

                <SummaryCard
                    title="DSR Rate"
                    value={`₹ ${dsrRate.toLocaleString()}`}
                    icon={<BadgeIndianRupee size={18} />}
                />

                <SummaryCard
                    title="Difference"
                    value={`₹ ${difference.toLocaleString()}`}
                    color={
                        difference > 0
                            ? "text-red-600"
                            : "text-green-600"
                    }
                    icon={<Scale size={18} />}
                />

                <SummaryCard
                    title="Variance"
                    value={`${variance}%`}
                    color={
                        difference > 0
                            ? "text-red-600"
                            : "text-green-600"
                    }
                    icon={<Percent size={18} />}
                />

                <SummaryCard
                    title="Unit Match"
                    value={
                        item.unit ===
                        item?.dsr_master?.unit
                            ? "Match"
                            : "Mismatch"
                    }
                    color="text-green-600"
                    icon={<CheckCircle2 size={18} />}
                />

                <SummaryCard
                    title="Description"
                    value="Pending"
                    icon={<FileSearch size={18} />}
                />

            </div>

        </div>

    );

}

function SummaryCard({
    title,
    value,
    icon,
    color,
}: any) {

    return (

        <div className="rounded-2xl border p-5">

            <div className="flex items-center gap-2 text-slate-500 text-sm">

                {icon}

                {title}

            </div>

            <div className={`mt-3 text-xl font-bold ${color || ""}`}>

                {value}

            </div>

        </div>

    );

}