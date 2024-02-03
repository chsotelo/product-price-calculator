"use client";
import React, { useEffect } from "react";
import { ItemCalculator } from "./ItemCalculator";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { NAME_OF_LOCAL_STORAGE_SALES } from "../constants/general";

export const MainAbocado = () => {
  let listHistoryFromLocalStorage;
  if (typeof window !== "undefined") {
    listHistoryFromLocalStorage = localStorage.getItem(
      NAME_OF_LOCAL_STORAGE_SALES
    );
  }
  const { control, getValues, register, watch, setValue } = useForm({
    defaultValues: {
      listOfRegisters: JSON.parse(listHistoryFromLocalStorage) ?? [
        { kilos: "", cajas: "" },
      ],
    },
  });
  const {
    fields: listOfRegistersFields,
    append,
    remove,
  } = useFieldArray({
    name: "listOfRegisters",
    control,
  });

  return (
    <div className="text-sm ">
      <div className="flex gap-2 mb-2 ">
        <label className="w-32">Kilos totales:</label>
        <label className="w-32">Cantidad de cajas:</label>
      </div>
      <div className="flex flex-col gap-2 ">
        {listOfRegistersFields.map((item, index) => {
          return (
            <ItemCalculator
              key={item.id}
              idItem={item.id}
              index={index}
              register={register}
              remove={remove}
              item={item}
              setValue={setValue}
              getValues={getValues}
              watch={watch}
            />
          );
        })}
      </div>
      <div className="mt-4 w">
        <Image
          src={"/add.png"}
          alt=""
          height={30}
          width={30}
          className="rounded-full cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
          onClick={() =>
            append({
              kilos: "",
              cajas: "",
            })
          }
        />
      </div>
    </div>
  );
};
