import initialThreadsData from 'stubData/initialComments.json';
import { parseItems } from 'utils/parseItems';
import { CommentThread, CommentThreadWithComments } from 'models/CommentThread';
import { Comment } from 'models/Comment';
import { indexBy } from 'utils/indexBy';
import { ChartDataPoint } from 'models/ChartDataPoint';
import { v4 } from 'uuid';
import { BadRequestError, InternalError } from 'utils/errors';

export const initialThreads = parseItems(
  CommentThreadWithComments,
  initialThreadsData,
);

const threads = indexBy((thread) => thread.id, initialThreads);

export const getAll = (): CommentThread[] => {
  return Object.values(threads).map(({ comments, ...thread }) => thread);
};

export const get = (id: string): CommentThreadWithComments | null => {
  return threads[id] ?? null;
};

export const getByDataPoint = (
  dataPoint: ChartDataPoint,
): CommentThreadWithComments | null => {
  return (
    Object.values(threads).find(
      (thread) => thread.chartDataPoint === dataPoint,
    ) ?? null
  );
};

export const createThread = (
  dataPoint: ChartDataPoint,
  firstComment: Comment,
): CommentThreadWithComments => {
  const id = v4();
  if (threads[id])
    throw new InternalError('Thread with this id already exists');

  const thread: CommentThreadWithComments = {
    id,
    chartDataPoint: dataPoint,
    commentsCount: 1,
    comments: [firstComment],
  };

  threads[id] = thread;

  return thread;
};

export const addComment = (
  id: string,
  comment: Comment,
): CommentThreadWithComments => {
  const thread = threads[id];

  if (!thread) throw new BadRequestError('Thread not found');

  thread.comments = [...thread.comments, comment];
  thread.commentsCount = thread.comments.length;

  return thread;
};
