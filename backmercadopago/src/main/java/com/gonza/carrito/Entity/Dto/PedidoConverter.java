package com.gonza.carrito.Entity.Dto;

import com.gonza.carrito.Entity.Pedido;
import com.gonza.carrito.Service.PedidoDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class PedidoConverter {

    @Autowired
    private PedidoDetalleService pedidoDetalleService;

    public Pedido toEntity(PedidoDto p){
        Pedido pedido = new Pedido();
        pedido.setTotalPedido(p.getTotalPedido());
        pedido.setPedidosDetalle(p.getPedidosDetalle().stream()
                .map(idPedidoDetalle -> pedidoDetalleService.findById(idPedidoDetalle))
                .collect(Collectors.toSet()));
        return pedido;
    }
}
