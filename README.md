# Task Dashboard

Una aplicación web moderna para la gestión de tareas construida con React y Vite, con una interfaz de usuario elegante usando Tailwind CSS.

## 🚀 Características

- Autenticación de usuarios (registro e inicio de sesión)
- Dashboard interactivo para gestión de tareas
- Interfaz responsive y moderna
- Sistema de papelera para tareas eliminadas
- Protección de rutas
- Diseño modular y mantenible

## 💻 Tecnologías Utilizadas

- **React** - Biblioteca para construir interfaces de usuario
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Enrutamiento para React
- **Axios** - Cliente HTTP para realizar peticiones
- **React Icons** - Biblioteca de iconos

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

## ⚙️ Configuración del Entorno

El proyecto utiliza variables de entorno para la configuración. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```properties
VITE_API_BASE_URL=
VITE_ENV=production
```

### Variables de Entorno
- `VITE_API_BASE_URL`: URL base de la API para las peticiones del backend
- `VITE_ENV`: Entorno de ejecución (development/production)

> Nota: Para desarrollo local, puedes crear un archivo `.env.local` con la configuración específica de tu entorno.

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/sudorios/task-dashboard.git
cd task-dashboard
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos
├── components/     # Componentes reutilizables
│   ├── ConfirmModal.jsx
│   ├── DashboardLayout.jsx
│   ├── DashboardSidebar.jsx
│   ├── ProtectedRoute.jsx
│   └── TaskModal.jsx
├── context/       # Contextos de React
│   └── authContext.jsx
├── pages/         # Páginas de la aplicación
│   ├── login.jsx
│   ├── register.jsx
│   └── dashboard/
│       ├── task.jsx
│       └── taskTrash.jsx
├── services/      # Servicios y APIs
│   ├── api.js
│   ├── auth.js
│   └── task.js
└── App.jsx        # Componente principal
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Preview de la versión de producción
- `npm run lint` - Ejecuta el linter

## 🤝 Contribuir

Las contribuciones son siempre bienvenidas. Por favor, lee nuestras guías de contribución antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo LICENSE.md para más detalles.

## ✨ Autor

- **sudorios**

---
¿Necesitas ayuda? Abre un issue en el repositorio.
