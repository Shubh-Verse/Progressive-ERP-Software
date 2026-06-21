export default function ProjectForm() {
    return (
      <div className="bg-white rounded-2xl shadow p-8">
  
        <div className="grid grid-cols-2 gap-6">
  
          <div>
            <label>Project Name</label>
  
            <input
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>
  
          <div>
            <label>Client Name</label>
  
            <input
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>
  
          <div>
            <label>Location</label>
  
            <input
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>
  
          <div>
            <label>Status</label>
  
            <select className="w-full border rounded-xl p-3 mt-2">
              <option>Running</option>
              <option>Completed</option>
            </select>
          </div>
  
        </div>
  
      </div>
    );
  }