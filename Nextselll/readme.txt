nextsell/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── modal.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── sidebar.jsx
|   |   |   ├── sidebar.css
│   │   │   └── header.jsx
│   │   │
│   │   └── common/
│   │       ├── searchbar.jsx
│   │       └── paginacion.jsx
│   │
│   ├── pages/
│   │   ├── ventas/
│   │   │   ├── index.jsx
│   │   │   ├── carritocompra.jsx
│   │   │   └── productogrid.jsx
│   │   │
│   │   ├── inventario/
│   │   │   └── index.jsx
│   │   │
│   │   ├── clientes/
│   │   │   ├── index.jsx
│   │   │   ├── listaclientes.jsx
│   │   │   └── formulariocliente.jsx
│   │   │
│   │   ├── reportes/
│   │   │   ├── index.jsx
│   │   │   ├── ventasreporte.jsx
│   │   │   └── empleadosreporte.jsx
│   │   │
│   │   |── empleados/
│   │   |   └── index.jsx 
│   │   |
|   |   └── bienvenida/
|   |       └── bienvenida.jsx 
│   ├── hooks/
│   │   ├── useVentas.js
│   │   ├── useInventario.js
│   │   ├── useClientes.js
│   │   └── useReportes.js
│   │
│   ├── context/
│   │   ├── ventascontext.jsx
│   │   ├── inventariocontext.jsx
│   │   └── authcontext.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── ventasservice.js
│   │   ├── inventarioservice.js
│   │   └── clientesservice.js
│   │
│   ├── utils/
│   │   ├── formatters.js
│   │   └── validators.js
│   │
│   ├── assets/
│   │   ├── logo.svg
│   │   └── styles/
|   |       ├── empleados.css
|   |       ├── clientes.css
|   |       ├── inventario.css
|   |       ├── reportes.css
|   |       ├── ventas.css
│   │       └── global.css
│   │
│   ├── App.jsx
|   ├── App.css
│   ├── main.jsx
│   └── index.css
├── vite.config.js
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md