# ECommerceJemFront

Este proyecto es un **frontend de e-commerce** desarrollado con **React**, **TypeScript** y **Vite**. Permite la gestión y visualización de productos, usuarios, categorías, descuentos y órdenes de compra, integrando funcionalidades de administración y compra para usuarios finales y administradores.

## Características principales

- **Catálogo de productos** con filtros por género, categoría y búsqueda.
- **Gestión de usuarios** (registro, login, edición, cambio de contraseña, roles).
- **Carrito de compras** y proceso de compra con integración a MercadoPago.
- **Panel de administración** para productos, categorías, usuarios y órdenes.
- **Gestión de descuentos** y asignación a productos.
- **Responsive design** y experiencia de usuario optimizada.

## Estructura del proyecto

```
├── public/                # Imágenes y recursos públicos
├── src/
│   ├── components/        # Componentes UI reutilizables
│   ├── hook/              # Custom hooks para lógica de negocio
│   ├── screen/            # Vistas principales (Landing, ProductDetails, etc.)
│   ├── services/          # Servicios para llamadas a APIs
│   ├── store/             # Zustand stores para manejo de estado global
│   ├── types/             # Tipos y DTOs TypeScript
│   └── index.css          # Estilos globales
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Instalación

1. **Clona el repositorio:**

   ```sh
   git clone <url-del-repo>
   cd ECommerceJemFront
   ```

2. **Instala las dependencias:**

   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**

   - Crea un archivo `.env` en la raíz con las siguientes variables:
     ```
     VITE_API_URL=http://localhost:8080
     MP_ACCESS_TOKEN=<tu_token_mercadopago>
     ```

4. **Inicia la aplicación:**
   ```sh
   npm run dev
   ```

## Scripts útiles

- `npm run dev` – Inicia el servidor de desarrollo.
- `npm run build` – Genera la build de producción.
- `npm run lint` – Ejecuta ESLint para revisar el código.

## Dependencias principales

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/) (manejo de estado)
- [Formik](https://formik.org/) y [Yup](https://github.com/jquense/yup) (formularios y validaciones)
- [SweetAlert2](https://sweetalert2.github.io/) (alertas)
- [@mercadopago/sdk-react](https://www.npmjs.com/package/@mercadopago/sdk-react) (integración pagos)

## Estructura de carpetas destacada

- **src/components/ui/**: Componentes visuales reutilizables (botones, formularios, tablas, modales, etc).
- **src/hook/**: Hooks personalizados para lógica de negocio (productos, usuarios, categorías, etc).
- **src/services/**: Servicios para interactuar con la API backend.
- **src/store/**: Stores de Zustand para el manejo de estado global.
- **src/types/**: Definiciones de tipos y DTOs.

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu feature/fix: `git checkout -b mi-feature`
3. Realiza tus cambios y haz commit: `git commit -am 'Agrega mi feature'`
4. Haz push a tu rama: `git push origin mi-feature`
5. Abre un Pull Request.

## Licencia

MIT

---

> Proyecto desarrollado para la materia Metodología de la UTN.
