import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="w-full bg-[#F2F4F5] border-b border-gray-100 rounded-none">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.href ? (
                <Link to={item.href} className="text-[#191C1F] hover:text-[#1E40AF] transition-colors text-sm">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#686868] text-sm">{item.label}</span>
              )}
              {index < items.length - 1 && (
                <ChevronRight size={14} className="text-[#686868]" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
