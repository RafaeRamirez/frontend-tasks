# Frontend Tasks

Aplicación web desarrollada con Angular para gestionar tareas mediante una API REST. Esta interfaz permite crear, listar, editar, completar y eliminar tareas consumiendo un backend disponible en el puerto 3000.

## Requisitos

- Node.js 20 o superior
- npm
- Backend corriendo en http://localhost:3000

## Instalación

Desde la raíz del proyecto ejecuta:

```bash
npm install
```

## Ejecución

Inicia la aplicación en modo desarrollo:

```bash
npm start
```

Luego abre la siguiente URL en tu navegador:

```text
http://localhost:4200
```

## Configuración del backend

La URL base de la API está definida en los archivos de entorno:

- [src/environments/environment.ts](src/environments/environment.ts)
- [src/environments/environment.production.ts](src/environments/environment.production.ts)

Por defecto, la configuración es:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

Si tu backend está en otro host o puerto, actualiza esa URL.

## Funcionalidades

- Listar todas las tareas
- Crear nuevas tareas desde un formulario
- Editar tareas existentes
- Marcar tareas como completadas
- Eliminar tareas
- Mostrar estados de carga y errores
- Validar que el título no quede vacío

## Estructura del proyecto

```text
src/
  app/
    components/
      task-dashboard/
      task-form/
    models/
    services/
    environments/
```

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test -- --watch=false
```

## Compilación para producción

```bash
npm run build
```

## Documentación adicional

- Consulta [AWS.md](AWS.md) para las respuestas sobre AWS y el uso de inteligencia artificial.
