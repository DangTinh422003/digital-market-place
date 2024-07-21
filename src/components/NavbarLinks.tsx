"use client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { HTMLAttributes } from "react";

export const NAVBAR_LINKS = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Template",
    href: "#",
  },
  {
    id: 2,
    name: "Ui Kits",
    href: "#",
  },
  {
    id: 3,
    name: "Icon",
    href: "#",
  },
];

interface NavbarLinksProps extends HTMLAttributes<HTMLDivElement> {}

const NavbarLinks = ({ className, ...rest }: NavbarLinksProps) => {
  const location = usePathname();

  return (
    <div
      className={clsx("hidden md:flex justify-center items-center", className)}
      {...rest}
    >
      {NAVBAR_LINKS.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            "text-gray-600 hover:text-gray-900 px-4 py-2 font-medium",
            location === link.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
