import {
  FaCalculator,
  FaHome,
  FaSalesforce,
  FaSearch,
  FaSignOutAlt,
  FaTripadvisor,
} from "react-icons/fa";

export const navbarItemsList = ({ isAdmin = false, isUser = false }) => {
  return [
    {
      name: "Home",
      path: "/home",
      icon: <FaHome />,
    },
    {
      name: "Calculadora",
      path: "/abocado",
      icon: <FaCalculator />,
    },
    ...(isAdmin
      ? [
          {
            name: "Buscar registro",
            path: "/search-sale",
            icon: <FaSearch />,
          },
        ]
      : []),
    ...(isUser
      ? [
          {
            name: "Mis ventas",
            path: "?",
            icon: <FaSalesforce />,
          },
        ]
      : []),
    {
      name: "Otros",
      path: "/others",
      icon: <FaTripadvisor />,
    },
    {
      name: "Salir",
      path: "?",
      icon: <FaSignOutAlt />,
      isCloseSession: true,
    },
  ];
};
