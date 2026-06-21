"use client";

export default function BOQForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-black mb-4">
        Add BOQ Item
      </h2>

      <input
        type="text"
        placeholder="BOQ Code"
        className="border border-gray-300 p-3 w-full mb-3 rounded text-black"
      />

      <input
        type="text"
        placeholder="Description"
        className="border border-gray-300 p-3 w-full mb-3 rounded text-black"
      />

      <input
        type="text"
        placeholder="Unit (Cum, Sqm, Kg)"
        className="border border-gray-300 p-3 w-full mb-3 rounded text-black"
      />

      <input
        type="number"
        placeholder="Rate"
        className="border border-gray-300 p-3 w-full mb-3 rounded text-black"
      />

      <input
        type="number"
        placeholder="BOQ Quantity"
        className="border border-gray-300 p-3 w-full mb-3 rounded text-black"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save BOQ Item
      </button>
    </div>
  );
}