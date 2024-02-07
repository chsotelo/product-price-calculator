"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarItem = ({ name, path, icon }) => {
  const pathName = usePathname();
  return (
    <li
      className={`m-1 w-80 max-w-[224px] hover:cursor-pointer hover:font-normal  bg-gradient-to-l rounded-xl font-extralight text-xl ${
        path === pathName && "is-active"
      }`}>
      <Link className="mx-2 flex gap-3 items-center " href={path}>
        {icon}
        {name}
      </Link>
    </li>
  );
};
