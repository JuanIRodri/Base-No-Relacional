# No Relacional - MongoDB + Mongoose

Base de datos No Relacional construida con **MongoDB** y **Mongoose** (ODM).

## 📋 Requisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [MongoDB](https://www.mongodb.com/) (local o en la nube, ej. MongoDB Atlas)

## 🛠️ Tecnologías

- **MongoDB**: base de datos No Relacional (documentos JSON)
- **Mongoose**: ODM para MongoDB (esquemas, validaciones y modelado)
- **Express**: framework para crear APIs REST
- **express-validator**: validación de datos en las rutas

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
MONGO_URI=mongodb://localhost:27017/mi_base_de_datos
PORT=3000
```

- `MONGO_URI`: cadena de conexión a MongoDB
- `PORT`: puerto del servidor

## 🚀 Uso

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 📁 Estructura del proyecto

```
├── index.js              # App de Express, conexión a MongoDB y puesta en escucha
├── models/
│   └── Task.js           # Definición de esquema (modelo)
├── routes/
│   └── tasks.js          # Rutas CRUD de tasks
├── middleware/
│   └── errorHandler.js   # Middleware de manejo de errores
├── .env                  # Variables de entorno
├── .gitignore
└── package.json
```

## 🔌 Endpoints de la API

Base URL: `http://localhost:3000/api/tasks`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtener todas las tasks (filtros opcionales: `?completed=true|false`, `?title=...`) |
| GET | `/api/tasks/:id` | Obtener una task por su ID |
| POST | `/api/tasks` | Crear una nueva task |
| PUT | `/api/tasks/:id` | Actualizar una task |
| DELETE | `/api/tasks/:id` | Eliminar una task |

## 🗄️ Modelo de datos (Task)

```js
const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  completed:   { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now },
}, { timestamps: true });
```

## ✅ Validaciones (express-validator)

- POST: `title` obligatorio, máximo 100 caracteres
- `description`: opcional, máximo 500 caracteres
- `completed`: opcional, booleano

## ✨ Funcionalidades de Mongoose

- Esquemas con validaciones (`required`, `trim`, `default`, `type`)
- Timestamps automáticos (`createdAt`, `updatedAt`)
- Modelos reutilizables para cada colección

## 📌 Notas

- Para crear nuevos modelos, duplica `models/Task.js` y ajusta el schema, y registra su router en `index.js`.
- Si usas **MongoDB Atlas**, reemplaza `MONGO_URI` por la cadena de conexión segura.

## 🧪 Pruebas

Las pruebas se realizan únicamente desde el backend (API REST).
