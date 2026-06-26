"use client";

import { useEffect, useState } from "react";
import { getReference } from "@/services/reference";
import { ReferenceDetail } from "@/types/dsr";

interface Props {

  id: number | null;

  onClose: () => void;

}

export default function ReferenceDrawer({
  id,
  onClose,
}: Props) {

  const [reference, setReference] =
    useState<ReferenceDetail | null>(null);

  useEffect(() => {

    if (!id) return;

    getReference(id).then(setReference);

  }, [id]);

  if (!id || !reference) return null;

  return (

    <div
      className="
      fixed
      top-0
      right-0
      h-screen
      w-[500px]
      bg-white
      shadow-2xl
      overflow-y-auto
      z-50
      p-6
      "
    >

      <button
        onClick={onClose}
        className="mb-6"
      >
        ✕ Close
      </button>

      <h2 className="text-xl font-bold">

        {reference.master.dsr_code}

      </h2>

      <p className="mt-4">

        {reference.master.description}

      </p>

      <div className="mt-8">

        <h3 className="font-semibold">

          Components

        </h3>

        <table className="w-full mt-4 text-sm">

          <thead>

            <tr>

              <th align="left">Type</th>

              <th align="left">Item</th>

              <th>Qty</th>

              <th>Rate</th>

            </tr>

          </thead>

          <tbody>

            {reference.components.map((c) => (

              <tr key={c.id}>

                <td>{c.component_type}</td>

                <td>{c.component_name}</td>

                <td>{c.qty}</td>

                <td>{c.rate}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}