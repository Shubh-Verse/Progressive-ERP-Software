"use client";

import { useState } from "react";

import ProjectInformation from "./ProjectInformation";
import BOQInformation from "./BOQInformation";
import ComparisonSummary from "./ComparisonSummary";

import EditBOQForm from "../EditBOQForm";

import BOQReferencePanel from "@/components/reference/BOQReferencePanel";
import ReferenceSearchDialog from "@/components/reference/ReferenceSearchDialog";

import { getReference } from "@/services/reference";
import { ReferenceDetail } from "@/types/dsr";

interface Props {
  item: any;
}

export default function EditBOQWorkspace({
  item,
}: Props) {

  const [reference, setReference] =
    useState<ReferenceDetail | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [showSearch, setShowSearch] =
    useState(false);

  async function handleSelectReference(
    id: number
  ) {

    try {

      setLoading(true);

      const data = await getReference(id);

      setReference(data);

      setShowSearch(false);

    } finally {

      setLoading(false);

    }

  }
  console.log(item);
console.log(item.projects);

  return (

    <div className="space-y-8">

      {/* Project Information */}

      <ProjectInformation
        project={item.projects}
      />

      {/* BOQ + DSR */}

      <div className="grid grid-cols-2 gap-8">

        <BOQInformation
          item={item}
        />

        <BOQReferencePanel
          reference={reference}
          loading={loading}
          onSearch={() => setShowSearch(true)}
        />

      </div>

      {/* Comparison */}

      <ComparisonSummary
        item={item}
        reference={reference}
      />

      {/* Edit Form */}

      <EditBOQForm
        item={item}
      />

      {/* Search Dialog */}

      <ReferenceSearchDialog
        open={showSearch}
        onClose={() => setShowSearch(false)}
        onSelect={handleSelectReference}
      />

    </div>

  );

}