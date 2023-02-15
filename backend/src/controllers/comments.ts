import { z } from 'zod';
import { Request, Response } from 'express';
import * as commentService from 'services/comments/commentsService';
import { parseItemStrict } from 'utils/parseItems';
import { ChartDataPoint } from 'models/ChartDataPoint';
import { Comment } from 'models/Comment';

const CreateThreadRequest = z.object({
  comment: Comment,
  dataPoint: ChartDataPoint,
});

const RespondToThreadRequest = z.object({
  comment: Comment,
});

export const getAllCommentThreads = (_: Request, res: Response) => {
  const threads = commentService.getAllCommentThreads();
  res.status(200).send(threads);
};

export const getCommentThread = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const thread = commentService.getCommentThread(req.params.id);
  res.status(200).send(thread);
};

export const createCommentThread = (req: Request, res: Response) => {
  const { comment, dataPoint } = parseItemStrict(CreateThreadRequest, req.body);

  const thread = commentService.createThread(dataPoint, comment);
  res.status(200).send(thread);
};

export const respondToCommentThread = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { comment } = parseItemStrict(RespondToThreadRequest, req.body);

  const thread = commentService.respondToThread(req.params.id, comment);
  res.status(200).send(thread);
};
