import { useEffect, useState } from "react";

const TECLAS_BLOQUEADAS = ["e", "E", "+", "-", ".", ","];

/**
 * Campo de cantidad reutilizable (catálogo y carrito) — Punto 4.
 * Solo enteros positivos; nunca supera `max`.
 */
export default function QuantityInput({ value, max, onChange, onMax, onMin, label }) {
  const [borrador, setBorrador] = useState(String(value));

  useEffect(() => setBorrador(String(value)), [value]);

  const handleKeyDown = (e) => {
    if (TECLAS_BLOQUEADAS.includes(e.key)) {
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowUp" && Number(borrador) >= max) {
      e.preventDefault();
      onMax?.();
    }
  };

  const handlePaste = (e) => {
    const texto = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(texto)) e.preventDefault(); // solo dígitos
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "") return setBorrador(""); // permite borrar para reescribir
    if (!/^\d+$/.test(raw)) return;

    const n = parseInt(raw, 10);
    if (n < 1) {
      setBorrador(String(value)); // conserva el valor anterior
      onMin?.();
      return;
    }
    if (n > max) {
      setBorrador(String(max));
      if (value !== max) onChange(max);
      onMax?.();
      return;
    }
    setBorrador(String(n));
    if (n !== value) onChange(n);
  };

  return (
    <input
      className="qty-input"
      type="number"
      inputMode="numeric"
      min={1}
      max={max}
      step={1}
      value={borrador}
      aria-label={label}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={handleChange}
      onBlur={() => setBorrador(String(value))}
      onWheel={(e) => e.currentTarget.blur()} // la rueda del mouse no cambia el valor
    />
  );
}
