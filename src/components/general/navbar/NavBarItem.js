"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { closeSession } from "../../../algorithms/session/closeSession";

export const NavbarItem = ({ name, path, icon, isCloseSession }) => {
  const pathName = usePathname();
  return (
    <li
      className={`m-1  w-full hover:cursor-pointer hover:font-normal  bg-gradient-to-l rounded-xl font-extralight text-xl ${
        path === pathName && "is-active"
      }`}
      onClick={
        isCloseSession
          ? async () => {
              await closeSession();
            }
          : undefined
      }>
      <Link className="mx-2 flex gap-3 items-center " href={path}>
        {icon}
        {name}
      </Link>
    </li>
  );
};
