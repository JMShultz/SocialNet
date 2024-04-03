const router = require('express').Router();
const ThoughtRoutes = require('./thoughtroutes');
const userRoutes = require('./userroutes');

router.use('/thoughts', ThoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
