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
# Sembrar datos iniciales (10 platos)
node seed.js

# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 📁 Estructura del proyecto

```
├── index.js              # App de Express, conexión a MongoDB y puesta en escucha
├── models/
│   └── Dish.js           # Modelo Dish (platos del restaurante)
├── routes/
│   ├── crudFactory.js    # Factory CRUD reutilizable
│   └── dishes.js         # CRUD de dishes (usa factory)
├── middleware/
│   └── errorHandler.js   # Middleware de manejo de errores
├── seed.js               # Seed de datos (10 platos)
├── test.http             # Sentencias para probar los endpoints
├── .env                  # Variables de entorno
├── .gitignore
└── package.json
```

## 🔌 Endpoints de la API

### Platos del restaurante — `/api/dishes`

Base URL: `http://localhost:3000/api/dishes`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/dishes` | Obtener todos los platos (filtros: `?vegan`, `?celiacFriendly`, `?diabeticFriendly`, `?name`) |
| GET | `/api/dishes/:id` | Obtener un plato por su ID |
| POST | `/api/dishes` | Crear un nuevo plato |
| PUT | `/api/dishes/:id` | Actualizar un plato |
| DELETE | `/api/dishes/:id` | Eliminar un plato |

## 🗄️ Modelo de datos (Dish)

```js
const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 1000 },
  ingredients: [{ type: String, trim: true }],
  price: { type: Number, required: true, min: 0 },
  celiacFriendly: { type: Boolean, default: false },
  vegan: { type: Boolean, default: false },
  diabeticFriendly: { type: Boolean, default: false },
  calories: { type: Number, default: 0, min: 0 },
  image: { type: String, default: '' },
}, { timestamps: true });
```

## ✅ Validaciones (express-validator)

- POST: `name` obligatorio, máximo 100 caracteres; `price` obligatorio numérico mayor o igual a 0
- `description`: opcional, máximo 1000 caracteres
- `ingredients`: opcional, array de strings
- `celiacFriendly`, `vegan`, `diabeticFriendly`: opcionales, booleanos
- `calories`: opcional, entero mayor o igual a 0
- `image`: opcional, string

## ✨ Funcionalidades de Mongoose

- Esquemas con validaciones (`required`, `trim`, `default`, `min`, `maxlength`)
- Timestamps automáticos (`createdAt`, `updatedAt`)
- Modelos reutilizables para cada colección
- `findByIdAndUpdate` con `runValidators`

## 📌 Notas

- Para crear nuevos modelos, duplica `models/Dish.js` y ajusta el schema, y registra su router en `index.js`.
- Si usas **MongoDB Atlas**, reemplaza `MONGO_URI` por la cadena de conexión segura.

## 🧪 Pruebas

- Endpoints documentados en `test.http`.
- Seed de datos en `seed.js` (10 platos).
- Las pruebas se realizan únicamente desde el backend (API REST).
