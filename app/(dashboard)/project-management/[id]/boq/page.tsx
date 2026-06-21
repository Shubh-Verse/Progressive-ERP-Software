import BOQUpload from "@/components/BOQUpload";

export default async function BOQPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-black mb-6">
        BOQ Management
      </h1>

      <BOQUpload projectId={id} />
    </div>
  );
}