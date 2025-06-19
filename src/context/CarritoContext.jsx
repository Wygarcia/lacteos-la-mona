import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    const existe = carrito.find(p => p.nombre === producto.nombre && p.sabores === producto.sabores);
    if (existe) {
      setCarrito(carrito.map(p =>
        p.nombre === producto.nombre && p.sabores === producto.sabores
          ? { ...p, cantidad: p.cantidad + producto.cantidad, total: (p.cantidad + producto.cantidad) * p.precio }
          : p
      ));
    } else {
      setCarrito([...carrito, { ...producto, total: producto.cantidad * producto.precio }]);
    }
  };

  const eliminarProducto = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
