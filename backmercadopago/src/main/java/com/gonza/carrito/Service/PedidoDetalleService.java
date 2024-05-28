package com.gonza.carrito.Service;

import com.gonza.carrito.Entity.Dto.PedidoDetalleDto;
import com.gonza.carrito.Entity.PedidoDetalle;

import java.util.List;

public interface PedidoDetalleService {
    PedidoDetalle save(PedidoDetalleDto pedidoDetalle);
    PedidoDetalle update(PedidoDetalle pedidoDetalle, Long id);
    PedidoDetalle findById(Long id);
    List<PedidoDetalle> findAll();
    Boolean delete(Long id);
}
