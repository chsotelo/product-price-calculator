/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../general/inputs/Input";
import { NAME_OF_LOCAL_STORAGE_USER_WHO_SELL } from "../../constants/general";
const inputFields = [
  { type: "text", id: "DNI", placeholder: "DNI", name: "DNI" },
  { type: "text", id: "name", placeholder: "Nombre", name: "name" },
  { type: "text", id: "lastName", placeholder: "Apellido", name: "lastName" },
  { type: "number", id: "phone", placeholder: "Celular", name: "phone" },
  { type: "text", id: "lugar", placeholder: "Lugar de venta", name: "place" },
];
export const UserWhoSellsForm = () => {
  const dataUserWhoShell = localStorage.getItem(
    NAME_OF_LOCAL_STORAGE_USER_WHO_SELL
  );
  const { control, getValues, register, setValue, watch } = useForm({
    defaultValues: JSON.parse(dataUserWhoShell) ?? {
      DNI: "",
      name: "",
      lastName: "",
      phone: "",
      place: "",
    },
  });
  const [DNI, name, lastName, phone, place] = watch(
    inputFields.map((field) => field.name)
  );

  useEffect(() => {
    const objectUserWhoSell = getValues();

    localStorage.setItem(
      NAME_OF_LOCAL_STORAGE_USER_WHO_SELL,
      JSON.stringify(objectUserWhoSell)
    );
  }, [DNI, name, lastName, phone, place]);

  return (
    <>
      <h3 className="mb-2">Datos Generales</h3>
      <div className="min-h-8 h-auto grid gap-4  w-full grid-cols-1 grid-rows-6 md:grid-cols-3 md:grid-rows-2 mb-10">
        {inputFields.map((field, index) => (
          <Input
            key={index}
            type={field.type}
            id={field.id}
            placeholder={field.placeholder}
            name={field.name}
            register={register}
            getValues={getValues}
          />
        ))}
      </div>
    </>
  );
};
