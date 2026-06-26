import CostingForm from "./CostingForm";

export default async function CostingPage({
  params,
}: {
  params: Promise<{
    id: string;
    boqId: string;
  }>;
}) {

  const { id, boqId } = await params;

  return (

    <div>

      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Cost Components
      </h1>

      <CostingForm
        boqItemId={Number(boqId)}
        projectId={Number(id)}
      />

    </div>

  );
}