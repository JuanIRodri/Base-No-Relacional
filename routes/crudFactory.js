const createCrudRouter = ({ model, filters = [], label = 'Resource' }) => {
  const router = require('express').Router();

  router.get('/', async (req, res, next) => {
    try {
      const filter = {};

      for (const key of filters) {
        const value = req.query[key];
        if (value === undefined) continue;
        if (key === 'name' || key === 'title') {
          filter[key] = { $regex: value, $options: 'i' };
        } else if (key === 'completed' || key === 'vegan' || key === 'celiacFriendly' || key === 'diabeticFriendly') {
          filter[key] = value === 'true';
        } else {
          filter[key] = value;
        }
      }

      const items = await model.find(filter);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const item = await model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: `${label} not found` });
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const item = new model(req.body);
      const saved = await item.save();
      res.status(201).json(saved);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const item = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: `${label} not found` });
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const item = await model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: `${label} not found` });
      res.json({ message: `${label} deleted` });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = createCrudRouter;
