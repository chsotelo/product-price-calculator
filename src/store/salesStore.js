import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSalesStore = create(
  persist(
    (set, get) => ({
      sales: [],
      stateUpdate: false,
      isEmpty: () => {
        return get().sales.length === 0;
      },
      setIsUpdated: () => {
        set({ stateUpdate: !get().stateUpdate });
      },
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
      getCalculateSummary: () => {
        const sales = get().sales;
        if (sales.length === 0) {
          return {
            totalKilos: 0,
            totalCajas: 0,
            totalMonto: 0,
          };
        }
        const totalMonto = sales.reduce((acc, sale) => {
          return acc + sale.summary.totalMonto;
        }, 0);
        const totalKilos = sales.reduce((acc, sale) => {
          return acc + sale.summary.totalKilos;
        }, 0);
        const totalCajas = sales.reduce((acc, sale) => {
          return acc + sale.summary.totalCajas;
        }, 0);

        return {
          totalKilos,
          totalCajas,
          totalMonto,
        };
      },
    }),

    {
      name: "sales-store",
      getStorage: () => localStorage,
    }
  )
);
