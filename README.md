# Atlabase Client 🎨

<p align="center">
  <img src="https://res.cloudinary.com/dx7e5izqu/image/upload/v1761590790/Cover_-_Lexend_Deca_itslfl.png" alt="Logo de Atlabase" width="1100">
</p>

Este es el repositorio del frontend para **Atlabase**, construido con **Next.js (App Router)**. Provee la interfaz de usuario moderna, responsiva y accesible para gestionar el Micro-CRM.

> **Status:** 🚧 **En Desarrollo** 🚧
>
> Este proyecto consume la API de Atlabase y está diseñado para trabajar en conjunto con el backend dockerizado.

---

## ✨ Características Principales

- **Arquitectura Moderna:** Basado en Next.js 15+ con App Router y Server Components.
- **UI Profesional:** Componentes construidos con **Shadcn UI** y estilizados con **Tailwind CSS**.
- **Gestión de Estado:** Uso de **TanStack Query** para manejo eficiente del estado del servidor y caché.
- **Formularios Robustos:** Validación de esquemas en cliente usando **Zod** y **React Hook Form**.
- **Seguridad:** Protección de rutas mediante **Middleware** y persistencia de sesión con Cookies.
- **Calidad de Código:** Configuración estricta de **ESLint** y **Prettier** para consistencia automática.

---

## 🛠️ Stack Tecnológico

| Área              | Tecnología                                      | Propósito                                           |
| :---------------- | :---------------------------------------------- | :-------------------------------------------------- |
| **Framework**     | [Next.js](https://nextjs.org/)                  | Framework de React para producción (App Router)     |
| **Lenguaje**      | [TypeScript](https://www.typescriptlang.org/)   | Superset de JavaScript con tipos                    |
| **Estilos**       | [Tailwind CSS](https://tailwindcss.com/)        | Framework de utilidades CSS                         |
| **Componentes**   | [Shadcn UI](https://ui.shadcn.com/)             | Colección de componentes accesibles y reutilizables |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query)    | Gestión de estado asíncrono                         |
| **Cliente HTTP**  | [Axios](https://axios-http.com/)                | Peticiones a la API con interceptores               |
| **Formularios**   | [React Hook Form](https://react-hook-form.com/) | Manejo eficiente de formularios                     |
| **Validación**    | [Zod](https://zod.dev/)                         | Validación de esquemas de datos                     |
| **Iconos**        | [Lucide React](https://lucide.dev/)             | Librería de iconos consistente                      |

---

## 🚀 Cómo Empezar

El frontend corre localmente en tu máquina (para aprovechar la velocidad de Vite/Next), mientras se comunica con el backend que corre en Docker.

### 1. Prerrequisitos

- [Node.js](https://nodejs.org/en) (v20+ recomendado).
- El Backend (`atlabase_api`) debe estar corriendo en Docker (puerto 3001).

### 2. Clonar el Repositorio

```bash
git clone [https://github.com/GerardoVollmer/atlabase-client.git](https://github.com/GerardoVollmer/atlabase-client.git)
cd atlabase-client
```

### 3. Intalar Dependencias

```bash
npm install
```

### 4. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

- La aplicación estará disponible en: http://localhost:3000
- Proxy: Las peticiones a /api/_ son redirigidas automáticamente a http://localhost:3001/api/_ para evitar problemas de CORS durante el desarrollo.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura organizada por Features para mantener la lógica de negocio separada de la UI genérica.

```bash
src/
├── app/                  # Rutas y Páginas (Next.js App Router)
│   ├── (auth)/           # Rutas de autenticación (Login, Register)
│   ├── dashboard/        # Rutas protegidas de la app
│   └── layout.tsx        # Layout raíz con Providers
├── components/           # Componentes Visuales
│   ├── ui/               # Componentes base de Shadcn (Button, Input, etc.)
│   └── layout/           # Componentes estructurales (Sidebar, Navbar)
├── features/             # Lógica de Negocio (Co-locación)
│   ├── auth/             # Feature: Autenticación
│   │   ├── components/   # Formularios específicos (LoginForm)
│   │   └── services/     # Llamadas a la API (auth.service.ts)
│   ├── customers/        # Feature: Clientes
├── lib/                  # Configuraciones (Axios, Utils)
├── providers/            # Contextos Globales (QueryProvider, AuthProvider)
├── hooks/                # Hooks personalizados globales
└── types/                # Definiciones de tipos globales
```

---

## 📜 Scripts Disponibles

| Script            | Acción                                                         |
| :---------------- | :------------------------------------------------------------- |
| **npm run dev**   | Inicia el servidor en modo desarrollo en localhost:3000.       |
| **npm run build** | Compila el código TypeScript a JavaScript en la carpeta /dist. |
| **npm run start** | Ejecuta el código JavaScript compilado (para producción).      |
| **npm run lint**  | Ejecuta ESLint para buscar errores de código.                  |

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
