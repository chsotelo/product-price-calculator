"use client";
import React, { Fragment, useEffect } from "react";
import { calculatePriceOfProduct } from "../../../../algorithms/calculatePriceOfProduct";
import { useCurrrentSalesStore } from "../../../../store/currentSalesStore";

export const Summary = () => {
  const { isCurrentSalesModified } = useCurrrentSalesStore();

  const listOfRecords = JSON.parse(localStorage.getItem("currentSales"));
  console.log("listOfRecords", listOfRecords);

  const {
    totalKilos,
    totalCajas,
    totalKilosCaja,
    totalKilosNetos,
    totalMonto,
  } = calculatePriceOfProduct({
    listOfRecords,
    price: 6.5,
    containerWeight: 1.8,
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

  useEffect(() => {}, [isCurrentSalesModified]);

  return (
    <div className="bg-slate-800 p-4 rounded-md min-w-[280px]  max-w-[300px] ">
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
