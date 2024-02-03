import { create } from "zustand";
import { persist } from "zustand/middleware";
const initialState = {
  sales: [
    {
      id: 1,
      typeProduct: "Primera" || "Segunda" || "Descarte",
      pricePerKilo: 6.5,
      kiloContainerUnit: 1.8,
      finalGrossKilos: 100,
      finalNumberOfContainers: 10,
      subTotalAmount: 1000,
      salesPlace: "Puywan",
      items: [
        {
          id: 1,
          finalGrossKilos: 100,
          numberOfContainers: 10,
        },
      ],
    },
  ],
};
//primer nivel de store
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
