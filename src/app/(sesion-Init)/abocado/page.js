import { MainAbocado } from "../../../components/app/abocado/MainAbocado";
import { Summary } from "../../../components/app/abocado/sumary.js/Summary";
import { UserWhoSellsForm } from "../../../components/app/abocado/user-sale/UserWhoSellsForm";

export default function AbocadoHome() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center pb-10">
        <h2 className="text-xl">Calculadora de precio </h2>
      </div>
      <div className="mx-2">
        <UserWhoSellsForm />
        <MainAbocado />
      </div>
    </main>
  );
}
