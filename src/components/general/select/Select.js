import React from "react";

export const Select = ({ options = [], name, register }) => {
  return (
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
  );
};
