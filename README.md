##Micro servicio con Traccar 
Este proyecto es una API REST construida con Node.js y Express, que permite autenticar usuarios mediante JWT y gestionar ubicaciones de dispositivos usando la API de Traccar. Además, protege rutas, aplica seguridad básica (Helmet, CORS, rate limit) y sigue buenas prácticas de estructura de código.

---

## 🚀 Características

- Autenticación segura con JWT
- Protección de rutas mediante middleware
- Comunicación con Traccar para obtener y registrar ubicaciones
- Seguridad con `helmet`, `cors` y `express-rate-limit`
- Arquitectura modular con separación de controladores, servicios y middleware

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **JWT (`jsonwebtoken`)**
- **bcryptjs** (para cifrado de contraseñas)
- **Traccar API**
- **CORS + Helmet**
- **Rate Limit**
