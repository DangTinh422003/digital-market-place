import Image from "next/image";
import React from "react";

interface ProductCardProps {
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
  id: string;
}

const ProductCard = ({
  images,
  id,
  price,
  smallDescription,
  name,
}: ProductCardProps) => {
  return (
    <div className="rounded-lg">
      <div className="relative h-[230px]">
        <Image
          src={images[0]}
          alt=""
          fill
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="flex justify-between items-start mt-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>

      <p className="text-gray-600 line-clamp-2 text-sm mt-2">
        {smallDescription}
      </p>
    </div>
  );
};

export default ProductCard;
