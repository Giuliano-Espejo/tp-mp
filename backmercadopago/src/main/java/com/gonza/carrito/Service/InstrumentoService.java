package com.gonza.carrito.Service;

import com.gonza.carrito.Entity.Instrumento;

import java.util.List;

public interface InstrumentoService {
    Instrumento save(Instrumento instrumento);
    Instrumento update(Instrumento instrumento, Long id);
    Instrumento findById(Long id);
    List<Instrumento> findAll();
    List<Instrumento> findByCategoriaId(Long id);
    Boolean delete(Long id);
}
