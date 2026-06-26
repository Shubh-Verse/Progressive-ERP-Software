import PageHeader from "@/components/layout/PageHeader";
import { getBOQItemById } from "@/services/boqService";
import EditBOQWorkspace from "@/components/boq/edit/EditBOQWorkspace";

export default async function EditBOQPage({
  params,
}: {
  params: Promise<{
    id: string;
    boqId: string;
  }>;
}) {

  const { id, boqId } = await params;

  const item = await getBOQItemById(
    Number(boqId)
  );

  return (
    <div className="space-y-6">

      <PageHeader
        title="Edit BOQ Item"
        subtitle="Update the selected BOQ item"
        breadcrumbs={[
          {
            label: "Projects",
            href: "/project-management",
          },
          {
            label: `Project ${id}`,
            href: `/project-management/${id}`,
          },
          {
            label: "BOQ",
            href: `/project-management/${id}/boq`,
          },
          {
            label: "Edit",
          },
        ]}
      />

<EditBOQWorkspace item={item} />
    </div>
  );
}