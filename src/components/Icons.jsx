const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const CartIcon = () => (
  <svg {...base}>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6" />
  </svg>
);
export const PlusIcon = () => (
  <svg {...base} width={16} height={16}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = () => (
  <svg {...base} width={16} height={16}><path d="M5 12h14" /></svg>
);
export const CloseIcon = () => (
  <svg {...base} width={18} height={18}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const TrashIcon = () => (
  <svg {...base} width={18} height={18}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5" />
  </svg>
);
