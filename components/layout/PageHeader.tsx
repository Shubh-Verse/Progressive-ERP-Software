"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-6">

      {/* Breadcrumb */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">

          {breadcrumbs.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}

              {index < breadcrumbs.length - 1 && (
                <ChevronRight size={16} />
              )}
            </div>
          ))}

        </nav>
      )}

      {/* Title */}

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-gray-500">
              {subtitle}
            </p>
          )}

        </div>

        {actions && (
          <div>
            {actions}
          </div>
        )}

      </div>

    </div>
  );
}