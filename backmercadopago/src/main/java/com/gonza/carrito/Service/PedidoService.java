package com.gonza.carrito.Service;

import com.gonza.carrito.Entity.Dto.PedidoDto;
import com.gonza.carrito.Entity.Pedido;

import java.util.List;

public interface PedidoService {
    Pedido save(PedidoDto pedido);
    Pedido update(Pedido pedido, Long id);
    Pedido findById(Long id);
    List<Pedido> findAll();
    Boolean delete(Long id);
}
