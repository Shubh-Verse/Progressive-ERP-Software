"use client";

import CreateBOQButton from "../CreateBOQButton";

export default function BOQToolbar() {

  return (

    <div className="rounded-2xl border bg-white p-5 flex justify-between">

      <div>

        <h1 className="text-2xl font-bold">

          BOQ

        </h1>

      </div>

      <CreateBOQButton />

    </div>

  );

}