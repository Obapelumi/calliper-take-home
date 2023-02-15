import initialThreadsData from 'stubData/initialComments.json';

import {
  createThread,
  getAllCommentThreads,
  getCommentThread,
  respondToThread,
} from './commentsService';
import * as commentThreadsRepository from 'repositories/commentThreadsRepository';
import { parseItems } from 'utils/parseItems';
import { CommentThreadWithComments } from 'models/CommentThread';
import { BadRequestError } from 'utils/errors';
import { Comment } from 'models/Comment';
import { ChartDataPoint } from 'models/ChartDataPoint';
import { v4 } from 'uuid';

export const initialThreads = parseItems(
  CommentThreadWithComments,
  initialThreadsData,
);

const comment: Comment = {
  userName: 'Josh',
  text: 'Testing',
};
const dataPoint: ChartDataPoint = {
  country: 'ES',
  feature: 'hotdog',
};

jest.mock('repositories/commentThreadsRepository', () => ({
  getAll: jest.fn(() => initialThreads),
  get: jest.fn(() => initialThreads[0]!),
  getByDataPoint: jest.fn(() => initialThreads[0]!),
  createThread: jest.fn(() => ({
    id: v4(),
    chartDataPoint: dataPoint,
    commentsCount: 1,
    comments: [comment],
  })),
  addComment: jest.fn(() => ({
    id: v4(),
    chartDataPoint: dataPoint,
    commentsCount: 2,
    comments: [comment, comment],
  })),
}));

describe('CommentsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllCommentThreads should call thread repository getAll', function () {
    const result = getAllCommentThreads();
    expect(commentThreadsRepository.getAll).toBeCalledTimes(1);
    expect(result).toEqual(initialThreads);
  });

  it('getCommentThread should call thread repository get', function () {
    const thread = initialThreads[0]!;
    const result = getCommentThread(thread.id);
    expect(commentThreadsRepository.get).toBeCalledTimes(1);
    expect(result).toEqual(thread);
  });

  it('getCommentThread should throw 400 error if thread is not found', function () {
    (commentThreadsRepository.get as jest.Mock).mockReturnValueOnce(null);
    const thread = initialThreads[0]!;
    expect(() => getCommentThread(thread.id)).toThrowError(BadRequestError);
  });

  it('createThread should call thread repository createThread if thread is new', function () {
    (commentThreadsRepository.getByDataPoint as jest.Mock).mockReturnValueOnce(
      null,
    );
    const result = createThread(dataPoint, comment);

    expect(commentThreadsRepository.getByDataPoint).toBeCalledTimes(1);
    expect(commentThreadsRepository.createThread).toBeCalledTimes(1);

    expect(result.commentsCount).toEqual(1);
    expect(result.comments).toEqual([comment]);
    expect(result.chartDataPoint).toEqual(dataPoint);
  });

  it('createThread should add comments if thread is exists', function () {
    const result = createThread(dataPoint, comment);

    expect(commentThreadsRepository.getByDataPoint).toBeCalledTimes(1);
    expect(commentThreadsRepository.addComment).toBeCalledTimes(1);
    expect(commentThreadsRepository.addComment).toBeCalledWith(
      initialThreads[0]!.id,
      comment,
    );

    expect(result.commentsCount).toEqual(2);
    expect(result.comments).toEqual([comment, comment]);
    expect(result.chartDataPoint).toEqual(dataPoint);
  });

  it('respondToThread should add comment', function () {
    const result = respondToThread(initialThreads[0]!.id, comment);

    expect(commentThreadsRepository.addComment).toBeCalledTimes(1);
    expect(commentThreadsRepository.addComment).toBeCalledWith(
      initialThreads[0]!.id,
      comment,
    );

    expect(result.commentsCount).toEqual(2);
    expect(result.comments).toEqual([comment, comment]);
    expect(result.chartDataPoint).toEqual(dataPoint);
  });
});
