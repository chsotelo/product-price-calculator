import { FaCalculator } from "react-icons/fa";
import { FunctionalityCard } from "../../../components/cards/FunctionalityCard";
const functionalitiesItems = [
  {
    label: "Calculadora de precio",
    icon: <FaCalculator />,
    path: "/abocado",
  },
];

export default function Homepage() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center pb-10">
        <h2 className="text-3xl">Bienvenido! ✌️</h2>
      </div>
      <div className="mx-2 md:mx-10">
        <p className="">
          ℹ️ Esta es que nos sirve para obtener el precio del producto de manera
          automatica, precisa, perdurable y segura.
        </p>
        <section className="mt-10">
          <h2 className="text-red-500 text-xl ">Funcionalidades</h2>
          <div className="mt-4 flex-row flex-wrap">
            {functionalitiesItems.map((item, index) => {
              return (
                <FunctionalityCard
                  key={index}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
