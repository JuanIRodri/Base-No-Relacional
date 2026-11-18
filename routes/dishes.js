const createCrudRouter = require('./crudFactory');
const Dish = require('../models/Dish');

const router = createCrudRouter({
  model: Dish,
  filters: ['vegan', 'celiacFriendly', 'diabeticFriendly', 'name'],
  label: 'Dish',
});

module.exports = router;
