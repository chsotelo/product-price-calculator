"use client";
import React, { useEffect, useState } from "react";
import { useSalesStore } from "../../../../store/salesStore";
import { Button } from "../../../general/button/Button";

export const SummaryGeneral = () => {
  const {
    sales,
    getCalculateSummary,
    isEmpty,
    setIsUpdated,
    stateUpdate,
    deleteSale,
    getSales,
    resetSales,
  } = useSalesStore();

  const { totalKilos, totalCajas, totalMonto } = getCalculateSummary();
  const [seeButtonSubmit, setSeeButtonSubmit] = useState(false);
  const [seeButtonClear, setSeeButtonClear] = useState(false);
  useEffect(() => {}, [stateUpdate]);
  return (
    <div className="flex flex-col gap-2 mt-3">
      {sales?.map((sale, index) => {
        return (
          <SummaryGeneralItem key={sale.id} sale={sale} index={index + 1} />
        );
      })}

      <div className="bg-slate-800 p-4 rounded-md min-w-[280px]  hover:cursor-text ">
        <h1 className="text-xl text-red-600 text-center">RESUMEN GENERAL:</h1>
        <SummaryGeneralSubItem
          lavel="Total cajas:"
          value={totalCajas}
          measurement={"unidades"}
          isOrange={true}
          isBold={true}
        />
        <SummaryGeneralSubItem
          lavel="Total monto acumulado:"
          value={totalMonto}
          measurement={"soles"}
          isGreen={true}
          isBold={true}
        />
        <hr />
        <div className="flex flex-col gap-3 mt-6 ">
          <span className="flex flex-row gap-2 w-full">
            <input
              type="checkbox"
              onChange={(e) => setSeeButtonSubmit(e.target.checked)}
            />
            <label>Confirmo que terminé de registrar con el usuario</label>
          </span>
          <Button
            disabledStatus={!seeButtonSubmit}
            typeStyle={"primary"}
            onClick={() => {
              console.log("Enviar a la base de datos");
            }}>
            Enviar a la base de datos
          </Button>
          <Button
            typeStyle={"secondary"}
            onClick={() => {
              console.log("Descargar PDF");
            }}>
            Descargar PDF
          </Button>
          <span className="flex flex-row gap-2 w-full">
            <input
              type="checkbox"
              onChange={(e) => setSeeButtonClear(e.target.checked)}
            />
            <label>Confirmo que quiero eliminar los sub-registros</label>
          </span>
          <Button
            typeStyle={"tertiary"}
            onClick={() => {
              resetSales();
            }}
            disabledStatus={!seeButtonClear}>
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
};

// ###############################################################################

const SummaryGeneralSubItem = ({
  lavel,
  value,
  measurement,
  isGreen,
  isOrange,
  isBold,
}) => {
  return (
    <>
      <div
        className={`flex flex-row p-1 text-xs ${
          isBold && "font-semibold text-xl "
        } ${isGreen && "text-green-500"} ${isOrange && "text-orange-500"}`}>
        <p
          className={` min-w-[140px] ${
            isBold && "min-w-[150px] md:min-w-[200px]"
          }`}>
          {lavel}
        </p>
        <hr className={`border-l h-4 mr-2`} />
        <p className={`min-w-[50px] `}>{value}</p>
        {measurement && <p className={`ml-2`}>{measurement}</p>}
      </div>
      <hr
        style={{
          borderColor: isGreen ? "green" : isOrange ? "orange" : "white",
          display: isBold ? "none" : "block",
        }}
      />
    </>
  );
};

export const SummaryGeneralItem = ({ sale, index }) => {
  const [seeSection, setSeeSection] = useState(false);
  return (
    <div
      key={sale.id}
      className="bg-slate-800 p-4 rounded-md min-w-[280px] hover:scale-[1.01] hover:cursor-pointer">
      <h3 className="text-xs text-red-600 mb-1">REGISTRO {index}</h3>
      <hr />
      <section
        className="flex flex-col gap-1 mt-2"
        onClick={() => setSeeSection(!seeSection)}>
        <SummaryGeneralSubItem lavel="Tipo:" value={sale.typeProduct} />

        {seeSection && (
          <>
            <SummaryGeneralSubItem
              lavel="Precio por kilo:"
              value={sale.pricePerKilo}
              measurement={"soles"}
              isOrange={true}
            />
            <SummaryGeneralSubItem
              lavel="Peso de caja:"
              value={sale.conyainerWeight}
              measurement={"kg"}
              isOrange={true}
            />
            <SummaryGeneralSubItem
              lavel="Total kilos brutos:"
              value={sale.summary.totalKilos}
              measurement={"kg"}
            />
            <SummaryGeneralSubItem
              lavel="Total cajas:"
              value={sale.summary.totalCajas}
              measurement={"u"}
            />
            <SummaryGeneralSubItem
              lavel="Total kilos de caja:"
              value={sale.summary.totalKilosCaja}
              measurement={"kg"}
            />
            <SummaryGeneralSubItem
              lavel="Total Kilos netos:"
              value={sale.summary.totalKilosNetos}
              measurement={"kg"}
            />
          </>
        )}
        <SummaryGeneralSubItem
          lavel="Monto sub-total:"
          value={sale.summary.totalMonto}
          measurement={"soles"}
          isGreen={true}
        />
      </section>
    </div>
  );
};
