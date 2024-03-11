/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { areArraysOfObjectsEqual } from "../../../algorithms/areArrayOfObjectEquals";
import { NAME_OF_LOCAL_STORAGE_SALES } from "../constants/general";
import { Input } from "../../general/inputs/Input";
import { useCurrrentSalesStore } from "../../../store/currentSalesStore";

export const ItemCalculator = ({
  item,
  index,
  getValues,
  register,
  remove,
  update,
  setValue,
  watch,
  idItem,
}) => {
  const { setCurrentSalesModified } = useCurrrentSalesStore();
  let listHistoryFromLocalStorage =
    localStorage.getItem(NAME_OF_LOCAL_STORAGE_SALES) ?? "[]";

  const [kilos, cajas] = watch([
    `listOfRegisters.${index}.kilos`,
    `listOfRegisters.${index}.cajas`,
  ]);

  useEffect(() => {
    if (!idItem) {
      setValue(`listOfRegisters.${index}.id`, item.id);
    }
    setValue(`listOfRegisters.${index}.id`, idItem);
  }, []);

  const id = getValues(`listOfRegisters.${index}.id`);
  const values = getValues("listOfRegisters");

  useEffect(() => {
    const isArrayEqualx = areArraysOfObjectsEqual(
      values,
      JSON.parse(listHistoryFromLocalStorage)
    );
    if (!isArrayEqualx) {
      setCurrentSalesModified();
      localStorage.setItem(NAME_OF_LOCAL_STORAGE_SALES, JSON.stringify(values));
    }
  }, [kilos, cajas, values, id]);

  return (
    <div className="h-8 flex gap-2 max-w-80">
      <Input
        type="number"
        id={idItem + "kilos"}
        placeholder="Kilos"
        name={`listOfRegisters.${index}.kilos`}
        register={register}
        required={true}
      />
      <Input
        type="number"
        id={idItem + "cajas"}
        placeholder="cajas"
        name={`listOfRegisters.${index}.cajas`}
        register={register}
        required={true}
      />
      <Image
        src={"/remove_trash.svg"}
        alt=""
        height={30}
        className="hover:scale-110 transition duration-300 ease-in-out hover:scale-0.1"
        width={30}
        style={{
          marginLeft: "1rem",
          cursor: "pointer",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
        onClick={
          getValues("listOfRegisters").length === 1
            ? () => {
                update(index, {
                  kilos: "",
                  cajas: "",
                });
              }
            : () => {
                remove(index);
              }
        }
      />
    </div>
  );
};
