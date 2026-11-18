const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tasksRouter = require('./routes/tasks');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/tasks', tasksRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

const start = async () => {
  await connectDB();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
};

start();

module.exports = app;
