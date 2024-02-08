import React, { useState } from "react";

export const Record = ({ record }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-gray-800 p-4 mb-4 rounded cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}>
      <p className="text-white text-lg font-semibold mb-2">
        {record.caliber.name} - {record.caliber.denomination}
      </p>
      <p className="text-gray-400 mb-1">Lugar: {record.place}</p>
      <p className="text-green-400 mb-1">Monto total: s/{record.totalAmount}</p>

      {isExpanded && (
        <div>
          <p className="text-gray-400 mb-1">
            Fecha: {record.date.toLocaleString()}
          </p>
          <p className="text-gray-400 mb-1">
            Peso de caja: {record.boxWeight} kg
          </p>
          <p className="text-gray-400 mb-1">
            Cantidad de cajas: {record.quantityOfContainers} unidades
          </p>
          <p className="text-gray-400 mb-1">
            Peso bruto: {record.grossWeight} kg
          </p>
          <p className="text-gray-400 mb-1">Peso neto: {record.netWeight} kg</p>

          <div className="border-t border-gray-600 mt-4 pt-2">
            <p className="text-white mb-2">Sub registros:</p>
            <ul className="list-disc pl-4">
              {record.records.map((recordItem) => (
                <li key={recordItem.id} className="text-gray-400">
                  Kilos: {recordItem.kilos}, Cajas: {recordItem.cajas}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
