import Link from "next/link";

export default function RootMain() {
  return (
    <main className="bg-gray-100 min-h-screen font-sans">
      <div>
        {/* Sección 1: Descubre el Mundo de las Paltas */}
        <section
          className="py-20 bg-cover bg-center text-white"
          style={{
            backgroundImage: 'url("background.webp")',
            //que la imagen sea de 1920x1080
            backdropFilter: "brightness(0.5)",
            //difuemiento de la imagen
            opacity: "0.9",
          }}>
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Descubre nuestra calculadora
            </h1>
            <p className="text-lg">
              Explora nuestra calculadora y agiliza tus cálculos
            </p>
            <Link
              href="/home"
              className="mt-8 inline-block bg-white text-green-500 font-bold py-2 px-6 rounded-full transition duration-300 hover:bg-green-700 hover:text-white">
              ¡Comienza Ahora!
            </Link>
          </div>
        </section>

        {/* Sección 2: Beneficios de Consumir Paltas */}
        <section className="py-20 bg-green-500 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Optimiza tus Compras de Paltas
            </h2>
            <p className="text-lg">
              Con nuestra calculadora, tomar decisiones informadas sobre tus
              compras de paltas nunca ha sido tan fácil. Obtén información
              perdurable y realiza cálculos rápidos y precisos para asegurarte
              de obtener el mejor precio por kilo.
            </p>
          </div>
        </section>

        {/* Sección 3: Importancia de Calcular Precios para los Productores */}
        <section
          className="py-20"
          style={{
            backgroundImage: 'url("background-section-3.webp")',
            opacity: "0.8",
          }}>
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Importancia de Calcular Precios para los Productores
            </h2>
            <p className="text-lg">
              Calcular correctamente los precios es esencial para los
              productores de paltas. Les ayuda a establecer precios justos,
              gestionar sus costos y garantizar una operación sostenible.
              ¡Descubre cómo nuestra calculadora puede ser una herramienta
              valiosa!
            </p>
          </div>
        </section>
        <button>Comencemos</button>
      </div>
    </main>
  );
}
