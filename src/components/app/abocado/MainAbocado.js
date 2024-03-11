/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { ItemCalculator } from "./ItemCalculator";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import {
  NAME_OF_LOCAL_STORAGE_CURRENT_METADATA,
  NAME_OF_LOCAL_STORAGE_SALES,
  NAME_OF_LOCAL_STORAGE_USER_WHO_SELL,
} from "../constants/general";
import { Input } from "../../general/inputs/Input";
import { Select } from "../../general/select/Select";
import { Summary } from "./sumary.js/Summary";
import { Button } from "../../general/button/Button";
import { useCurrrentSalesStore } from "../../../store/currentSalesStore";
import { useSalesStore } from "../../../store/salesStore";

const optionsForSelect = [
  {
    label: "Primera",
  },
  {
    label: "Segunda",
  },
  {
    label: "Tercera (descarte)",
  },
];

export const MainAbocado = () => {
  let listHistoryFromLocalStorage = null;
  let saleMetadataFromLocalStorage = null;
  let dataUserWhoShell = null;
  const { addSales, setIsUpdated } = useSalesStore();
  const [seeButton, setSeeButton] = useState(false);
  const { setCurrentSalesModified } = useCurrrentSalesStore();

  if (typeof window !== "undefined") {
    listHistoryFromLocalStorage = localStorage.getItem(
      NAME_OF_LOCAL_STORAGE_SALES
    );
    dataUserWhoShell = JSON.parse(
      localStorage?.getItem(NAME_OF_LOCAL_STORAGE_USER_WHO_SELL)
    );
    saleMetadataFromLocalStorage = JSON.parse(
      localStorage.getItem(NAME_OF_LOCAL_STORAGE_CURRENT_METADATA)
    );
  }

  const {
    control,
    formState: { errors },
    getValues,
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      listOfRegisters: JSON.parse(listHistoryFromLocalStorage) ?? [
        { kilos: "", cajas: "" },
      ],
      calibre: saleMetadataFromLocalStorage?.calibre ?? "Selecciona una opción",
      price: saleMetadataFromLocalStorage?.price ?? "",
      containerWeight: saleMetadataFromLocalStorage?.containerWeight ?? "",
    },
  });

  const {
    fields: listOfRegistersFields,
    append,
    remove,
    update,
  } = useFieldArray({
    name: "listOfRegisters",
    control,
  });

  const [calibre, price, containerWeight] = watch([
    "calibre",
    "price",
    "containerWeight",
  ]);

  const handleOnSubmit = (data) => {
    const { place } = dataUserWhoShell;
    const dataToSave = {
      id: window.crypto.randomUUID(),
      typeProduct: data.calibre,
      place,
      pricePerKilo: data.price,
      containerWeight: data.containerWeight,
      summary: data.summary,
      items: data.listOfRegisters,
    };
    addSales(dataToSave);
    localStorage.removeItem(NAME_OF_LOCAL_STORAGE_CURRENT_METADATA);
    setCurrentSalesModified();
    setIsUpdated();
    localStorage.removeItem(NAME_OF_LOCAL_STORAGE_SALES);
    setValue("listOfRegisters", [{ kilos: "", cajas: "" }]);
    reset();
  };

  useEffect(() => {
    setCurrentSalesModified();
    if (typeof window !== "undefined") {
      const valuesOfMetadata = {
        calibre: getValues("calibre") ?? "Selecciona una opción",
        price: getValues("price") ?? 0,
        containerWeight: getValues("containerWeight") ?? 0,
      };
      localStorage.setItem(
        NAME_OF_LOCAL_STORAGE_CURRENT_METADATA,
        JSON.stringify(valuesOfMetadata)
      );
    }
  }, [calibre, price, containerWeight]);

  return (
    <>
      <form
        className="max-w-[340px] bg-slate-900 p-3 rounded-lg min-w-[320px]"
        onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="text-sm mb-3">
          <div className="flex gap-4 flex-col max-w-[320px] ">
            <h1 className="text-xl text-red-500 text-center">Venta actual</h1>
            <h2></h2>
            <Select
              options={optionsForSelect}
              name="calibre"
              register={register}
              required={true}
            />
            <Input
              type="text"
              id="price"
              placeholder="Precio"
              name="price"
              register={register}
              getValues={getValues}
              required={true}
            />
            <Input
              type="text"
              id="containerWeight"
              placeholder="Peso de caja"
              name="containerWeight"
              register={register}
              getValues={getValues}
              required={true}
            />
          </div>
          <section>
            <h2 className="text-xl mt-3 text-red-500">Registro:</h2>
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
                    update={update}
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
          </section>
        </div>
        <Summary setValue={setValue} />
        <div className="mt-6 flex items-center gap-2 flex-col  ">
          <span className="flex flex-row gap-2 w-full">
            <input
              type="checkbox"
              onChange={(e) => setSeeButton(e.target.checked)}
            />
            <label>Confirmo que terminé de registrar</label>
          </span>

          <Button
            disabledStatus={!seeButton}
            type="submit"
            typeStyle={"primary"}>
            Registrar
          </Button>
        </div>
      </form>
    </>
  );
};
