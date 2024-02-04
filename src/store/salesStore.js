import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSalesStore = create(
  persist(
    (set, get) => ({
      sales: [],

      addSales: (sale) => {
        set((state) => {
          return { sales: [...state.sales, sale] };
        });
      },
      updateSale: (sale) => {
        set((state) => {
          const newSales = state.sales.map((item) => {
            if (item.id === sale.id) {
              return sale;
            }
            return item;
          });
          return { sales: newSales };
        });
      },
      deleteSale: (id) => {
        set((state) => {
          const newSales = state.sales.filter((item) => item.id !== id);
          return { sales: newSales };
        });
      },
      resetSales: () => {
        set((state) => {
          return { sales: [] };
        });
      },
      getSales: () => {
        return get().sales;
      },
    }),

    {
      name: "sales-store",
      getStorage: () => localStorage,
    }
  )
);
