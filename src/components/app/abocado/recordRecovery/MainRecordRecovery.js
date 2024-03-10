import React from "react";
import { Record } from "./Record";

export const MainRecordRecovery = ({ records }) => {
  if (!records) return null;
  const opcionesFecha = {
    weekday: "long", // Día de la semana en formato largo (ejemplo: "Lunes")
    day: "numeric", // Día del mes (número)
    month: "long", // Mes en formato largo (ejemplo: "Enero")
    year: "numeric", // Año (número)
  };
  return (
    <div className="container mx-auto mt-8 flex flex-col gap-3">
      <h1 className="text-3xl font-bold mb-4">Lista de registros</h1>

      {records?.map((group, index) => (
        <div key={group.groupId} className="bg-slate-600 p-2 rounded-md w-full">
          <p className="text-center text-xl">Registro {index + 1}</p>
          <p>
            <span className="text-gray-400">Fecha y hora: </span>
            <label className="text-sm">
              {group.items[0].date.toLocaleDateString("es-ES", opcionesFecha)}
            </label>
          </p>

          {group.items.map((record) => (
            <Record key={record._id} record={record} />
          ))}
        </div>
      ))}
    </div>
  );
};
