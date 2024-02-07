import React from "react";
import {
  FaCalculator,
  FaHome,
  FaSignOutAlt,
  FaTripadvisor,
} from "react-icons/fa";
import { NavbarItem } from "./NavBarItem";
const navbarItems = [
  {
    name: "Home",
    path: "/home",
    icon: <FaHome />,
  },
  {
    name: "Calculadora",
    path: "/abocado",
    icon: <FaCalculator />,
  },
  {
    name: "Otros",
    path: "/others",
    icon: <FaTripadvisor />,
  },
  {
    name: "Salir",
    path: "/",
    icon: <FaSignOutAlt />,
  },
];
const MainNavbar = () => {
  return (
    <nav
      className="hidden relative md:block px-2 py-3 min-h-screen w-60 bg-slate-900"
      style={{
        position: "sticky",
        top: "0",
        left: "0",
        height: "100vh",
        // sombra al borde
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.4)",
      }}>
      <h2 className="p-10">LOGO</h2>
      <ul className="flex flex-col gap-2">
        {navbarItems.map((item, index) => (
          <NavbarItem
            key={index}
            name={item.name}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MainNavbar;
