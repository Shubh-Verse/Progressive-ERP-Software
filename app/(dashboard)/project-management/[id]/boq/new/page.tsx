import CreateBOQForm from "@/components/boq/CreateBOQForm";

export default function NewBOQPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Add BOQ Item
      </h1>

      <CreateBOQForm />

    </div>
  );
}