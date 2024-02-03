import MainHeader from "../../components/general/header/MainHeader";
import MainNavbar from "../../components/general/navbar/MainNavbar";

export default function SesionInitLayout({ children }) {
  return (
    <div className="flex  flex-row  ">
      <MainNavbar />
      <div className=" bg-slate-950 w-full">
        <MainHeader />
        <div className="flex min-h-screen flex-col items-center  mx-4 py-7">
          {children}
        </div>
      </div>
    </div>
  );
}
