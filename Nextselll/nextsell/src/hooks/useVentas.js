import { useContext } from 'react';
import { VentasContext } from '../context/ventascontext';

export const useVentas = () => {
  return useContext(VentasContext);
};
