package com.gonza.carrito.Service;

import com.gonza.carrito.Entity.Categoria;

import java.util.List;

public interface CategoriaService {
    Categoria save(Categoria categoria);
    Categoria update(Categoria categoria, Long id);
    Categoria findById(Long id);
    List<Categoria> findAll();
    Boolean delete(Long id);
}