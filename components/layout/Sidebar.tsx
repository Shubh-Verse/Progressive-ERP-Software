"use client";
import { FolderKanban } from "lucide-react";

import {
  LayoutDashboard,
  ClipboardList,
  Receipt,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  Wrench,
  BarChart3,
  Settings,
  Ruler,
} from "lucide-react";

import MenuItem from "./MenuItem";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/project-management",
    icon: FolderKanban,
  },
  {
    title: "Materials",
    href: "/materials",
    icon: Package,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Warehouse,
  },
  {
    title: "Purchase",
    href: "/purchase",
    icon: ShoppingCart,
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: Users,
  },
  {
    title: "Equipments",
    href: "/equipments",
    icon: Wrench,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-950 min-h-screen p-5 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          Progressive ERP
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Construction Management
        </p>
      </div>

      <div className="space-y-2">
        {menus.map((menu) => (
          <MenuItem
            key={menu.title}
            href={menu.href}
            icon={menu.icon}
            title={menu.title}
          />
        ))}
      </div>
    </div>
  );
}