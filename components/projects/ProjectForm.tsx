interface ProjectFormProps {
    project?: any;
  }
  
  export default function ProjectForm({
    project,
  }: ProjectFormProps) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
  
        <div className="grid grid-cols-2 gap-6">
  
          {/* Project Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Project Name
            </label>
  
            <input
              defaultValue={project?.project_name}
              className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Client Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Client Name
            </label>
  
            <input
              defaultValue={project?.client_name}
              className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Location */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Location
            </label>
  
            <input
              defaultValue={project?.location}
              className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Contract Value */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Contract Value
            </label>
  
            <input
              defaultValue={project?.contract_value}
              type="number"
              className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Start Date */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Start Date
            </label>
  
            <input
              defaultValue={project?.start_date}
              type="date"
              className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* End Date */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              End Date
            </label>
  
            <input
              defaultValue={project?.end_date}
              type="date"
              className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Status */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Status
            </label>
  
            <select
              defaultValue={project?.status}
              className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Active</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>
  
        </div>
  
        {/* Description */}
        <div className="mt-6">
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
  
          <textarea
            defaultValue={project?.description}
            rows={5}
            className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Button */}
        <div className="mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Save Project
          </button>
        </div>
  
      </div>
    );
  }