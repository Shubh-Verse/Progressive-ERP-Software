"use client";

import { useEffect, useState } from "react";

import { searchReference } from "@/services/reference";
import { ReferenceSearchResult } from "@/types/dsr";

import DSRSearchBox from "./search/DSRSearchBox";
import DSRSearchResults from "./search/DSRSearchResults";

interface Props {
  onSelect: (id: number) => void;
}

export default function ReferenceSearch({
  onSelect,
}: Props) {
  const [keyword, setKeyword] = useState("");

  const [results, setResults] = useState<
    ReferenceSearchResult[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      const data = await searchReference(keyword);

      setResults(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <div className="space-y-4">
      <DSRSearchBox
        value={keyword}
        onChange={setKeyword}
      />

      <DSRSearchResults
        results={results}
        onSelect={onSelect}
      />
    </div>
  );
}