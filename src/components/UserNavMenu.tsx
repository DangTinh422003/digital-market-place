"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
}

const UserNavMenu = ({ avatar, email, name }: UserProfile) => {
  return (
    <div className="font-normal">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-10 h-10 rounded-full relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={avatar || "https://avatar.vercel.sh/rauchg"} />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />

          <Button variant={"ghost"} className="w-full text-center">
            <LogoutLink>Sign out</LogoutLink>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNavMenu;
