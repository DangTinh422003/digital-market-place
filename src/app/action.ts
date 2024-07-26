"use server";
import {
  SELL_PRODUCT_FORM_FIELDS,
  State,
  UPDATE_USER_SETTINGS_FORM_FIELDS,
} from "@/constants";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoryTypes } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  price: z.number().min(1, {
    message: "Price must be at least 1",
  }),
  smallDescription: z.string().min(10, {
    message: "Please summary your product more",
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

const userSettingsSchema = z.object({
  firstName: z.string().min(3, {
    message: "First name must be at least 3 characters long",
  }),
  lastName: z.string().min(3, {
    message: "Last name must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Please provide a valid email",
  }),
});

export async function sellProduct(prevState: any, form: FormData) {
  const { getUser } = getKindeServerSession();
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

export async function updateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get(UPDATE_USER_SETTINGS_FORM_FIELDS.FIRST_NAME),
    lastName: formData.get(UPDATE_USER_SETTINGS_FORM_FIELDS.LAST_NAME),
    email: formData.get(UPDATE_USER_SETTINGS_FORM_FIELDS.EMAIL),
  });

  if (!validateFields.success) {
    return {
      status: "error",
      error: validateFields.error.flatten().fieldErrors,
      message: "Oops! Something went wrong",
    } as State;
  }

  try {
    const data = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: validateFields.data.firstName,
        lastName: validateFields.data.lastName,
        email: validateFields.data.email,
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
    message: "User updated successfully",
  } as State;
}
