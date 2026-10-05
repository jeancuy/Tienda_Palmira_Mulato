import { useEffect } from "react";
import { CloseIcon } from "./Icons.jsx";

function ToastItem({ toast, onClose }) {
  const { id, message, type, duration, action } = toast;

  useEffect(() => {
    const t = setTimeout(() => onClose(id), duration); // desaparece solo
    return () => clearTimeout(t);
  }, [id, duration, onClose]);

  return (
    <div className={`toast toast--${type}`} role={type === "confirm" ? "alertdialog" : "alert"}>
      <p className="toast__msg">{message}</p>
      <div className="toast__actions">
        {action && (
          <button
            className="btn btn--danger btn--sm"
            onClick={() => {
              action.onClick();
              onClose(id);
            }}
          >
            {action.label}
          </button>
        )}
        <button className="icon-btn toast__close" onClick={() => onClose(id)} aria-label="Cerrar aviso">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="toasts" aria-live="assertive">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
}
