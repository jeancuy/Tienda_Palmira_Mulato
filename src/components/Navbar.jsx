import { CartIcon } from "./Icons.jsx";

export default function Navbar({ totalUnidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#catalogo">Tienda Palmira</a>
        <button
          className="cart-btn"
          onClick={onAbrirCarrito}
          aria-label={`Abrir carrito, ${totalUnidades} unidades`}
        >
          <CartIcon />
          {totalUnidades > 0 && <span className="cart-btn__badge">{totalUnidades}</span>}
        </button>
      </div>
    </header>
  );
}
