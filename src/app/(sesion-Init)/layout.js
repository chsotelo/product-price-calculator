import MainHeader from "../../components/general/header/MainHeader";
import MainNavbar from "../../components/general/navbar/MainNavbar";
import { ToastProvider } from "../../providers/ToastProvider";

export default function SesionInitLayout({ children }) {
  return (
    <ToastProvider>
      <div className="flex  flex-row  ">
        <MainNavbar />
        <div className=" bg-slate-950 w-full">
          <MainHeader />
          <div className="flex min-h-screen flex-col items-center py-7 mx-2 md:mx-4 ">
            {children}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
