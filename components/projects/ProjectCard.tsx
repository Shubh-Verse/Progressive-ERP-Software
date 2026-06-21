interface ProjectCardProps {
    title: string;
    value: number;
  }
  
  export default function ProjectCard({
    title,
    value,
  }: ProjectCardProps) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-gray-500">
          {title}
        </h2>
  
        <h1 className="text-4xl font-bold mt-4">
          {value}
        </h1>
      </div>
    );
  }