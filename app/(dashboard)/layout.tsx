import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
          },
        }}
      />

      <div className="flex bg-slate-100">
        <Sidebar />

        <div className="flex-1 min-h-screen flex flex-col">
          <Header />

          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}