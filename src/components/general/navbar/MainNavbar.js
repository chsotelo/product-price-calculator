import { getServerSession } from "next-auth";
import { NavbarItem } from "./NavBarItem";
import { navbarItemsList } from "./navbarItemsList";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";

const MainNavbar = async () => {
  const { user } = await getServerSession(authOptions);
  return (
    <nav
      className="hidden relative md:block px-2 py-3 min-h-screen w-96 bg-slate-900"
      style={{
        position: "sticky",
        top: "0",
        left: "0",
        height: "100vh",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.4)",
      }}>
      <h2 className="p-10">LOGO</h2>
      <ul className="flex flex-col gap-4">
        {navbarItemsList({
          isAdmin: user?.role?.isAdmin,
          isUser: user?.role?.isUser,
        }).map((item, index) => (
          <NavbarItem
            key={index}
            name={item.name}
            path={item.path}
            icon={item.icon}
            isCloseSession={item.isCloseSession}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MainNavbar;
