# Proyecto Supabase

Aplicación web desarrollada con **Next.js**, **TypeScript** y **Supabase**, enfocada en la implementación de un sistema de autenticación seguro utilizando sesiones mediante cookies, Server Actions y protección de rutas.

El proyecto implementa registro de usuarios, inicio y cierre de sesión, recuperación y actualización de contraseña, además de un dashboard protegido para usuarios autenticados.

---

## Tecnologías utilizadas

* **Next.js 16+**
* **React**
* **TypeScript**
* **Supabase**
* **Supabase Auth**
* **@supabase/ssr**
* **Tailwind CSS**
* **Server Actions**
* **Next.js Proxy**
* **PKCE**

---

## Funcionalidades

### Autenticación

* Registro de nuevos usuarios.
* Inicio de sesión mediante correo y contraseña.
* Cierre de sesión.
* Confirmación de correo electrónico.
* Recuperación de contraseña.
* Actualización de contraseña.
* Manejo de errores de autenticación.
* Validación de datos del lado cliente.
* Validación adicional del lado servidor.

### Protección de rutas

El proyecto utiliza un Proxy de Next.js para controlar el acceso a las rutas.

Las rutas protegidas requieren una sesión válida.

Si un usuario no autenticado intenta acceder al dashboard:

```text
/dashboard
```

es redirigido automáticamente a:

```text
/login
```

De igual forma, un usuario que ya tiene una sesión activa y visita:

```text
/login
/register
```

es redirigido al dashboard.

---

## Seguridad

El proyecto utiliza `@supabase/ssr` para manejar la autenticación mediante cookies y mantener la sesión entre las diferentes partes de la aplicación.

Se aplican las siguientes prácticas:

* Separación entre cliente Supabase para navegador y servidor.
* Cliente Supabase específico para Server Components y Server Actions.
* Cliente Supabase específico para Client Components.
* Manejo de sesión mediante cookies.
* No se almacenan manualmente tokens de autenticación en `localStorage`.
* Validación de entradas en cliente y servidor.
* Errores de autenticación traducidos a mensajes seguros para el usuario.
* Variables de configuración almacenadas mediante variables de entorno.
* Flujo de autenticación mediante PKCE.
* Protección de rutas privadas mediante Proxy.

---

## Flujo de autenticación

### Registro

```text
Usuario
   ↓
/register
   ↓
Server Action
   ↓
Validación del servidor
   ↓
Supabase Auth
   ↓
Confirmación de correo
   ↓
/login
   ↓
/dashboard
```

### Inicio de sesión

```text
/login
   ↓
Server Action
   ↓
Validación
   ↓
Supabase Auth
   ↓
Sesión
   ↓
/dashboard
```

### Recuperación de contraseña

```text
/forgot-password
   ↓
Server Action
   ↓
Supabase Auth
   ↓
Correo de recuperación
   ↓
/auth/callback
   ↓
/update-password
   ↓
/login
```

---

## Estructura del proyecto

Una parte importante de la estructura es:

```text
app/
├── actions/
│   └── auth.ts
│
├── auth/
│   └── callback/
│       └── route.ts
│
├── dashboard/
│   ├── LogoutButton.tsx
│   └── page.tsx
│
├── forgot-password/
│   └── page.tsx
│
├── login/
│   └── page.tsx
│
├── register/
│   └── page.tsx
│
└── update-password/
    └── page.tsx

lib/
└── supabase/
    ├── client.ts
    └── server.ts

proxy.ts
```

### Responsabilidad de cada archivo

#### `lib/supabase/client.ts`

Crea el cliente de Supabase utilizado desde componentes del navegador.

Utiliza:

```ts
createBrowserClient()
```

y configura el flujo de autenticación PKCE.

#### `lib/supabase/server.ts`

Crea el cliente de Supabase utilizado en el servidor.

Utiliza:

```ts
createServerClient()
```

y obtiene y actualiza las cookies mediante `next/headers`.

#### `app/actions/auth.ts`

Contiene las Server Actions relacionadas con autenticación:

* `signIn`
* `signUp`
* `signOut`
* `resetPassword`

También contiene la validación de credenciales y la transformación de errores de Supabase en mensajes comprensibles.

#### `proxy.ts`

Comprueba la sesión del usuario y controla el acceso a las rutas protegidas.

También participa en la actualización de la sesión cuando es necesario.

#### `app/auth/callback/route.ts`

Gestiona el callback de autenticación enviado por Supabase y permite completar correctamente el flujo PKCE de recuperación de contraseña.

#### `app/dashboard/`

Contiene la zona privada de la aplicación.

El dashboard verifica nuevamente el usuario autenticado desde el servidor antes de mostrar información privada.

---

## Variables de entorno

Crea un archivo:

```text
.env.local
```

con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=TU_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=TU_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Los valores deben obtenerse desde la configuración de tu proyecto de Supabase.

### Importante

No publiques `.env.local` en GitHub.

El archivo debe permanecer incluido en `.gitignore`.

---

## Instalación

Clona el repositorio:

```bash
git clone TU_REPOSITORIO
```

Entra en la carpeta:

```bash
cd TU_PROYECTO
```

Instala las dependencias:

```bash
npm install
```

Configura las variables de entorno:

```text
.env.local
```

Finalmente inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:3000
```

---

## Configuración de Supabase

Para utilizar correctamente la autenticación, el proyecto debe tener configurado Supabase Auth.

También es necesario configurar las URLs utilizadas por el flujo de autenticación.

En desarrollo, la URL principal utilizada por la aplicación es:

```text
http://localhost:3000
```

El callback de autenticación utiliza:

```text
/auth/callback
```

y el flujo de recuperación continúa hacia:

```text
/update-password
```

---

## Rutas principales

| Ruta               | Acceso       | Descripción               |
| ------------------ | ------------ | ------------------------- |
| `/login`           | Público      | Inicio de sesión          |
| `/register`        | Público      | Registro                  |
| `/forgot-password` | Público      | Solicitud de recuperación |
| `/auth/callback`   | Sistema      | Callback de Supabase      |
| `/update-password` | Recuperación | Cambio de contraseña      |
| `/dashboard`       | Privado      | Dashboard del usuario     |

---

## Validación

El proyecto realiza validaciones tanto en el navegador como en el servidor.

### Cliente

Las interfaces comprueban datos básicos antes de enviar los formularios, proporcionando una respuesta inmediata al usuario.

### Servidor

Las Server Actions vuelven a validar los datos recibidos.

Esto evita depender únicamente de la validación realizada en el navegador.

Entre las validaciones implementadas se encuentran:

* Correo obligatorio.
* Formato válido del correo.
* Contraseña obligatoria.
* Contraseña de mínimo 6 caracteres durante el registro.

---

## Manejo de errores

Los errores provenientes de Supabase no se muestran directamente al usuario cuando contienen información técnica innecesaria.

En su lugar, se convierten en mensajes comprensibles, por ejemplo:

```text
El correo o la contraseña son incorrectos.
```

o:

```text
Debes confirmar tu correo electrónico antes de iniciar sesión.
```

La aplicación también utiliza estados de carga para evitar múltiples envíos accidentales de los formularios.

---

## Dashboard

El dashboard es una ruta protegida que obtiene el usuario autenticado desde el servidor.

Muestra información relacionada con la sesión, incluyendo:

* Correo electrónico.
* Estado de la cuenta.
* Información del sistema de autenticación.
* Opciones para cerrar sesión.

Los usuarios no autenticados son redirigidos automáticamente al login.

---

## Arquitectura de autenticación

La aplicación separa las responsabilidades de autenticación entre navegador, servidor y Proxy:

```text
                    Supabase Auth
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
       Browser Client  Server Client  Proxy
             │            │            │
             ▼            ▼            ▼
       Client Components  Server       Sesión
                          Actions       / Rutas
             │            │            │
             └────────────┼────────────┘
                          ▼
                       Cookies
```

Esta separación permite mantener una arquitectura compatible con el modelo de Server Components de Next.js y con el manejo de sesiones de Supabase SSR.

---

## Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Para generar una versión de producción:

```bash
npm run build
```

Para iniciar la aplicación de producción:

```bash
npm start
```

---

## Estado del proyecto

El proyecto implementa actualmente el sistema principal de autenticación y protección de rutas utilizando Next.js y Supabase.

Antes de considerar el proyecto completamente finalizado para entrega, se deben verificar los requisitos específicos de despliegue, configuración de producción, repositorio público y cualquier requisito adicional relacionado con Supabase Database indicado por la actividad.

---
