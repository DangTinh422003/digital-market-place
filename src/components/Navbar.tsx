import Link from "next/link";
import React, { use } from "react";
import NavbarLinks from "./NavbarLinks";
import { Button } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import MobileMenu from "./MobileMenu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNavMenu from "./UserNavMenu";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">
            DMarket<span className="text-primary">UI</span>
          </h1>
        </Link>
      </div>

      <NavbarLinks className="col-span-6" />

      {!user ? (
        <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
          <Button asChild>
            <LoginLink>Logn</LoginLink>
          </Button>
          <Button variant="outline" asChild>
            <RegisterLink>Register</RegisterLink>
          </Button>
        </div>
      ) : (
        <div className="col-span-3 hidden md:flex justify-end">
          <UserNavMenu
            name={user.username || `${user.family_name} ${user.given_name}`}
            email={user.email as string}
            avatar={user.picture}
          />
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
