import { useState } from "react";
import QuantityInput from "./QuantityInput.jsx";
import { formatCOP } from "../utils/format.js";

// Solo presentación: color y emoji por producto (los datos del catálogo no se alteran)
const VISUAL = {
  1: { emoji: "☕", color: "#5a3a26" },
  2: { emoji: "🍯", color: "#b8741a" },
  3: { emoji: "🫓", color: "#d9a93a" },
  4: { emoji: "🍫", color: "#4a2c2a" },
  5: { emoji: "🍬", color: "#b23a48" },
  6: { emoji: "🥃", color: "#2f6f4e" },
};

export default function ProductCard({ producto, enCarrito, onAgregar, onMax, onMin }) {
  const [cantidad, setCantidad] = useState(1);
  const disponibles = producto.stock - enCarrito;
  const agotado = disponibles <= 0;
  const visual = VISUAL[producto.id];

  const agregar = () => {
    onAgregar(producto.id, cantidad);
    setCantidad(1);
  };

  return (
    <article className="card">
      <div className="card__media" style={{ background: visual.color }} aria-hidden="true">
        <span>{visual.emoji}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{producto.nombre}</h3>
        <p className="card__price">{formatCOP(producto.precio)}</p>
        <p className={`card__stock ${disponibles <= 3 ? "card__stock--low" : ""}`}>
          {agotado ? "Sin unidades disponibles" : `Disponibles: ${disponibles}`}
        </p>
        <div className="card__actions">
          <QuantityInput
            value={cantidad}
            max={producto.stock}
            onChange={setCantidad}
            onMax={onMax}
            onMin={onMin}
            label={`Cantidad de ${producto.nombre}`}
          />
          <button className="btn btn--primary" onClick={agregar} disabled={agotado}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
