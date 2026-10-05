import { useEffect, useMemo, useState } from "react";
import { PRODUCTOS } from "./data/productos.js";
import { useToasts } from "./hooks/useToasts.js";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CartPanel from "./components/CartPanel.jsx";
import ToastContainer from "./components/ToastContainer.jsx";

const MSG_MAX = "Este es el máximo de producto disponible en stock";
const MSG_MIN = "La cantidad mínima es 1.";
const CLAVE = "tienda-palmira-carrito";

// Carrito persistido (valor agregado): se valida contra el catálogo al cargar
function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) || "[]")
      .map((i) => {
        const p = PRODUCTOS.find((x) => x.id === i.id);
        if (!p) return null;
        const c = Math.min(Math.max(parseInt(i.cantidad, 10) || 1, 1), p.stock);
        return { id: p.id, cantidad: c };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default function App() {
  const [items, setItems] = useState(cargarCarrito); // [{ id, cantidad }]
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const { toasts, push, dismiss } = useToasts();

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch { /* almacenamiento no disponible */ }
  }, [items]);

  const lineas = useMemo(
    () =>
      items.map(({ id, cantidad }) => {
        const producto = PRODUCTOS.find((p) => p.id === id);
        return { producto, cantidad, subtotal: producto.precio * cantidad };
      }),
    [items]
  );
  const totalUnidades = lineas.reduce((s, l) => s + l.cantidad, 0);
  const total = lineas.reduce((s, l) => s + l.subtotal, 0);
  const cantidadDe = (id) => items.find((i) => i.id === id)?.cantidad ?? 0;

  const fijarCantidad = (id, cantidad) =>
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
        : [...prev, { id, cantidad }]
    );

  const quitar = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const avisarMax = () => push(MSG_MAX);
  const avisarMinCatalogo = () => push(MSG_MIN);

  // Cantidad 1 + (− o escribir 0): toast con opción de eliminar
  const pedirEliminar = (id) => {
    const { nombre } = PRODUCTOS.find((p) => p.id === id);
    push(`Esta es la cantidad mínima. ¿Deseas eliminar "${nombre}" del carrito?`, {
      type: "confirm",
      duration: 8000,
      action: { label: "Eliminar", onClick: () => quitar(id) },
    });
  };

  const agregar = (id, cantidad) => {
    const { stock } = PRODUCTOS.find((p) => p.id === id);
    const nueva = cantidadDe(id) + cantidad;
    if (nueva > stock) {
      fijarCantidad(id, stock);
      avisarMax();
    } else {
      fijarCantidad(id, nueva);
    }
  };

  const sumar = (id) => {
    const { stock } = PRODUCTOS.find((p) => p.id === id);
    cantidadDe(id) >= stock ? avisarMax() : fijarCantidad(id, cantidadDe(id) + 1);
  };

  const restar = (id) => {
    cantidadDe(id) <= 1 ? pedirEliminar(id) : fijarCantidad(id, cantidadDe(id) - 1);
  };

  return (
    <>
      <Navbar totalUnidades={totalUnidades} onAbrirCarrito={() => setCarritoAbierto(true)} />

      <main className="page" id="catalogo">
        <section className="intro">
          <h1>Sabores de la región, directo a tu mesa</h1>
          <p>Elige la cantidad y agrégala al carrito. Solo mostramos lo que realmente hay en bodega.</p>
        </section>

        <section className="grid" aria-label="Catálogo de productos">
          {PRODUCTOS.map((p) => (
            <ProductCard
              key={p.id}
              producto={p}
              enCarrito={cantidadDe(p.id)}
              onAgregar={agregar}
              onMax={avisarMax}
              onMin={avisarMinCatalogo}
            />
          ))}
        </section>
      </main>

      <CartPanel
        abierto={carritoAbierto}
        lineas={lineas}
        totalUnidades={totalUnidades}
        total={total}
        onCerrar={() => setCarritoAbierto(false)}
        onSumar={sumar}
        onRestar={restar}
        onCambiar={fijarCantidad}
        onQuitar={quitar}
        onMax={avisarMax}
        onMinimo={pedirEliminar}
      />

      <ToastContainer toasts={toasts} onClose={dismiss} />
    </>
  );
}
