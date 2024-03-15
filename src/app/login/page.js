"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";

// Definir el esquema de validación con Zod
const loginSchema = z.object({
  usuario: z.string().min(1, "Usuario es requerido"),
  contrasena: z.string().min(1, "Contraseña es requerida"),
});

function PageLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Validar los datos del formulario con Zod
      loginSchema.parse(data);
      // Enviar datos al servidor o realizar otras acciones

      const res = await signIn("credentials", {
        username: data.usuario,
        password: data.contrasena,
      });
      console.log("Resultado de la autenticación:", res);
    } catch (err) {
      if (err instanceof ZodError) {
        // Manejar errores de validación de Zod
        setError(err.errors[0].message);
      } else {
        // Manejar otros tipos de errores
        console.error("Error:", err);
      }
    }
  };

  return (
    <div className="h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center content-center flex-col h-screen justify-center">
        <div className="mb-4 w-72">
          <label
            htmlFor="usuario"
            className="block text-gray-400 font-bold mb-2">
            Usuario:
          </label>
          <input
            type="text"
            id="usuario"
            placeholder="Usuario o correo electrónico"
            name="usuario"
            {...register("usuario", { required: true })}
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 text-black"
            autoComplete="username"
          />
          {errors.usuario && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
        </div>

        <div className="mb-4 w-72">
          <label
            htmlFor="contrasena"
            className="block text-gray-400 font-bold mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            placeholder="Contraseña"
            {...register("contrasena", { required: true })}
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500  text-black"
            autoComplete="current-password"
          />
          {errors.contrasena && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
        </div>

        {error && <span className="text-red-500">{error}</span>}

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PageLogin;
