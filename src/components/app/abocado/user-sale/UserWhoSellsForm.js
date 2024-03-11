/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../general/inputs/Input";
import { NAME_OF_LOCAL_STORAGE_USER_WHO_SELL } from "../../constants/general";
import { useUpdateEventStore } from "../../../../store/useUpdateEventStore";
import { useAxios } from "../../../../hooks/useAxios";
import { toast } from "react-toastify";

const inputFields = [
  {
    type: "text",
    id: "DNI",
    placeholder: "DNI",
    name: "DNI",
  },
  { type: "text", id: "name", placeholder: "Nombre", name: "name" },
  {
    type: "text",
    id: "lastName",
    placeholder: "Apellido",
    name: "lastName",
  },
  { type: "number", id: "phone", placeholder: "Celular", name: "phone" },
  {
    type: "text",
    id: "lugar",
    placeholder: "Lugar de venta",
    name: "place",
  },
  { type: "email", id: "email", placeholder: "Correo", name: "email" },
];

export const UserWhoSellsForm = () => {
  const { get } = useAxios();

  let dataUserWhoShell;
  if (typeof window !== "undefined") {
    dataUserWhoShell = JSON.parse(
      localStorage.getItem(NAME_OF_LOCAL_STORAGE_USER_WHO_SELL) ?? null
    );
  }
  const { setIsEdited } = useUpdateEventStore();
  const { control, getValues, register, setValue, watch } = useForm({
    defaultValues: dataUserWhoShell ?? {
      DNI: "",
      name: "",
      lastName: "",
      phone: "",
      place: "",
      email: "",
    },
  });

  const onInputHandleChange = async (e) => {
    const DNI = e.target.value;

    if (DNI && DNI.length === 8 && DNI !== "00000000") {
      try {
        const { data } = await get(`/user/${DNI}`);
        const { username, phoneNumber, places, email, _id } = data?.data || {};

        const fields = {
          name: username?.firstname || "",
          lastName: username?.lastname || "",
          phone: phoneNumber || "",
          place: places?.[0] || "",
          email: email || "",
          _id: _id || null,
        };

        Object.entries(fields).forEach(([field, value]) =>
          setValue(field, value)
        );
        fields._id && toast.success("Usuario encontrado 🌝");
      } catch (error) {
        handleErrors(error);
      }
    } else {
      resetFields(["_id", "name", "lastName", "phone", "place", "email"]);
    }
  };

  const resetFields = (fields) => {
    fields.forEach((field) => setValue(field, ""));
  };

  const handleErrors = (error) => {
    console.error("Error:", error);
  };

  const [DNI, name, lastName, phone, place, email] = watch(
    inputFields.map((field) => field.name)
  );

  useEffect(() => {
    const objectUserWhoSell = getValues();

    localStorage.setItem(
      NAME_OF_LOCAL_STORAGE_USER_WHO_SELL,
      JSON.stringify(objectUserWhoSell)
    );
    setIsEdited();
  }, [DNI, name, lastName, phone, place, email]);

  return (
    <>
      <h3 className="mb-2">Datos Generales</h3>
      <div className="min-h-8 h-auto grid gap-4  w-full grid-cols-1 grid-rows-6 md:grid-cols-3 md:grid-rows-2 mb-10">
        {inputFields.map((field, index) => (
          <Input
            key={index}
            onInput={field.name === "DNI" ? onInputHandleChange : undefined}
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
