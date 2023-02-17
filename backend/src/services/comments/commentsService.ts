import * as commentThreadsRepository from 'repositories/commentThreadsRepository';
import { ChartDataPoint } from 'models/ChartDataPoint';
import { Comment } from 'models/Comment';
import { BadRequestError } from 'utils/errors';

export const getAllCommentThreads = () => {
  return commentThreadsRepository.getAll();
};

export const getCommentThread = (id: string) => {
  const thread = commentThreadsRepository.get(id);

  if (!thread) throw new BadRequestError(`Thread with id ${id} not found`);

  return thread;
};

export const createThread = (dataPoint: ChartDataPoint, comment: Comment) => {
  const thread = commentThreadsRepository.getByDataPoint(dataPoint);

  if (!thread) {
    return commentThreadsRepository.createThread(dataPoint, comment);
  }
  return commentThreadsRepository.addComment(thread.id, comment);
};

export const respondToThread = (id: string, comment: Comment) => {
  return commentThreadsRepository.addComment(id, comment);
};
