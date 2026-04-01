import React from 'react';

interface ProductTitleProps {
  title: string;
}

export function ProductTitle({ title }: ProductTitleProps) {
  return (
    <h1 className="text-3xl font-normal text-[#000000] leading-tight mb-4">
      {title}
    </h1>
  );
}
