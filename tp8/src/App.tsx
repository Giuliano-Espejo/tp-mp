import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Categoria from './Components/screens/Categoria/Categoria';
import Home from './Components/screens/Home/Home';
import Instrumento from './Components/screens/Instrumento/Instrumento';
import Navbar from './Components/ui/common/NavBar/NavBar';
import InstrumentoType from './types/Instrumento';
import CheckoutMP from './Components/ui/common/mp/CheckoutMP';
import Carrito from './Components/ui/common/Carrito/Carrito'; // Asegúrate de que esta ruta esté correcta

const App: React.FC = () => {
  const [carrito, setCarrito] = useState<InstrumentoType[]>([]); // Estado para el carrito de compras
  const [pedidoId, setPedidoId] = useState<number | null>(null); // Estado para el ID del pedido
  const [montoCarrito, setMontoCarrito] = useState<number>(0); // Estado para el monto total del carrito
  const navigate = useNavigate(); // Hook para navegación

  const handleAddToCart = (instrumento: InstrumentoType) => {
    setCarrito((prevCarrito) => [...prevCarrito, instrumento]); // Agrega un instrumento al carrito
  };

  const handleFinalizarCompra = (newPedidoId: number, totalPedido: number) => {
    setPedidoId(newPedidoId);
    setMontoCarrito(totalPedido);
    navigate('/mercadopago'); // Navega a la página de Mercado Pago
  };

  return (
    <>
      <Navbar carrito={carrito} />
      <Routes>
        <Route path="/" element={<Home handleAddToCart={handleAddToCart} />} />
        <Route path="/categorias" element={<Categoria />} />
        <Route path="/instrumentos" element={<Instrumento />} />
        <Route path="/mercadopago" element={<CheckoutMP pedidoId={pedidoId} montoCarrito={montoCarrito} />} />
        <Route path="/carrito" 
          element={ // Pasa las props carrito y handleFinalizarCompra al componente Carrito
            <Carrito
              carrito={carrito}
              handleFinalizarCompra={handleFinalizarCompra} 
            />
          }
        />
        <Route path="*" element={<Home handleAddToCart={handleAddToCart} />} />
      </Routes>
    </>
  );
};

const MainApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
