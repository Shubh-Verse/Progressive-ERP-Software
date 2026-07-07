"use client";

import { useEffect, useState } from "react";

import {
  ChevronLeft,
  FolderOpen,
  FileText,
  X,
} from "lucide-react";

import {
  getDSRCategories,
  getDSRChapters,
} from "@/services/dsrService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (chapter: any) => void;
}

export default function ReferenceSearchDialog({
  open,
  onClose,
  onSelect,
}: Props) {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [chapters, setChapters] =
    useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<any>(null);

  useEffect(() => {

    if (!open) return;

    loadCategories();

  }, [open]);

  async function loadCategories() {

    const data =
      await getDSRCategories();

    setCategories(data);

  }

  async function openCategory(
    category: any
  ) {

    setSelectedCategory(category);

    const data =
      await getDSRChapters(category.id);

    setChapters(data);

  }

  function goBack() {

    setSelectedCategory(null);

    setChapters([]);

  }

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[760px] rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold">

              CPWD DSR Library

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Browse official CPWD DSR chapters.

            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl border p-2 hover:bg-slate-100"
          >

            <X size={20} />

          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          {!selectedCategory && (

            <div className="space-y-5">

              {categories.map((category) => (

                <button
                  key={category.id}
                  onClick={() => openCategory(category)}
                  className="w-full rounded-2xl border p-6 text-left transition hover:border-blue-500 hover:bg-blue-50"
                >

                  <div className="flex items-center gap-4">

                    <FolderOpen
                      className="text-blue-600"
                    />

                    <div>

                      <h3 className="text-lg font-bold">

                        {category.name}

                      </h3>

                      <p className="text-sm text-slate-500">

                        {category.chapter_count} Chapters

                      </p>

                    </div>

                  </div>

                </button>

              ))}

            </div>

          )}

          {selectedCategory && (

            <div>

              <button
                onClick={goBack}
                className="mb-6 flex items-center gap-2 text-blue-600"
              >

                <ChevronLeft size={18} />

                Back

              </button>

              <h3 className="mb-5 text-xl font-bold">

                {selectedCategory.name}

              </h3>

              <div className="max-h-[420px] space-y-2 overflow-y-auto">

                {chapters.map((chapter) => (

                  <button
                    key={chapter.id}
                    onClick={() => {

                      onSelect(chapter);

                    }}
                    className="flex w-full items-center gap-3 rounded-xl border p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                  >

                    <FileText
                      className="text-blue-600"
                    />

                    <div>

                      <p className="font-semibold">

                        {chapter.chapter_no}.{" "}

                        {chapter.chapter_name}

                      </p>

                    </div>

                  </button>

                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}