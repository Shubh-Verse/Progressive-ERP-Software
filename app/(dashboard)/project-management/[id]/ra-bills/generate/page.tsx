import CreateBillButton from "@/components/CreateBillButton";

export default async function GenerateBillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-black mb-6">
        Generate RA Bill
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-black text-lg mb-4">
          Create New Bill
        </p>

        <CreateBillButton
          projectId={Number(id)}
        />
      </div>
    </div>
  );
}