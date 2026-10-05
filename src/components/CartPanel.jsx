import { useEffect } from "react";
import QuantityInput from "./QuantityInput.jsx";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "./Icons.jsx";
import { formatCOP } from "../utils/format.js";

export default function CartPanel({
  abierto, lineas, totalUnidades, total,
  onCerrar, onSumar, onRestar, onCambiar, onQuitar, onMax, onMinimo,
}) {
  useEffect(() => {
    if (!abierto) return;
    const alEscape = (e) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", alEscape);
    return () => window.removeEventListener("keydown", alEscape);
  }, [abierto, onCerrar]);

  return (
    <>
      <div className={`overlay ${abierto ? "overlay--open" : ""}`} onClick={onCerrar} />
      <aside
        className={`drawer ${abierto ? "drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        aria-hidden={!abierto}
      >
        <header className="drawer__header">
          <h2>Tu carrito</h2>
          <button className="icon-btn" onClick={onCerrar} aria-label="Cerrar carrito">
            <CloseIcon />
          </button>
        </header>

        <div className="drawer__content">
          {lineas.length === 0 ? (
            <p className="empty">Aún no hay productos. Agrega algo del catálogo para empezar.</p>
          ) : (
            <ul className="lines">
              {lineas.map(({ producto, cantidad, subtotal }) => (
                <li className="line" key={producto.id}>
                  <div className="line__top">
                    <div>
                      <p className="line__name">{producto.nombre}</p>
                      <p className="line__unit">{formatCOP(producto.precio)} c/u</p>
                    </div>
                    <button
                      className="icon-btn icon-btn--danger"
                      onClick={() => onQuitar(producto.id)}
                      aria-label={`Quitar ${producto.nombre} del carrito`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                  <div className="line__bottom">
                    <div className="stepper">
                      <button
                        className="icon-btn"
                        onClick={() => onRestar(producto.id)}
                        aria-label={`Disminuir cantidad de ${producto.nombre}`}
                      >
                        <MinusIcon />
                      </button>
                      <QuantityInput
                        value={cantidad}
                        max={producto.stock}
                        onChange={(n) => onCambiar(producto.id, n)}
                        onMax={onMax}
                        onMin={() => onMinimo(producto.id)}
                        label={`Cantidad de ${producto.nombre} en el carrito`}
                      />
                      <button
                        className="icon-btn"
                        onClick={() => onSumar(producto.id)}
                        aria-label={`Aumentar cantidad de ${producto.nombre}`}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <p className="line__subtotal">{formatCOP(subtotal)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="drawer__footer">
          <div className="totals-row">
            <span>Total de unidades</span>
            <strong>{totalUnidades}</strong>
          </div>
          <div className="totals-row totals-row--big">
            <span>Total de la compra</span>
            <strong>{formatCOP(total)}</strong>
          </div>
        </footer>
      </aside>
    </>
  );
}
