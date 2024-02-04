import React from "react";
const labelStyle = {
  position: "absolute",
  top: "-0.8rem",
  left: "0.5rem",
  color: "white",
  background: "black",
  transition: "all 0.5s",
  fontSize: "0.5rem",
  padding: "0 0.2rem",
};
export const Select = ({
  options = [],
  name,
  placeholder = "Calibre",
  register,
}) => {
  return (
    <div className="relative">
      <label
        className="text-sm text-white rounded-lg"
        htmlFor={name}
        style={labelStyle}>
        {placeholder}
      </label>
      <select
        name={name}
        {...register(name)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white text-gray-800">
        <option value={null}>Selecciona una opción</option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value ?? option.label}
            className="bg-white text-gray-800">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
