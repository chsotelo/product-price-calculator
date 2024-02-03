import React from "react";

export const Button = ({
  type = "button",
  typeStyle,
  disabledStatus,
  children,
  ...props
}) => {
  let buttonClasses = "py-2 px-4 rounded focus:outline-none";

  switch (typeStyle) {
    case "primary":
      buttonClasses += " bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "secondary":
      buttonClasses += " bg-gray-500 text-white hover:bg-gray-600";
      break;
    case "tertiary":
      buttonClasses += " bg-green-500 text-white hover:bg-green-600";
      break;
    default:
      buttonClasses += " bg-gray-500 text-white hover:bg-gray-600";
  }

  return (
    <button
      type={type}
      className={`${buttonClasses} ${
        disabledStatus &&
        "bg-cyan-700 hover:cursor-not-allowed hover:bg-cyan-900"
      }`}
      disabled={disabledStatus}
      {...props}>
      {children}
    </button>
  );
};
