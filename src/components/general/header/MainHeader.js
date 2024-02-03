import React from "react";
import { UserCard } from "../../cards/UserCard";

const MainHeader = () => {
  return (
    <div className="px-4 min-h-14 flex flex-row w-full justify-end bg-gray-800 items-center">
      <UserCard />
    </div>
  );
};

export default MainHeader;
