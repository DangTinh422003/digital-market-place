"use client";
import { categoryItems } from "@/lib/categoryItems";
import React from "react";
import { Card, CardHeader } from "./ui/card";
import clsx from "clsx";
import { SELL_PRODUCT_FORM_FIELDS } from "@/constants";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <input
        type="hidden"
        name={SELL_PRODUCT_FORM_FIELDS.CATEGORY}
        value={selectedCategory || ""}
      />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={clsx(
              selectedCategory === item.name
                ? "border-2 border-primary"
                : "border-2 border-primary/10"
            )}
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              {item.image} <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
