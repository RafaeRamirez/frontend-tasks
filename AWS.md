# AWS y uso de IA

## AWS: preguntas básicas

1. ¿Dónde desplegarías una aplicación Angular?
   - En Amazon S3 estático o en AWS Amplify para una experiencia más cómoda de despliegue continuo.

2. ¿Dónde desplegarías una API Node.js?
   - En Amazon EC2, AWS Elastic Beanstalk o AWS App Runner, según el nivel de administración requerido.

3. ¿Qué servicio utilizarías para almacenar archivos?
   - Amazon S3.

4. ¿Qué es Amazon S3?
   - Es un servicio de almacenamiento de objetos escalable, duradero y de bajo costo para archivos, imágenes, backups y sitios estáticos.

5. ¿Qué es Amazon EC2?
   - Es un servicio de computación en la nube que permite ejecutar máquinas virtuales bajo demanda.

6. ¿Cómo protegerías las variables de entorno en AWS?
   - Usando AWS Systems Manager Parameter Store o AWS Secrets Manager, y evitando exponerlas en el código fuente o en logs.

## Uso de inteligencia artificial

- Herramienta utilizada: GitHub Copilot.
- Cómo ayudó: generó estructura inicial, sugirió buenas prácticas, aceleró la integración entre Angular y Express y ayudó a revisar errores de código.
- Dos prompts utilizados:
  1. "Crea una API REST en Node.js y Express con CRUD para tareas, usando CORS y variables de entorno."
  2. "Ayúdame a conectar un componente Angular con un backend REST y a manejar estados de carga y errores."
- Cómo verifiqué que el código generado fuera correcto:
  - Revisé la lógica línea por línea.
  - Probé la integración con el backend.
  - Compilé la aplicación Angular y corregí los problemas que aparecieron.
