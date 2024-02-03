import Image from "next/image";
import React from "react";

export const UserCard = ({ name = "Usuario", srcImage = "/user.png" }) => {
  return (
    <div className="flex flex-row gap-3 items-center h-full text-justify p-2">
      <Image
        src={srcImage}
        alt="user"
        width={25}
        height={25}
        className="rounded-full"
      />
      <p className="text-xs">{name}</p>
    </div>
  );
};
