import SettingsForm from "@/components/SettingsForm";
import { Card } from "@/components/ui/card";
import prisma from "@/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

const SettingsPage = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const data = await getData(user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <SettingsForm
          firstName={data?.firstName!}
          lastName={data?.lastName!}
          email={data?.email!}
        />
      </Card>
    </div>
  );
};

export default SettingsPage;
