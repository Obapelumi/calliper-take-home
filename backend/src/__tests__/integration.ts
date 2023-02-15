import data from 'stubData/chartData.json';
import initialThreadsData from 'stubData/initialComments.json';
import request from 'supertest';
import { app } from '../index';
import {
  CommentThread,
  CommentThreadWithComments,
} from '../models/CommentThread';
import { Comment } from '../models/Comment';
import { v4 } from 'uuid';

const newComment: Comment = {
  userName: 'Tony',
  text: 'Best fries are in Belgium',
};

const createThreadRequest = {
  comment: newComment,
  dataPoint: {
    feature: 'fries',
    country: 'BE',
  },
};

describe('Chart App', () => {
  it('should return correct chart data', async () => {
    const response = await request(app).get('/chart/data').expect(200);

    expect(response.body).toEqual(data);
  });

  it('should return correct comment threads', async () => {
    const response = await request(app)
      .get('/chart/comment_threads')
      .expect(200);

    (response.body as CommentThread[]).forEach((thread, index) => {
      expect(initialThreadsData[index]!.id).toEqual(thread.id);
      expect(initialThreadsData[index]!.commentsCount).toEqual(
        thread.commentsCount,
      );
    });
  });

  it('should return correct comments for a thread', async () => {
    const firstThread = initialThreadsData[0]!;
    const response = await request(app)
      .get(`/chart/comment_threads/${firstThread.id}`)
      .expect(200);

    expect(response.body).toEqual(firstThread);
  });

  it('should throw and error if a bad format of a comment is sent', async () => {
    const firstThread = initialThreadsData[0]!;

    await request(app)
      .post(`/chart/comment_threads/${firstThread.id}/respond`)
      .send({ comment: { userName: 'Tony' } })
      .expect(400);
  });

  it('should throw an error if a bad thread id is sent', async () => {
    await request(app)
      .post(`/chart/comment_threads/${v4()}/respond`)
      .send({ comment: newComment })
      .expect(400);
  });

  it('should create new thread correctly', async () => {
    await request(app)
      .post(`/chart/comment_threads`)
      .send(createThreadRequest)
      .expect(200);

    const response = await request(app)
      .get('/chart/comment_threads')
      .expect(200);

    const newThreads = (response.body as CommentThread[]).filter(({ id }) => {
      return !initialThreadsData.map(({ id }) => id).includes(id);
    });
    expect(newThreads.length).toEqual(1);

    const getThreadResponse = await request(app)
      .get(`/chart/comment_threads/${newThreads[0]!.id}`)
      .expect(200);

    const newThread = getThreadResponse.body as CommentThreadWithComments;

    expect(newThread.commentsCount).toEqual(1);
    expect(newThread.comments.length).toEqual(1);
    expect(newThread.comments[0]).toEqual(newComment);
    expect(newThread.chartDataPoint).toEqual(createThreadRequest.dataPoint);
  });

  it('should throw an error if a bad adatapoint is sent', async () => {
    await request(app)
      .post(`/chart/comment_threads`)
      .send({
        ...createThreadRequest,
        dataPoint: {
          ...createThreadRequest.dataPoint,
          feature: 'cola',
        },
      })
      .expect(400);
  });

  it('should throw an error if a bad comment is sent', async () => {
    await request(app)
      .post(`/chart/comment_threads`)
      .send({
        ...createThreadRequest,
        comment: {
          userName: 'Tony',
        },
      })
      .expect(400);
  });

  it('should get a share token', async () => {
    const response = await request(app).get(`/share`).expect(200);

    expect(response.body).toEqual({ token: expect.any(String) });
  });

  it('should get shared data by token', async () => {
    const tokenResponse = await request(app).get(`/share`).expect(200);

    const response = await request(app)
      .get(`/chart/shared/${tokenResponse.body!.token}`)
      .expect(200);

    expect(response.body).toEqual(data);
  });

  it('should throw error if token is invalid', async () => {
    await request(app).get(`/chart/shared/bad_token`).expect(404);
  });
});
