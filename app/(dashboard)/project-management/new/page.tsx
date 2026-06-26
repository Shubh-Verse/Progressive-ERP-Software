import CreateProjectForm from "@/components/projects/CreateProjectForm";
import toast from "react-hot-toast";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Create Project
      </h1>

      <CreateProjectForm />
    </div>
  );
}