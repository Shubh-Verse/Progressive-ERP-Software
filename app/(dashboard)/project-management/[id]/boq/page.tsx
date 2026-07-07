import BOQViewer from "@/components/boq/viewer/BOQViewer";
import { getBOQItems } from "@/services/boqService";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export default async function BOQPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  noStore();

  const projectId = Number(id);

  const items =
    (await getBOQItems(projectId)) || [];

    return (
      <div className="space-y-6">
        <BOQViewer items={items} />
      </div>
    );
}