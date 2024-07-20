"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

const NavbarLinks = () => {
  const location = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6">
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
