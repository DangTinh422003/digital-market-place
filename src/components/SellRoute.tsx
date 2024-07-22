import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import SelectCategory from "./SelectCategory";
import { Textarea } from "./ui/textarea";
import TipTapEditor from "./TipTapEditor";
import { UploadDropzone } from "@/utils/uploadthing";
import { Button } from "./ui/button";

const SellRoute = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <form action="">
          <CardHeader>
            <CardTitle>Sell your products with ease</CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-1">
              <Label>Name</Label>
              <Input type="text" placeholder="Name of your product" />
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Category</Label>
              <SelectCategory />
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Price</Label>
              <Input type="number" placeholder="295$" />
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Small Sumary</Label>
              <Textarea placeholder="Please describe your product shortly right here..." />
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Description</Label>
              <TipTapEditor />
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Product Images</Label>
              <UploadDropzone endpoint="imageUploader" />
            </div>

            <div className="flex flex-col gap-y-1">
              <Label>Product Files</Label>
              <UploadDropzone endpoint="productFilesUpload" />
            </div>
          </CardContent>

          <CardFooter className="mt-3">
            <Button>Submit Form</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SellRoute;
