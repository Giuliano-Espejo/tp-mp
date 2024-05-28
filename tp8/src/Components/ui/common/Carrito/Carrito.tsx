import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Instrumento from '../../../../types/Instrumento';
import { PedidoPost } from '../../../../types/PedidoPost';
import { PedidoDetallePost } from '../../../../types/PedidoDetallePost';
import PedidoDetalleService from '../../../../service/PedidoDetalleService';
import PedidoService from '../../../../service/PedidoService';
import Swal from 'sweetalert2';
import CheckoutMP from '../mp/CheckoutMP';

interface CarritoProps {
  carrito: Instrumento[];
}

const Carrito: React.FC<CarritoProps> = ({ carrito }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado para controlar el menú desplegable
  const [cantidadItems, setCantidadItems] = useState<{ [key: number]: number }>({}); // Estado para la cantidad de cada instrumento en el carrito
  const [totalPedido, setTotalPedido] = useState(0); // Estado para el total del pedido
  const [pedidoId, setPedidoId] = useState<number | null>(null); // Estado para el ID del pedido
  const pedidoDetalleService = new PedidoDetalleService(); // Instancia del servicio de detalles de pedido
  const pedidoService = new PedidoService(); // Instancia del servicio de pedidos
  const url = import.meta.env.VITE_API_URL; // URL base de la API

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // Abre el menú desplegable
  };

  const handleClose = () => {
    setAnchorEl(null); // Cierra el menú desplegable
  };

  const handleAgregarCantidad = (id: number) => {
    setCantidadItems(prevState => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1
    })); // Incrementa la cantidad del instrumento con el ID dado
  };

  const handleQuitarCantidad = (id: number) => {
    setCantidadItems(prevState => ({
      ...prevState,
      [id]: Math.max((prevState[id] || 0) - 1, 0)
    })); // Decrementa la cantidad del instrumento con el ID dado
  };

  const handleFinalizarCompra = async () => {
    const detalle: PedidoDetallePost[] = [];
    let hasItems = false; // Variable para verificar si hay items en el carrito con cantidad mayor que 0

    for (const item of carrito) {
      const cantidad = cantidadItems[item.id] || 0;
      if (cantidad > 0) {
        hasItems = true; // Marca que hay al menos un item con cantidad mayor que 0
        const pedidoDetalle: PedidoDetallePost = {
          cantidad,
          idInstrumento: item.id
        };
        detalle.push(pedidoDetalle);
      }
    }

    if (!hasItems) {
      Swal.fire({
        icon: 'error',
        title: 'Carrito vacío',
        text: 'Agregue al menos un instrumento al carrito.',
        showConfirmButton: true
      });
      return;
    }

    const pedidoId = 0; // Cambia el valor del ID del pedido según tu lógica de generación de ID
    const totalPedido = 0; // Cambia el valor del total del pedido según tu lógica de cálculo

    const pedido: PedidoPost = {
      id: pedidoId,
      totalPedido,
      pedidosDetalle: [0] // Cambia los detalles del pedido según tu lógica de construcción del carrito
    };

    try {
      const response = await pedidoService.post(url + '/pedido', pedido); // Envía el pedido a la API
      setPedidoId(response.id);

      // Envía cada detalle de pedido a la API
      for (const pedidoDetalle of detalle) {
        await pedidoDetalleService.post(url + '/pedidoDetalle', pedidoDetalle);
      }

      setCantidadItems({});
      handleClose();

      Swal.fire({
        icon: 'success',
        title: 'Pedido realizado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el pedido',
        text: 'Hubo un error al procesar su pedido. Inténtelo nuevamente.',
        showConfirmButton: true
      });
    }
  };

  useEffect(() => {
    const calculatedTotal = carrito.reduce((total, item) => total + (item.precio * (cantidadItems[item.id] || 0)), 0);
    setTotalPedido(calculatedTotal); // Calcula el total del pedido cada vez que cambia la cantidad de items
  }, [cantidadItems, carrito]);

  return (
    <div>
      <IconButton
        aria-label="Carrito de Compras"
        aria-controls="menu-carrito"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <ShoppingCartIcon />
      </IconButton>
      <Menu
        id="menu-carrito"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {carrito && carrito.length === 0 ? (
          <MenuItem onClick={handleClose}>El carrito está vacío</MenuItem>
        ) : (
          carrito?.map((item, index) => (
            <MenuItem key={index}>
              {item.instrumento} - ${item.precio} x 
              <button onClick={() => handleQuitarCantidad(item.id)}>-</button>
              {cantidadItems[item.id] || 0}
              <button onClick={() => handleAgregarCantidad(item.id)}>+</button>
            </MenuItem>
          ))
        )}
        <MenuItem onClick={handleFinalizarCompra}>Finalizar Compra</MenuItem>
      </Menu>
      <br></br>
      {pedidoId && <CheckoutMP pedidoId={pedidoId} montoCarrito={totalPedido} />} {/* Muestra el componente de Checkout de Mercado Pago si hay un pedido */}
    </div>
  );
};

export default Carrito;
