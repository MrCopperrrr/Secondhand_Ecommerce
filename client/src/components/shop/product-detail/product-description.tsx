// React default import not required with automatic JSX runtime

interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="mt-12 font-roboto">
      <hr className="border-[#C9CFD2] mb-8" />
      <h2 className="text-sm font-bold text-[#686868] mb-4 uppercase">
        Mô tả sản phẩm:
      </h2>
      <div className="text-sm text-[#000000] font-normal leading-relaxed whitespace-pre-wrap">
        {description}
      </div>
    </div>
  );
}
