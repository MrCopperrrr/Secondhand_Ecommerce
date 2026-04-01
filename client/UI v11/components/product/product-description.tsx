'use client';

interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="border border-[#C9CFD2] rounded-lg p-6 bg-white mt-8">
      <h2 className="text-xl font-bold text-[#191C1F] mb-4">
        Mô tả sản phẩm
      </h2>
      <p className="text-base text-[#686868] leading-relaxed whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
}
