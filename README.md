# Carrito de Compras — TIENDA PALMIRA

Reto práctico de **Desarrollo Front-End con React** · SENA – CBI Palmira

| Dato | Valor |
|---|---|
| Aprendiz | _Nombre y apellidos_ |
| Ficha | _número de ficha_ |
| Tecnología | React 18 + Vite |
| Repositorio | _https://github.com/usuario/Apellido_Nombre_CarritoReact_ |

## Instalar y ejecutar

```bash
git clone https://github.com/usuario/Apellido_Nombre_CarritoReact.git
cd Apellido_Nombre_CarritoReact
npm install
npm run dev
```

Abrir la URL que muestra la terminal (normalmente http://localhost:5173).

## Estructura

```
src/
├── App.jsx                  # estado del carrito y reglas de negocio
├── data/productos.js        # catálogo (array JSON)
├── hooks/useToasts.js       # manejo de toasts
├── utils/format.js          # formato moneda COP
└── components/
    ├── Navbar.jsx · ProductCard.jsx · CartPanel.jsx
    ├── QuantityInput.jsx    # campo de cantidad reutilizable (Punto 4)
    └── ToastContainer.jsx
```

## Funcionalidades

- Navbar fija con ícono de carrito a la derecha y contador de unidades (oculto en 0).
- Catálogo desde un array JSON; agregar el mismo producto suma en una sola línea.
- Campo de cantidad: bloquea `e E + - . ,`, pegado no numérico, 0, negativos y la rueda del mouse.
- Stock máximo con toast en las tres vías (campo, botón `+`, agregar repetido).
- Cantidad mínima 1 con toast de confirmación para eliminar; botón directo para quitar.
- Subtotales, total de unidades y total en COP actualizados al instante.
- Extra: carrito persistido en `localStorage`, diseño responsive y toasts accesibles.

## Evidencias

Guarda las capturas en la carpeta `/evidencias` y completa la tabla.

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---|---|---|
| 1 | Navbar e ícono con contador | evidencias/01-navbar.png | |
| 2 | Agregar producto desde el catálogo | evidencias/02-agregar.png | |
| 3 | Bloqueo de la tecla “e” y de negativos / 0 | evidencias/03-bloqueo.png | |
| 4 | Toast de stock máximo | evidencias/04-toast-maximo.png | |
| 5 | Toast de cantidad mínima con opción de eliminar | evidencias/05-toast-minimo.png | |
| 6 | Subtotales y total con varios productos | evidencias/06-totales.png | |
| 7 | Producto eliminado y total recalculado | evidencias/07-eliminado.png | |

## Casos de prueba del instructor (autoevaluación)

Marca cada uno al probarlo: 1 teclas bloqueadas · 2 pegado inválido · 3 cero en tarjeta · 4 cero en carrito · 5 escribir 999 (stock 8) · 6 Panela 2 + 2 queda en 3 · 7 `+` en el tope · 8 `−` en 1 con confirmación · 9 sin líneas duplicadas · 10 Café ×2, Panela ×3, Arepa ×1 = $98.400 · 11 botón deshabilitado sin stock · 12 contador en la navbar.
