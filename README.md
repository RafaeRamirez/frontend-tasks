# Frontend Tasks

Aplicación web desarrollada con Angular para administrar tareas mediante una API REST.

## Requisitos

- Node.js 20 o superior.
- npm.
- Backend Tasks ejecutándose localmente.

## Instalación

Desde la carpeta del frontend:

```bash
npm install
```

## Ejecución

Inicia el servidor de desarrollo:

```bash
npm start
```

Abre `http://localhost:4200/` en el navegador.

## Configuración de la API

La URL del backend para desarrollo está en `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

Para producción, configura la URL pública del backend en
`src/environments/environment.production.ts`. Angular utiliza ese archivo al ejecutar:

```bash
npm run build
```

## Conexión con el backend

1. Inicia el backend en `http://localhost:3000`.
2. Inicia el frontend con `npm start`.
3. `TaskService` consumirá los endpoints de `http://localhost:3000/api/tasks`.

Si el backend utiliza otro host o puerto, cambia `apiUrl` en el ambiente correspondiente.
El backend también debe permitir mediante CORS el origen del frontend.

## Funcionalidades

- Listar todas las tareas.
- Crear tareas con validación de título.
- Editar tareas existentes.
- Marcar tareas como completadas.
- Eliminar tareas con confirmación.
- Mostrar estados de carga y errores de comunicación.
- Adaptar la interfaz a dispositivos móviles.

## Pruebas

Ejecuta las pruebas unitarias:

```bash
npm test -- --watch=false
```

## Compilación

Genera la versión de producción:

```bash
npm run build
```
