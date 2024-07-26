"use client";
import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import SelectCategory from "./SelectCategory";
import { Textarea } from "./ui/textarea";
import TipTapEditor from "./TipTapEditor";
import { UploadDropzone } from "@/utils/uploadthing";
import { Button } from "./ui/button";
import { sellProduct } from "@/app/action";
import { useFormState, useFormStatus } from "react-dom";
import { SELL_PRODUCT_FORM_FIELDS, State } from "@/constants";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Label } from "./ui/label";

const SellRoute = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [productFile, setProductFile] = React.useState<string>("");

  const initFormState = useMemo<State>(() => {
    return {
      status: "idle",
      error: {},
      message: "",
    };
  }, []);

  const [state, formAction] = useFormState(sellProduct, initFormState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your products with ease</CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-1">
              <Label>Name</Label>
              <Input
                name={SELL_PRODUCT_FORM_FIELDS.NAME}
                type="text"
                placeholder="Name of your product"
              />
              {state?.error?.[SELL_PRODUCT_FORM_FIELDS.NAME]?.[0] && (
                <p className="text-destructive">
                  {state?.error?.[SELL_PRODUCT_FORM_FIELDS.NAME]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Category</Label>
              <SelectCategory />
              {state?.error?.[SELL_PRODUCT_FORM_FIELDS.CATEGORY]?.[0] && (
                <p className="text-destructive">
                  {state?.error?.[SELL_PRODUCT_FORM_FIELDS.CATEGORY]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Price</Label>
              <Input
                name={SELL_PRODUCT_FORM_FIELDS.PRICE}
                type="number"
                placeholder="295$"
              />
              {state?.error?.[SELL_PRODUCT_FORM_FIELDS.PRICE]?.[0] && (
                <p className="text-destructive">
                  {state?.error?.[SELL_PRODUCT_FORM_FIELDS.PRICE]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Small Sumary</Label>
              <Textarea
                name={SELL_PRODUCT_FORM_FIELDS.SMALL_DESCRIPTION}
                placeholder="Please describe your product shortly right here..."
              />
              {state?.error?.[
                SELL_PRODUCT_FORM_FIELDS.SMALL_DESCRIPTION
              ]?.[0] && (
                <p className="text-destructive">
                  {
                    state?.error?.[
                      SELL_PRODUCT_FORM_FIELDS.SMALL_DESCRIPTION
                    ]?.[0]
                  }
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Description</Label>
              <TipTapEditor />
              {state?.error?.[SELL_PRODUCT_FORM_FIELDS.DESCRIPTION]?.[0] && (
                <p className="text-destructive">
                  {state?.error?.[SELL_PRODUCT_FORM_FIELDS.DESCRIPTION]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <input
                type="hidden"
                name={SELL_PRODUCT_FORM_FIELDS.IMAGES}
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(data) => {
                  setImages(data.map((d) => d.url));
                  toast.success("Image uploaded successfully");
                }}
                onUploadError={(err) => {
                  toast.error("Failed to upload image");
                }}
              />
              {state?.error?.[SELL_PRODUCT_FORM_FIELDS.IMAGES]?.[0] && (
                <p className="text-destructive">
                  {state?.error?.[SELL_PRODUCT_FORM_FIELDS.IMAGES]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <input
                type="hidden"
                name={SELL_PRODUCT_FORM_FIELDS.PRODUCT_FILES}
                value={productFile}
              />
              <Label>Product Files</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success("Your Product file has been uplaoded!");
                }}
                onUploadError={(error: Error) => {
                  toast.error("Something went wrong, try again");
                }}
              />
              {state?.error?.[SELL_PRODUCT_FORM_FIELDS.PRODUCT_FILES]?.[0] && (
                <p className="text-destructive">
                  {state?.error?.[SELL_PRODUCT_FORM_FIELDS.PRODUCT_FILES]?.[0]}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-3">
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <LoaderCircle className="animate-spin" /> Please wait...
                </>
              ) : (
                "Sell Product"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SellRoute;
