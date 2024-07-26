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

export enum UPDATE_USER_SETTINGS_FORM_FIELDS {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
}
