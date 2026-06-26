"use client";

import ProjectInformation from "./ProjectInformation";
import BOQInformation from "./BOQInformation";
import ComparisonSummary from "./ComparisonSummary";

import BOQReferencePanel from "@/components/reference/BOQReferencePanel";
import EditBOQForm from "../EditBOQForm";

interface Props {
    item: any;
}

export default function EditBOQWorkspace({
    item,
}: Props) {

    return (

        <div className="space-y-8">

            {/* Project */}

            <ProjectInformation
                project={item.projects}
            />

            {/* BOQ + DSR */}

            <div className="grid grid-cols-2 gap-8">

                <BOQInformation
                    item={item}
                />

                <BOQReferencePanel
                    item={item}
                />

            </div>

            {/* Comparison */}

            <ComparisonSummary
                item={item}
            />

            {/* Edit */}

            <EditBOQForm
                item={item}
            />

        </div>

    );

}