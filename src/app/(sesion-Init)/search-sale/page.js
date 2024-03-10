import { MainSearchRecord } from "../../../components/app/abocado/searchRecord/MainSearchRecord";

export default function SearchSalePageage() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center pb-10">
        <h2 className="text-3xl">🔍 Busca un registro</h2>
      </div>
      <div className="mx-2 md:mx-10">
        <MainSearchRecord />
      </div>
    </main>
  );
}
