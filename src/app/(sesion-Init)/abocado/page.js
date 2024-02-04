import { MainAbocado } from "../../../components/app/abocado/MainAbocado";
import { SummaryGeneral } from "../../../components/app/abocado/sumary.js/SummaryGeneral";
import { UserWhoSellsForm } from "../../../components/app/abocado/user-sale/UserWhoSellsForm";

export default function AbocadoHome() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center pb-10">
        <h2 className="text-xl">Calculadora de precio </h2>
      </div>
      <div className="mx-2">
        <UserWhoSellsForm />
        <section className="flex flex-col gap-4 lg:flex-row">
          <MainAbocado />
          <div
            style={{
              minWidth: "320px",
              width: "calc(100% - 340px)",
              display: "flex",
              flexDirection: "column",
            }}
            className="  bg-slate-900 p-3 rounded-xl ">
            <h2 className="text-red-500 text-xl text-center">
              Historial de registros
            </h2>
            <SummaryGeneral />
          </div>
        </section>
      </div>
    </main>
  );
}
