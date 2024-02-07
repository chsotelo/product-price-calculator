import React, { useEffect } from "react";

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
      buttonClasses += ` bg-cyan-500 text-white hover:bg-cyan-600 ${
        disabledStatus &&
        "bg-cyan-800 hover:cursor-not-allowed hover:bg-cyan-1000"
      }`;
      break;
    case "secondary":
      buttonClasses += ` bg-gray-500 text-white hover:bg-gray-600
      ${
        disabledStatus &&
        " bg-gray-800 hover:cursor-not-allowed hover:bg-gray-1000"
      }`;

      break;
    case "tertiary":
      buttonClasses += ` bg-green-500 text-white hover:bg-green-600 
      ${
        disabledStatus &&
        " bg-green-700 hover:cursor-not-allowed hover:bg-green-900"
      }`;
      break;
    default:
      buttonClasses += ` bg-gray-500 text-white hover:bg-gray-600 
      ${
        disabledStatus &&
        "bg-gray-700 hover:cursor-not-allowed hover:bg-gray-900"
      }`;
  }
  useEffect(() => {}, [disabledStatus]);
  return (
    <button
      type={type}
      className={`${buttonClasses}`}
      disabled={disabledStatus}
      {...props}>
      {children}
    </button>
  );
};
