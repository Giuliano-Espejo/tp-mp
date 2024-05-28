import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'; 
import { useState, useEffect } from 'react';
import PreferenceMP from '../../../../types/mercadopago/PreferenceMP'; 
import { createPreferenceMP } from '../../../../service/BackendClient'; 

interface CheckoutMPProps {
  pedidoId: number; // ID del pedido
  montoCarrito: number; // Monto total del carrito
}

function CheckoutMP({ pedidoId, montoCarrito = 0 }: CheckoutMPProps) {
  const [idPreference, setIdPreference] = useState<string>(''); // Estado para almacenar el ID de la preferencia

  useEffect(() => {
    const getPreferenceMP = async () => {
      if (montoCarrito > 0 && pedidoId) { // Solo crea la preferencia si hay monto y un ID de pedido
        try {
          const response: PreferenceMP = await createPreferenceMP({
            id: pedidoId,
            fechaPedido: new Date(),
            totalPedido: montoCarrito,
          });
          console.log("Preference id: " + response.id);
          if (response) setIdPreference(response.id); // Establece el ID de la preferencia en el estado
        } catch (error) {
          console.error("Error al obtener la preferencia de Mercado Pago", error);
        }
      } else {
        alert("Agregue al menos un instrumento al carrito");
      }
    };

    getPreferenceMP(); // Llama a la función para obtener la preferencia
  }, [montoCarrito, pedidoId]); // Se ejecuta cada vez que cambia el monto del carrito o el ID del pedido

  initMercadoPago('TEST-5b58b558-60aa-484c-8fff-a76c3e78d96a', { locale: 'es-AR' }); // Inicializa Mercado Pago con el API key

  const handlePagoClick = () => {
    if (idPreference) {
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${idPreference}`; // Redirige al usuario a la página de pago de Mercado Pago
    }
  };

  return (
    <div>
      <button onClick={handlePagoClick} className='btMercadoPago'>COMPRAR con <br /> Mercado Pago</button>
      {idPreference && (
        <div className='divVisible'>
          <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
        </div>
      )}
    </div>
  );
}

export default CheckoutMP;
