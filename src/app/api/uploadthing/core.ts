import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing } from "uploadthing/next";
import { FileRouter, UploadThingError } from "uploadthing/server";

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const { getUser } = await getKindeServerSession();
      const user = await getUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),

  productFilesUpload: f({
    "application/zip": {
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const { getUser } = await getKindeServerSession();
      const user = await getUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
