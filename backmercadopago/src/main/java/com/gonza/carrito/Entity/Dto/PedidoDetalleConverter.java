package com.gonza.carrito.Entity.Dto;

import com.gonza.carrito.Entity.PedidoDetalle;
import com.gonza.carrito.Service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoDetalleConverter {

    @Autowired
    private InstrumentoService instrumentoService;

    public PedidoDetalle toEntity(PedidoDetalleDto pd){
        PedidoDetalle pedidoDetalle = new PedidoDetalle();
        pedidoDetalle.setCantidad(pd.getCantidad());
        pedidoDetalle.setInstrumento(instrumentoService.findById(pd.getIdInstrumento()));
        return pedidoDetalle;
    }

}
