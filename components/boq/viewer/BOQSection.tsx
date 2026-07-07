"use client";

import BOQItemCard from "./BOQItemCard";

interface Props {
  title: string;
  items: any[];
}

export default function BOQSection({
  title,
  items,
}: Props) {

  return (

    <div className="rounded-2xl border bg-white overflow-hidden">

      <div className="bg-slate-900 text-white px-6 py-4">

        <h2 className="font-bold uppercase">

          {title}

        </h2>

      </div>

      <div>

        {items.map((item) => (

          <BOQItemCard
            key={item.id}
            item={item}
          />

        ))}

      </div>

    </div>

  );

}