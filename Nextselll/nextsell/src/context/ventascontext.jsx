import React, { createContext, useState, useContext };

const VentasContext = createContext();

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);

  const agregarVenta = (venta) => {
    setVentas([...ventas, venta]);
  };

  return (
    <VentasContext.Provider value={{ ventas, agregarVenta }}>
      {children}
    </VentasContext.Provider>
  );
};

export const useVentas = () => {
  return useContext(VentasContext);
};
