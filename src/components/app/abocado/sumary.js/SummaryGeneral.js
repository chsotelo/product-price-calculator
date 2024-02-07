"use client";
import React, { useEffect, useState } from "react";
import { useSalesStore } from "../../../../store/salesStore";
import { Button } from "../../../general/button/Button";
import { useUpdateEventStore } from "../../../../store/useUpdateEventStore";
import {
  NAME_OF_LOCAL_STORAGE_CURRENT_METADATA,
  NAME_OF_LOCAL_STORAGE_SALES,
  NAME_OF_LOCAL_STORAGE_USER_WHO_SELL,
  typeProduct,
} from "../../constants/general";
import { useAxios } from "../../../../hooks/useAxios";
import { toast } from "react-toastify";
import { MainSpinner } from "../../../Spinner/MainSpinner";

export const SummaryGeneral = () => {
  let userWhoSell;
  const { loading, post } = useAxios();

  const { sales, getCalculateSummary, stateUpdate, resetSales } =
    useSalesStore();
  const { isEdited } = useUpdateEventStore();

  if (typeof window !== "undefined") {
    userWhoSell = JSON.parse(localStorage.getItem("userWhoSell"));
    // console.log("userWhoSell", userWhoSell);
  }

  const { totalKilos, totalCajas, totalMonto } = getCalculateSummary();
  const [seeButtonSubmit, setSeeButtonSubmit] = useState(false);
  const [seeButtonClear, setSeeButtonClear] = useState(false);

  // console.log("sales", sales);
  // console.log("userW", userWhoSell);
  const submitData = async () => {
    const salesData = sales.map((sale) => {
      return {
        place: sale.place, // requerido
        caliber: {
          name: sale.typeProduct, // requerido
          denomination: typeProduct.filter(
            (type) => type.label === sale.typeProduct
          )[0].denomination, // requerido
        },
        records: sale.items, // array mixto
        price: sale.pricePerKilo, // requerido
        quantityOfContainers: sale.summary.totalCajas, // requerido
        boxWeight: sale.containerWeight, // requerido
        grossWeight: sale.summary.totalKilos, // requerido
        netWeight: sale.summary.totalKilosNetos, // requerido
        totalAmount: sale.summary.totalMonto, // requerido
      };
    });
    const userData = {
      username: {
        firstname: userWhoSell.name, // requerido
        lastname: userWhoSell.lastName, // requerido
      },
      phoneNumber: userWhoSell.phone, // requerido
      identification: userWhoSell.DNI, // requerido
      email: userWhoSell.email,
      places: [userWhoSell.place],
    };
    const dataForSubmit = {
      salesData,
      userData,
    };
    const response = await post("/record", dataForSubmit);
    if (response.status === (200 || 201)) {
      toast.success("Datos enviados con exito");
      resetSales();
      localStorage.removeItem(NAME_OF_LOCAL_STORAGE_USER_WHO_SELL);
      localStorage.removeItem(NAME_OF_LOCAL_STORAGE_CURRENT_METADATA);
      localStorage.removeItem(NAME_OF_LOCAL_STORAGE_SALES);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    response.status === 400 && toast.error("Error al enviar los datos");
    response.status === 500 && toast.error("Error en el servidor");
    response.status === 404 && toast.error("Error en la ruta");
    response.status === 401 && toast.error("Error de autenticacion");
  };

  useEffect(() => {}, [stateUpdate, isEdited]);

  return (
    <div className="flex flex-col gap-2 mt-3">
      {sales?.map((sale, index) => {
        return (
          <SummaryGeneralItem key={sale.id} sale={sale} index={index + 1} />
        );
      })}
      {loading ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <MainSpinner />
          <label>Enviando datos..</label>
        </div>
      ) : (
        <div className="bg-slate-800 p-4 rounded-md min-w-[280px]  hover:cursor-text ">
          <h1 className="text-xl text-red-600 text-center">RESUMEN GENERAL:</h1>
          {sales.length === 0 ? (
            <p className="p-2">👉🏽 Aún no se agregaron registros</p>
          ) : (
            <>
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
                  <label>
                    Confirmo que terminé de registrar con el usuario
                  </label>
                </span>
                <Button
                  type="button"
                  disabledStatus={!seeButtonSubmit}
                  typeStyle={"primary"}
                  onClick={submitData}>
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
            </>
          )}
        </div>
      )}
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
      <h3 className="text-xs text-red-600 mb-1">
        REGISTRO {index} - {sale.typeProduct}{" "}
      </h3>
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
              value={sale.containerWeight}
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
