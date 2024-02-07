import Link from "next/link";
import React from "react";

export const FunctionalityCard = ({ label, icon, path }) => {
  return (
    <Link
      className=" h-40 w-40 bg-slate-800 p-4 rounded-lg flex flex-col gap-2 text-center justify-center items-center with-box-shadow hover:bg-slate-900 transition-all duration-300 ease-in-out hover:scale-105"
      href={path}>
      <span className="h-full w-full svg-in-cards flex justify-center">
        {icon}
      </span>
      <p className="text-white text-sm">{label}</p>
    </Link>
  );
};
