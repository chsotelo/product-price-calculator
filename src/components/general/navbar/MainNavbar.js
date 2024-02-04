import Link from "next/link";
import React from "react";

const navbarItems = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Calcular",
    path: "/abocado",
  },
  {
    name: "Otros",
    path: "/others",
  },
];

const NavbarItem = ({ name, path }) => {
  return (
    <li className="m-1 w-80 max-w-[224px] hover:cursor-pointer hover:font-normal  bg-gradient-to-l rounded-xl font-extralight text-xl">
      <Link className="mx-2" href={path}>
        {name}
      </Link>
    </li>
  );
};

const MainNavbar = () => {
  return (
    <nav
      className="hidden relative md:block px-2 py-3 min-h-screen w-60 bg-slate-900"
      style={{
        position: "sticky",
        top: "0",
        left: "0",
        height: "100vh",
      }}>
      <h2 className="p-10">LOGO</h2>
      <ul className="flex flex-col gap-2">
        {navbarItems.map((item, index) => (
          <NavbarItem key={index} name={item.name} path={item.path} />
        ))}
      </ul>
    </nav>
  );
};

export default MainNavbar;
