import prisma from "@/utils/db";
import Link from "next/link";
import React from "react";
import ProductCard from "./ProductCard";

async function getNewestProject() {
  const data = await prisma.product.findMany({
    select: {
      price: true,
      description: true,
      smallDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const NewestProject = async () => {
  const data = await getNewestProject();

  return (
    <section className="mt-20">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          Newest Products
        </h2>
        <Link
          href="#"
          className="text-sm hidden text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 lg:grid-cols-4 gap-10">
        {data.map((product) => (
          <ProductCard
            name={product.name}
            smallDescription={product.smallDescription}
            id={product.id}
            price={product.price}
            key={product.id}
            images={product.images}
          />
        ))}
      </div>
    </section>
  );
};

export default NewestProject;
