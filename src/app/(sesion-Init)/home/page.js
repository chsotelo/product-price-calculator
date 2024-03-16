import { FaCalculator, FaSearch } from "react-icons/fa";
import { FunctionalityCard } from "../../../components/cards/FunctionalityCard";
const functionalitiesItems = [
  {
    label: "Calculadora de precio",
    icon: <FaCalculator />,
    path: "/abocado",
  },
  {
    label: "Buscar un registro de venta",
    icon: <FaSearch />,
    path: "/search-sale",
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
          ℹ️ Esta servicio nos sirve para obtener el precio del producto de
          manera automatica, precisa, perdurable y segura.
        </p>
        <section className="mt-10">
          <h2 className="text-red-500 text-xl ">Accesos directos</h2>
          <div className="mt-4 flex flex-row gap-6 flex-wrap ">
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
