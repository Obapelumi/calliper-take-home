import 'express-async-errors';
import express, { json, Router, ErrorRequestHandler } from 'express';
import cors from 'cors';

import { getChartData } from 'controllers/charts';
import {
  createCommentThread,
  getAllCommentThreads,
  getCommentThread,
  respondToCommentThread,
} from 'controllers/comments';
import { getSharedData, getShareToken } from 'controllers/sharing';
import { HttpError } from './utils/errors';

export const app = express();
const router = Router();

router.use(cors());
router.use(json());

router.get('/chart/data', getChartData);

router.get('/chart/comment_threads', getAllCommentThreads);
router.get('/chart/comment_threads/:id', getCommentThread);
router.post('/chart/comment_threads', createCommentThread);
router.post('/chart/comment_threads/:id/respond', respondToCommentThread);

router.get('/share', getShareToken);
router.get('/chart/shared/:token', getSharedData);

const handleErrors: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).send(error.message);
  }
  res.status(500).send(error.message || 'Something went wrong');
  next();
};
router.use(handleErrors);

app.use('/', router);

(async () => {
  await app.listen(8000);
  console.log('Express app is running');
})();
