export type State = {
  status: "idle" | "loading" | "success" | "error";
  error?: {
    [key: string]: string[];
  };
  message?: string;
};

export enum SELL_PRODUCT_FORM_FIELDS {
  NAME = "name",
  CATEGORY = "category",
  PRICE = "price",
  SMALL_DESCRIPTION = "smallDescription",
  DESCRIPTION = "description",
  IMAGES = "images",
  PRODUCT_FILES = "productFiles",
}
