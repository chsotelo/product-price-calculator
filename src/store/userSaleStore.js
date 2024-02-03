import { create } from "zustand";
import { persist } from "zustand/middleware";

//primer nivel de store
const initialState = {
  user: {
    id,
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    records: [],
  },
  userSales: [
    {
      idUser: 1,
      totalAmount: 1000,
      currentRecords: [],
    },
  ],
};

export const userSaleStore = create(
  persist((set, get) => ({
    userSales: [],
    addSale: (sale) => {
      set((state) => {
        return { userSales: [...state.userSales, sale] };
      });
    },
    updateSale: (sale) => {
      set((state) => {
        const newSales = state.userSales.map((item) => {
          if (item.id === sale.id) {
            return sale;
          }
          return item;
        });
        return { userSales: newSales };
      });
    },
    deleteSale: (id) => {
      set((state) => {
        const newSales = state.userSales.filter((item) => item.id !== id);
        return { userSales: newSales };
      });
    },
    resetSales: () => {
      set((state) => {
        return { userSales: [] };
      });
    },
    getSales: () => {
      return get().userSales;
    },

    useSale: {
      idUser: Crypto.randomUUID(),
      totalAmount: 0,
      currentRecords: [],
    },
    addUser: (user) => {
      set((state) => {
        return { user: user };
      });
    },
    updateUser: (user) => {
      set((state) => {
        return { user: user };
      });
    },
    deleteUser: (id) => {
      set((state) => {
        return { user: {} };
      });
    },
    getUser: () => {
      return get().user;
    },
  })),
  {
    name: "user-sale-store",
    getStorage: () => localStorage,
  }
);
