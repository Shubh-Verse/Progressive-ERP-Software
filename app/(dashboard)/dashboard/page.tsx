import {
    FolderKanban,
    ClipboardList,
    FileText,
    Package,
  } from "lucide-react";
  
  import { getDashboardStats } from "@/services/dashboardService";
  
  export default async function DashboardPage() {
    // Fetch dashboard metrics asynchronously from your service layer
    const stats = await getDashboardStats();
  
    const cards = [
      {
        title: "Projects",
        value: stats?.projects ?? 0,
        icon: FolderKanban,
      },
      {
        title: "BOQ Items",
        value: stats?.boqItems ?? 0,
        icon: ClipboardList,
      },
      {
        title: "RA Bills",
        value: stats?.raBills ?? 0,
        icon: FileText,
      },
      {
        title: "Materials",
        value: stats?.materials ?? 0,
        icon: Package,
      },
    ];
  
    return (
      <>
        <h1 className="text-3xl font-bold mb-8 text-slate-900">
          Dashboard
        </h1>
  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
  
            return (
              <div
                key={card.title}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-slate-500 font-medium text-sm">
                      {card.title}
                    </h2>
  
                    <h1 className="text-4xl font-bold mt-3 text-slate-900">
                      {card.value}
                    </h1>
                  </div>
  
                  <Icon size={40} className="text-blue-600 bg-blue-50 p-2 rounded-2xl" />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }