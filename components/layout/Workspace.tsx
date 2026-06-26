"use client";

import { ReactNode } from "react";

interface WorkspaceProps {
  left: ReactNode;
  right: ReactNode;
}

export default function Workspace({
  left,
  right,
}: WorkspaceProps) {
  return (
    <div className="grid grid-cols-12 gap-6 mt-6">

      {/* Main Workspace */}
      <div className="col-span-8">
        <div className="bg-white rounded-2xl border shadow-sm p-6 min-h-[650px]">
          {left}
        </div>
      </div>

      {/* Assistant Panel */}
      <div className="col-span-4">
        <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-6 h-[650px] overflow-y-auto">
          {right}
        </div>
      </div>

    </div>
  );
}