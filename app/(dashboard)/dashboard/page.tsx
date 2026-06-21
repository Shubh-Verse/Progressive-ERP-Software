import {
    FolderKanban,
    ClipboardList,
    FileText,
    Package,
  } from "lucide-react";
  
  export default function DashboardPage() {
    const cards = [
      {
        title: "Projects",
        value: 1,
        icon: FolderKanban,
      },
      {
        title: "BOQ Items",
        value: 0,
        icon: ClipboardList,
      },
      {
        title: "RA Bills",
        value: 0,
        icon: FileText,
      },
      {
        title: "Materials",
        value: 0,
        icon: Package,
      },
    ];
  
    return (
      <>
        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>
  
        <div className="grid grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
  
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-500">
                      {card.title}
                    </h2>
  
                    <h1 className="text-4xl font-bold mt-3">
                      {card.value}
                    </h1>
                  </div>
  
                  <Icon size={40} className="text-blue-600" />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }