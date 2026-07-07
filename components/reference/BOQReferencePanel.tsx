"use client";

import {
  Search,
  BookOpen,
  FolderOpen,
  FileText,
  ExternalLink,
} from "lucide-react";

import { getPDFUrl } from "@/services/pdfService";

interface Props {
  chapter: any;
  onSearch: () => void;
}

export default function BOQReferencePanel({
  chapter,
  onSearch,
}: Props) {
  const pdfUrl = chapter ? getPDFUrl(chapter.pdf_path) : "";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">
            <BookOpen
              className="text-blue-600"
              size={22}
            />
          </div>

          <div>

            <h2 className="text-lg font-bold">
              CPWD DSR Reference
            </h2>

            <p className="text-sm text-slate-500">
              Browse CPWD DSR chapters and view the official PDF.
            </p>

          </div>

        </div>

        <button
          onClick={onSearch}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Search size={16} />
          Search DSR
        </button>

      </div>

      {/* Empty State */}

      {!chapter && (

        <div className="flex flex-col items-center justify-center py-24">

          <div className="rounded-full bg-slate-100 p-5">

            <FolderOpen
              className="text-slate-500"
              size={34}
            />

          </div>

          <h3 className="mt-5 text-lg font-bold">
            No Chapter Selected
          </h3>

          <p className="mt-2 max-w-sm text-center text-sm text-slate-500">

            Click the{" "}
            <span className="font-semibold text-blue-600">
              Search DSR
            </span>{" "}
            button to browse Civil Work or Electrical &
            Mechanical chapters.

          </p>

        </div>

      )}

      {/* Selected Chapter */}

      {chapter && (

        <div className="space-y-6 p-6">

          {/* Chapter Card */}

          <div className="rounded-xl border bg-slate-50 p-5">

            <div className="text-xs uppercase tracking-wider text-slate-400">
              Selected Chapter
            </div>

            <div className="mt-3 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <FileText
                  className="text-blue-600"
                  size={22}
                />

                <div>

                  <p className="text-xl font-bold">
                    {chapter.chapter_name}
                  </p>

                  <p className="text-sm text-slate-500">
                    Chapter {chapter.chapter_no}
                  </p>

                </div>

              </div>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-blue-600
                  transition
                  hover:bg-blue-50
                "
              >
                <ExternalLink size={16} />
                Open
              </a>

            </div>

          </div>

          {/* PDF Viewer */}

          <div className="overflow-hidden rounded-xl border bg-white">

            <iframe
              src={pdfUrl}
              title={chapter.chapter_name}
              className="h-[750px] w-full"
            />

          </div>

        </div>

      )}

    </div>
  );
}