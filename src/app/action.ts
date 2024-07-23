"use server";
import { SELL_PRODUCT_FORM_FIELDS, State } from "@/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
  files: z.array(z.string(), {
    message: "Please upload some files",
  }),
  images: z.array(z.string(), {
    message: "Please upload some images",
  }),
  productFiles: z.array(z.string(), {
    message: "Please upload product zip files",
  }),
});

export async function sellProduct(prevState: any, form: FormData) {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }
  const validateFields = productSchema.safeParse({
    name: form.get(SELL_PRODUCT_FORM_FIELDS.NAME),
    category: form.get(SELL_PRODUCT_FORM_FIELDS.CATEGORY),
    price: Number(form.get(SELL_PRODUCT_FORM_FIELDS.PRICE)),
    smallDescription: form.get(SELL_PRODUCT_FORM_FIELDS.SMALL_DESCRIPTION),
    description: form.get(SELL_PRODUCT_FORM_FIELDS.DESCRIPTION),
  });
  if (!validateFields.success) {
    return {
      status: "error",
      error: validateFields.error.flatten().fieldErrors,
      message: "Oops! Something went wrong",
    } as State;
  }

  return {
    status: "success",
    message: "Product created successfully",
  } as State;
}
