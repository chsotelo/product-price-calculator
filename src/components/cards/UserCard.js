import Image from "next/image";
import React from "react";

export const UserCard = ({ name = "Usuario", srcImage = "/user.png" }) => {
  return (
    <div className="flex flex-row gap-3 items-center h-auto text-justify p-2">
      <Image
        src={srcImage}
        alt="user"
        width={30}
        height={30}
        className="rounded-full"
      />
      <p className="text-xl">{name}</p>
    </div>
  );
};
