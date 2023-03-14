import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('BabylonJS NullEngine Service');
});

export default router;