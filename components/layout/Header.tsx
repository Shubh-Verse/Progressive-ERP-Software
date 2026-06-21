"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Progressive Shelters ERP
        </h1>

        <p className="text-sm text-gray-500">
          Construction Management System
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 w-80">
          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        {/* Notifications */}
        <Bell className="text-gray-600 cursor-pointer" />

        {/* User */}
        <div className="flex items-center gap-2">
          <UserCircle2 size={36} />

          <div>
            <h2 className="font-semibold text-sm">
              Admin
            </h2>

            <p className="text-xs text-gray-500">
              Director
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}