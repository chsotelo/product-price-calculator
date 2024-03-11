/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useEffect } from "react";
import { calculatePriceOfProduct } from "../../../../algorithms/calculatePriceOfProduct";
import { useCurrrentSalesStore } from "../../../../store/currentSalesStore";
import {
  NAME_OF_LOCAL_STORAGE_CURRENT_METADATA,
  NAME_OF_LOCAL_STORAGE_SALES,
} from "../../constants/general";

export const Summary = ({ setValue }) => {
  let listOfRecords;
  let productSaleMetadata;
  const { isCurrentSalesModified } = useCurrrentSalesStore();
  if (typeof window !== "undefined") {
    listOfRecords = JSON.parse(
      localStorage.getItem(NAME_OF_LOCAL_STORAGE_SALES) ?? "[]"
    );
    productSaleMetadata = JSON.parse(
      localStorage.getItem(NAME_OF_LOCAL_STORAGE_CURRENT_METADATA) ?? "{}"
    );
  }

  const {
    totalKilos,
    totalCajas,
    totalKilosCaja,
    totalKilosNetos,
    totalMonto,
  } = calculatePriceOfProduct({
    listOfRecords,
    price: Number(productSaleMetadata?.price ?? 0),
    containerWeight: Number(productSaleMetadata?.containerWeight ?? 0),
  });
  const datos = [
    {
      label: "Total kilos brutos:",
      valor: { cantidad: totalKilos, unidad: "kg" },
    },
    { label: "Total cajas:", valor: { cantidad: totalCajas, unidad: "u" } },
    {
      label: "Total kilos de caja:",
      valor: { cantidad: totalKilosCaja, unidad: "kg" },
    },
    {
      label: "Total Kilos netos:",
      valor: { cantidad: totalKilosNetos, unidad: "kg" },
    },
    { label: "Monto Total:", valor: { cantidad: totalMonto, unidad: "soles" } },
  ];

  useEffect(() => {
    setValue("summary", {
      totalKilos,
      totalCajas,
      totalKilosCaja,
      totalKilosNetos,
      totalMonto,
    });
  }, [isCurrentSalesModified]);

  return (
    <div className="bg-slate-800 p-4 rounded-md min-w-[280px]  max-w-[300px] with-box-shadow ">
      <h1 className="text-xl text-red-600">Resumen:</h1>
      {datos.map((item, index) => (
        <Fragment key={index}>
          <span
            className={`flex flex-row gap-2 ${
              item.valor.unidad === "soles" && "text-green-500"
            }`}>
            <p className="w-40 ">{item.label}</p>
            <p>{`${item.valor.cantidad} ${item.valor.unidad}`}</p>
          </span>
          <hr />
        </Fragment>
      ))}
    </div>
  );
};
