## Microservicio con Traccar 
Este proyecto es una API REST construida con Node.js y Express, que permite autenticar usuarios mediante JWT y gestionar ubicaciones de dispositivos usando la API de Traccar.

---

##  Características

- Autenticación segura con JWT
- Protección de rutas mediante middleware
- Comunicación con Traccar para obtener y registrar dispositivos y ubicación
- Arquitectura modular con separación de controladores, servicios , middleware y routes

---
## Enpoints

| Método | Ruta               | Descripción                                | 
|--------|--------------------|--------------------------------------------|
| POST   | /api/auth/login    | Permite iniciar sesión y devuelve un token |
| GET    | /api/users/        | Obtener todos los usuarios registrados     |
| POST   | /api/users/add     | Registrar un usuario                       |
| GET    | /api/location/     | Obtener todas las ubicaciones              |
| GET    | /api/location/:id  | Ubicación por ID de dispositivo            |
| POST   | /api/location/add  | Registrar nuevo dispositivo                |

