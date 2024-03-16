import React, { useRef } from "react";

export const Input = ({
  width = "w-32",
  style,
  register,
  name,
  placeholder,
  type,
  rest,
  onInput = undefined,
  getValues,
  required = false,
}) => {
  const inputRef = useRef(null);

  const inputStyle = {
    paddingLeft: "0.5rem",
    color: "black",
    minHeight: "2rem",
    width: "100%",
  };
  const labelStyle = {
    position: "absolute",
    top: "-0.8rem",
    left: "0.5rem",
    fontSize: "0.75rem",
    color: "white",
    background: "black",
    transition: "all 0.5s",
    fontSize: "0.6rem",
    padding: "0 0.5rem",
  };

  return (
    <div className="relative">
      <label
        htmlFor={name ?? placeholder}
        style={labelStyle}
        className="absolute rounded-lg"
        onClick={() => inputRef.current.focus()}>
        {placeholder ?? name}
      </label>

      <input
        ref={inputRef}
        className={`rounded-xl ${width}`}
        placeholder={placeholder}
        type={type}
        max={type === "number" ? 100000 : undefined}
        min={type === "number" ? 0 : undefined}
        style={{ ...inputStyle, ...(style ?? { style }) }}
        required={required}
        {...rest}
        {...register(name)}
        onInput={onInput}
      />
    </div>
  );
};
