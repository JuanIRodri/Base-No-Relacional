const router = require('express').Router();
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET task by id
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// POST create task
router.post(
  '/',
  [
    body('title')
      .isString()
      .trim()
      .notEmpty()
      .withMessage('El título es obligatorio')
      .max(100)
      .required(),
    body('description').optional().isString().trim().max(500),
    body('completed').optional().isBoolean(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const task = new Task(req.body);
      const savedTask = await task.save();
      res.status(201).json(savedTask);
    } catch (error) {
      next(error);
    }
  }
);

// PUT update task
router.put(
  '/:id',
  [
    body('title').optional().isString().trim().max(100),
    body('description').optional().isString().trim().max(500),
    body('completed').optional().isBoolean(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
