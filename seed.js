const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dish = require('./models/Dish');

dotenv.config();

const dishes = [
  {
    name: 'Ensalada Cesar',
    description: 'Lechuga fresca con pollo, parmesano y croutones.',
    ingredients: ['lechuga', 'pollo', 'parmesano', 'croutons', 'salsa ranch'],
    price: 8.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 350,
    image: 'https://via.placeholder.com/400x300?text=Ensalada+Cesar',
  },
  {
    name: 'Hamburguesa clasica',
    description: 'Pan, carne de res, queso, lechuga, tomate, cebolla y salsa.',
    ingredients: ['pan', 'carne de res', 'queso', 'lechuga', 'tomate', 'cebolla', 'salsa'],
    price: 12.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 850,
    image: 'https://via.placeholder.com/400x300?text=Hamburguesa',
  },
  {
    name: 'Pizza vegetariana',
    description: 'Masa, salsa de tomate, mozzarella y vegetales.',
    ingredients: ['masa', 'salsa de tomate', 'mozzarella', 'pimientos', 'champuñones', 'cebolla'],
    price: 14.99,
    celiacFriendly: false,
    vegan: true,
    diabeticFriendly: false,
    calories: 1200,
    image: 'https://via.placeholder.com/400x300?text=Pizza',
  },
  {
    name: 'Tacos al pastor',
    description: 'Tortilla, pastor, pina, cebolla y cilantro.',
    ingredients: ['tortilla', 'carne de cerdo', 'pina', 'cebolla', 'cilantro'],
    price: 11.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 650,
    image: 'https://via.placeholder.com/400x300?text=Tacos',
  },
  {
    name: 'Sopa de lima',
    description: 'Pollo, lima, tortilla y hierbabuena.',
    ingredients: ['pollo', 'lima', 'tortilla', 'hierbabuena', 'caldo'],
    price: 7.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 280,
    image: 'https://via.placeholder.com/400x300?text=Sopa+de+Lima',
  },
  {
    name: 'Bowl de quinoa vegana',
    description: 'Quinoa, vegetales mixtos, garbanzos y tahini.',
    ingredients: ['quinoa', 'vegetales', 'garbanzos', 'tahini', 'pepino'],
    price: 13.99,
    celiacFriendly: true,
    vegan: true,
    diabeticFriendly: true,
    calories: 450,
    image: 'https://via.placeholder.com/400x300?text=Quinoa',
  },
  {
    name: 'Pescado al horno',
    description: 'Pescado con limon, hierbas y aceite de oliva.',
    ingredients: ['pescado', 'limon', 'hierbas', 'aceite de oliva'],
    price: 16.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 420,
    image: 'https://via.placeholder.com/400x300?text=Pescado',
  },
  {
    name: 'Lasagna vegetariana',
    description: 'Lamina, ricota, vegetales y salsa.',
    ingredients: ['lamina', 'ricota', 'vegetales', 'salsa de tomate'],
    price: 13.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 780,
    image: 'https://via.placeholder.com/400x300?text=Lasagna',
  },
  {
    name: 'Bowl de salmon',
    description: 'Salmon, arroz, aguacate, pepino y soja.',
    ingredients: ['salmon', 'arroz', 'aguacate', 'pepino', 'salsa de soja'],
    price: 15.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 520,
    image: 'https://via.placeholder.com/400x300?text=Salmon',
  },
  {
    name: 'Chilaquiles verdes',
    description: 'Tortilla, salsa verde, queso, crema y cebolla.',
    ingredients: ['tortilla', 'salsa verde', 'queso', 'crema', 'cebolla'],
    price: 10.99,
    celiacFriendly: false,
    vegan: false,
    diabeticFriendly: false,
    calories: 600,
    image: 'https://via.placeholder.com/400x300?text=Chilaquiles',
  },
];

const seedDB = async () => {
  await Dish.deleteMany({});
  await Dish.insertMany(dishes);
  console.log('Seed completado: 10 platos insertados');
  process.exit(0);
};

mongoose.connect(process.env.MONGO_URI).then(() => seedDB());
