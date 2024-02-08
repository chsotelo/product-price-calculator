"use client";
import React, { useState } from "react";
import { useAxios } from "../../../../hooks/useAxios";
import { toast } from "react-toastify";
import { SmallSpinner } from "../../../Spinner/SmallSpinner";
import { sortRecordsByDate } from "../../../../algorithms/sortRecordsByDate";
import { MainRecordRecovery } from "../recordRecovery/MainRecordRecovery";

export const MainSearchRecord = () => {
  const { get, loading } = useAxios();
  const [userSearch, setUserSearch] = useState(null);
  const [searchSales, setSearchSales] = useState(null);

  console.log(searchSales);
  console.log({ userSearch });

  const searchRecord = async (e) => {
    setUserSearch(null);
    setSearchSales(null);
    const dni = e.target.value;
    if (dni.length === 8) {
      const { data } = await get(`/user/${dni}`);

      data?.status === (200 || 201) &&
        (async () => {
          setUserSearch(data.data);
          toast.success("Usuario encontrado");
          const { data: dataSales } = await get(
            `/sales/${data.data._id}=userId`
          );
          console.log("dataSales", dataSales.data);

          setSearchSales(sortRecordsByDate({ records: dataSales.data }));
          dataSales?.status === (200 || 201) &&
            toast.success("Registros encontrados");

          dataSales?.status === (500 || 400) &&
            toast.warning("Registros no encontrados");
        })();

      data?.status === (500 || 400) && toast.warning("Usuario no encontrado");
    }
  };
  return (
    <div className="flex flex-col gap-1 ">
      <section className="flex  flex-col gap-1">
        <label htmlFor="search">Identificacion (DNI):</label>
        <div className="flex flex-row gap-2">
          <input
            id="search"
            className="rounded-md w-auto max-w-[300px] pl-2 h-8 border-2 border-gray-300 text-black"
            placeholder="Ingrese DNI"
            type="text"
            onInput={searchRecord}
          />
          {loading && (
            <div className="h-[30px] w-[30px]">
              <SmallSpinner />
            </div>
          )}
        </div>
      </section>
      <section>
        {searchRecord && <MainRecordRecovery records={searchSales} />}
      </section>
    </div>
  );
};
