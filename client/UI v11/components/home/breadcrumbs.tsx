'use client';

import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 px-4 py-3 bg-white border-b border-[#C9CFD2]">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <a
                href={item.href}
                className="text-[#686868] hover:text-[#191C1F] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-[#686868]">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRight size={16} className="text-[#686868]" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
