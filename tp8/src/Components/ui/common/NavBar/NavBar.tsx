import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Carrito from '../../common/Carrito/Carrito';
import Instrumento from '../../../../types/Instrumento';

interface NavbarProps {
  carrito: Instrumento[];
}

const Navbar: React.FC<NavbarProps> = ({ carrito }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Tienda
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link to="/categorias" style={{ textDecoration: 'none', color: 'inherit' }}>Categorías</Link>
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link to="/instrumentos" style={{ textDecoration: 'none', color: 'inherit' }}>Instrumentos</Link>
        </Typography>
        <Carrito carrito={carrito} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
