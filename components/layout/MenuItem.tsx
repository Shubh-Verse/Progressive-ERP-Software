"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
}

export default function MenuItem({
  href,
  icon: Icon,
  title,
}: MenuItemProps) {
  const pathname = usePathname();

  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        active
          ? "bg-blue-600 text-white shadow-lg"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      <Icon size={18} />
      <span>{title}</span>
    </Link>
  );
}