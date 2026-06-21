import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-100">

      <Sidebar />

      <div className="flex-1 min-h-screen flex flex-col">

        <Header />

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}