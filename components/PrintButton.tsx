"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
    >
      Print Bill
    </button>
  );
}