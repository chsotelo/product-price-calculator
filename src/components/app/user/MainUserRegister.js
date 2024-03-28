"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.object().shape({
    firstname: yup.string().required("Nombre es requerido"),
    lastname: yup.string().required("Apellido es requerido"),
  }),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Número de celular inválido")
    .required("Número de celular es requerido"),
  identification: yup
    .string()
    .matches(/^\d{8}$/, "Dni inválido")
    .required("Dni es requerido"),
  email: yup
    .string()
    .email("Correo inválido")
    .matches(/@gmail\.com$/, "Correo debe ser de gmail")
    .required("Correo es requerido"),
  password: yup
    .string()
    .required("Contraseña es requerida")
    .min(8, "Mínimo 8 caracteres"),
  role: yup.object().shape({
    isAdmin: yup.boolean(),
    isUser: yup.boolean(),
  }),
});

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className=" flex flex-col  w-full  gap-6 mt-8"
      onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center">Registro de usuario</h2>
      <section className=" flex flex-wrap justify-center  w-full  gap-4 mt-8">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstname">
            Nombres
          </label>
          <input
            {...register("username.firstname")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Nombres"
          />
          {errors.username?.firstname && (
            <p className="text-red-500 text-xs italic">
              {errors.username.firstname.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastname">
            Apellidos
          </label>
          <input
            {...register("username.lastname")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Apellidos"
          />
          {errors.username?.lastname && (
            <p className="text-red-500 text-xs italic">
              {errors.username.lastname.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber">
            Numero de celular
          </label>
          <input
            {...register("phoneNumber")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="text"
            placeholder="Numero de celular"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs italic">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="identification">
            DNI
          </label>
          <input
            {...register("identification")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="identification"
            type="text"
            placeholder="DNI"
          />
          {errors.identification && (
            <p className="text-red-500 text-xs italic">
              {errors.identification.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Correo (@gmail.com)
          </label>
          <input
            {...register("email")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Correo (@gmail.com)"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
            Contraseña
          </label>
          <input
            {...register("password")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex gap-4 w-[235px]  items-center justify-center">
          <div className="mb-4 flex flex-col justify-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isAdmin">
              Administrador
            </label>
            <input
              {...register("role.isAdmin")}
              className="mr-2 leading-tight"
              id="isAdmin"
              type="checkbox"
            />
          </div>
          <div className="mb-4 flex flex-col justify-center">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isUser">
              Usuario
            </label>
            <input
              {...register("role.isUser")}
              className="mr-2 leading-tight"
              id="isUser"
              type="checkbox"
            />
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Register
        </button>
      </div>
    </form>
  );
};
