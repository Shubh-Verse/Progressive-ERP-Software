import BOQUploadForm from "@/components/boq/BOQUploadForm";

export default async function UploadBOQPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Upload BOQ
        </h1>

        <p className="text-slate-500 mt-2">
          Import client's BOQ Excel sheet
        </p>

      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10">

        <BOQUploadForm projectId={Number(id)} />

      </div>

    </div>

  );
}