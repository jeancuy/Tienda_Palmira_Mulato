import { useCallback, useState } from "react";

let contador = 0;

// Gestiona la lista de toasts: agregar y cerrar. La auto-desaparición vive en <ToastItem />.
export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((lista) => lista.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((message, opciones = {}) => {
    const id = ++contador;
    setToasts((lista) => [
      // Si ya existe el mismo mensaje se reemplaza (evita apilar toasts repetidos)
      ...lista.filter((t) => t.message !== message),
      { id, message, type: "warning", duration: 4000, ...opciones },
    ]);
  }, []);

  return { toasts, push, dismiss };
}
