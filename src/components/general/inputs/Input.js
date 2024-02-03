import React from "react";

export const Input = ({
  width = "w-32",
  style,
  register,
  name,
  placeholder,
  type,
  rest,
}) => {
  const inputStyle = {
    paddingLeft: "0.5rem",
    color: "black",
    minHeight: "2rem",
    // height: "2rem",
    width: "100%",
  };
  return (
    <input
      className={` rounded-xl ${width} `}
      placeholder={placeholder}
      type={type}
      style={{ ...inputStyle, ...(style ?? { style }) }}
      {...rest}
      {...register(name)}
    />
  );
};
