# Fase 1: Integración de Plantilla Phoenix 1.24

**Fecha:** 2026-05-14
**Proyecto:** proyecto-ecomer (Angular 21)
**Plantilla:** Phoenix 1.24 (versión de pago)

---

## Contexto

Este proyecto es una tienda en línea para un cliente venezolano con múltiples tiendas físicas. El frontend es Angular 21 y el backend será Django REST Framework. La plantilla Phoenix 1.24 (Bootstrap 5) se usará como base visual exacta del sitio.

Esta especificación cubre únicamente la **Fase 1**: integrar Phoenix como sistema de estilos y establecer la estructura completa de páginas del proyecto.

---

## Fases del proyecto (visión general)

| Fase | Contenido |
|---|---|
| **1 — Base visual** | Integrar Phoenix SCSS, refactorizar componentes actuales, crear páginas shell |
| **2 — Autenticación** | Login, registro, perfil de cliente, historial de órdenes |
| **3 — Panel del dueño** | Inventario centralizado + vista por tienda, gestión de productos |
| **4 — Panel del trabajador** | Órdenes pendientes, procesamiento de pedidos |
| **5 — Pagos** | PayPal, Pago Móvil, transferencias bancarias + verificación manual |
| **6 — Flujo WhatsApp** | Formulario previo → mensaje pre-armado → orden registrada en panel |

---

## Decisiones de diseño

- **Estilos:** Se usa el SCSS fuente de Phoenix (no el CSS compilado), para tener acceso a variables y mixins
- **Bootstrap:** Se elimina el paquete `bootstrap` de `package.json` ya que Phoenix lo incluye internamente
- **Íconos:** `@fortawesome/fontawesome-free` se mantiene (Phoenix también lo utiliza, sin conflicto)
- **Lógica de negocio:** `CartService`, `ToastService` y el array `PRODUCTS` no se modifican en esta fase

---

## Sección 1: Estructura de estilos

Los archivos SCSS de Phoenix se colocan en `src/styles/phoenix/`. El archivo global `styles.scss` los importa en este orden:

1. Variables de Phoenix (sobreescribibles antes de que se compilen)
2. Fuente principal de Phoenix (que incluye Bootstrap internamente)
3. Overrides propios del proyecto (si se necesitan ajustes puntuales)

```
src/
  styles/
    phoenix/           ← fuentes SCSS de Phoenix (sin modificar)
      _variables.scss
      _mixins.scss
      phoenix.scss
      ... (resto de archivos de Phoenix)
  styles.scss          ← punto de entrada: importa Phoenix + overrides
```

Los archivos `.scss` individuales de cada componente Angular se reservan exclusivamente para estilos de alcance local de ese componente.

---

## Sección 2: Refactorización de componentes existentes

Los 8 componentes y páginas actuales conservan su lógica TypeScript intacta. Solo se reescribe el template HTML para usar la estructura de clases y marcado exacto de Phoenix.

| Componente | Archivo | Qué cambia en el HTML |
|---|---|---|
| `NavbarComponent` | `components/navbar/` | Estructura de navbar Phoenix (búsqueda, carrito, menú) |
| `ProductCardComponent` | `components/product-card/` | Card de producto Phoenix (badge, rating, colores, hover) |
| `HomeComponent` | `pages/home/` | Hero section, categorías, featured products al estilo Phoenix |
| `ProductsComponent` | `pages/products/` | Filtros laterales + grilla de productos de Phoenix |
| `ProductDetailsComponent` | `pages/product-details/` | Galería de imágenes, specs, selector de color, botón agregar |
| `CartComponent` | `pages/cart/` | Layout de carrito Phoenix (tabla de items + resumen lateral) |
| `CheckoutComponent` | `pages/checkout/` | Formulario de checkout de Phoenix |
| `ToastComponent` | `components/toast/` | Componente toast/alert de Phoenix |

---

## Sección 3: Páginas shell

Se crean los siguientes componentes como **shells vacíos**: HTML estructural de Phoenix sin lógica real. Las rutas quedan registradas en `app.routes.ts` y protegidas con un `AuthGuard` vacío que en Fase 2 se conectará al sistema de autenticación real.

### Área de cliente

| Página | Ruta | Componente |
|---|---|---|
| Login | `/login` | `LoginComponent` |
| Registro | `/register` | `RegisterComponent` |
| Mi cuenta | `/account` | `AccountComponent` |
| Historial de órdenes | `/account/orders` | `OrderHistoryComponent` |
| Wishlist | `/account/wishlist` | `WishlistComponent` |

### Área de administración (protegida)

| Página | Ruta | Componente |
|---|---|---|
| Dashboard del dueño | `/admin/dashboard` | `AdminDashboardComponent` |
| Gestión de productos | `/admin/products` | `AdminProductsComponent` |
| Inventario por tienda | `/admin/inventory` | `AdminInventoryComponent` |
| Panel del trabajador | `/admin/orders` | `AdminOrdersComponent` |

Las rutas de `/account/*` requieren rol `customer`. Las rutas de `/admin/*` requieren rol `admin` o `worker` según la página.

---

## Sección 4: Flujo de datos y verificación

**Flujo de datos:** Sin cambios en esta fase. El array estático `PRODUCTS`, el `CartService` con Angular Signals y el `ToastService` permanecen igual. No se crean nuevos servicios.

**Criterios de aceptación:**

- [ ] `ng serve` ejecuta sin errores
- [ ] Cada ruta existente (`/`, `/products`, `/product/:id`, `/cart`, `/checkout`) muestra el diseño de Phoenix correctamente
- [ ] Las rutas shell nuevas cargan sin errores (muestran la estructura HTML vacía)
- [ ] Las rutas `/admin/*` y `/account/*` redirigen al login (guard activo)
- [ ] El carrito funciona correctamente tras los cambios de HTML (agregar, quitar, contador en navbar)
- [ ] El diseño es responsivo en móvil (< 768px), tablet (768–1024px) y escritorio (> 1024px)
- [ ] No hay conflictos de estilos entre Phoenix y los `.scss` de componentes

---

## Fuera de alcance en esta fase

- Autenticación real (Fase 2)
- Conexión a Django REST (a partir de Fase 2)
- Lógica de inventario (Fase 3)
- Procesamiento de pagos (Fase 5)
- Integración con WhatsApp (Fase 6)
