export const calculatePriceOfProduct = ({
  listOfRecords,
  price,
  containerWeight,
}) => {
  const totalKilos =
    listOfRecords?.reduce(
      (acc, item) => acc + (parseFloat(item.kilos) || 0),
      0
    ) || 0;
  const totalCajas =
    listOfRecords?.reduce(
      (acc, item) => acc + (parseFloat(item.cajas) || 0),
      0
    ) || 0;

  const totalKilosCaja = parseFloat(containerWeight) * totalCajas;
  const totalKilosNetos = totalKilos - totalKilosCaja;
  const totalMonto = (totalKilosNetos * parseFloat(price)).toFixed(2);

  return {
    totalKilos: parseFloat(totalKilos.toFixed(2)),
    totalCajas: parseFloat(totalCajas.toFixed(2)),
    totalKilosCaja: parseFloat(totalKilosCaja.toFixed(2)),
    totalKilosNetos: parseFloat(totalKilosNetos.toFixed(2)),
    totalMonto: parseFloat(totalMonto),
  };
};
