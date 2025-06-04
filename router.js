import { Router } from 'express';

import getFeedController from './src/Presentation/Controllers/get-feed-controller.js';

const router = new Router();

router.get('/api', getFeedController);

export default router;