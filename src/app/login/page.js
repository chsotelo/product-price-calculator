"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";

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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Validar los datos del formulario con Zod
      loginSchema.parse(data);

      await signIn("credentials", {
        username: data.usuario,
        password: data.contrasena,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.error({ err });
          localStorage.setItem("error", err);
          return;
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      } else {
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
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enviar
          </button>
        </div>
        <div className="mb-4">
          {loading && <div className="text-green-500">Iniciando ...</div>}
        </div>
      </form>
    </div>
  );
}

export default PageLogin;
