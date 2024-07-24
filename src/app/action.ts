"use server";
import { SELL_PRODUCT_FORM_FIELDS, State } from "@/constants";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoryTypes } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be atleast 3 characters long",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  price: z.number().min(1, {
    message: "Price must be at least 1",
  }),
  smallDescription: z.string().min(10, {
    message: "Please sumary your product more",
  }),
  description: z.string().min(1, {
    message: "Please describe your product",
  }),
  images: z.array(z.string(), {
    message: "Please upload some images",
  }),
  productFiles: z.string({
    message: "Please upload product images",
  }),
});

export async function sellProduct(prevState: any, form: FormData) {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) {
    return {
      status: "error",
      message: "Please login to create a product",
    } as State;
  }

  const validateFields = productSchema.safeParse({
    name: form.get(SELL_PRODUCT_FORM_FIELDS.NAME),
    category: form.get(SELL_PRODUCT_FORM_FIELDS.CATEGORY),
    price: Number(form.get(SELL_PRODUCT_FORM_FIELDS.PRICE)),
    smallDescription: form.get(SELL_PRODUCT_FORM_FIELDS.SMALL_DESCRIPTION),
    description: form.get(SELL_PRODUCT_FORM_FIELDS.DESCRIPTION),
    images: JSON.parse(
      form.getAll(SELL_PRODUCT_FORM_FIELDS.IMAGES) as unknown as string
    ) as string[],
    productFiles: form.get(SELL_PRODUCT_FORM_FIELDS.PRODUCT_FILES),
  });

  console.log({ dlkasldas: form.getAll(SELL_PRODUCT_FORM_FIELDS.IMAGES) });
  if (!validateFields.success) {
    return {
      status: "error",
      error: validateFields.error.flatten().fieldErrors,
      message: "Oops! Something went wrong",
    } as State;
  }

  try {
    await prisma.product.create({
      data: {
        name: validateFields.data.name,
        category: validateFields.data.category as CategoryTypes,
        price: Number(form.get(SELL_PRODUCT_FORM_FIELDS.PRICE)),
        description: JSON.parse(
          (form.get(SELL_PRODUCT_FORM_FIELDS.DESCRIPTION) as string) || ""
        ),
        smallDescription:
          (form.get(SELL_PRODUCT_FORM_FIELDS.SMALL_DESCRIPTION) as string) ||
          "",
        images: JSON.parse(
          form.getAll(SELL_PRODUCT_FORM_FIELDS.IMAGES) as unknown as string
        ) as string[],
        productFile: form.get(SELL_PRODUCT_FORM_FIELDS.PRODUCT_FILES) as string,
      },
    });
  } catch (error) {
    return {
      status: "error",
      message: "Oops! Something went wrong",
      error,
    } as State;
  }

  return {
    status: "success",
    message: "Product created successfully",
  } as State;
}
