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
import { nextYear } from 'utils/indexBy';
import initialShareTokensData from 'stubData/initialShareTokens.json';
import { ShareToken } from 'models/ShareToken';

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

const email = 'valid@gmail.com';

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

  it('should throw an error if a bad format of a comment is sent', async () => {
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

  it('should create a comment correctly for an existing thread', async () => {
    const firstThread = initialThreadsData[0]!;

    await request(app)
      .post(`/chart/comment_threads/${firstThread.id}/respond`)
      .send({ comment: newComment })
      .expect(200);

    const response = await request(app)
      .get(`/chart/comment_threads/${firstThread.id}`)
      .expect(200);

    const updatedTread: CommentThreadWithComments = response.body;

    expect(updatedTread.commentsCount).toEqual(firstThread.commentsCount + 1);
    expect(updatedTread.comments.length).toEqual(firstThread.commentsCount + 1);
    expect(updatedTread.comments[updatedTread.comments.length - 1]).toEqual(
      newComment,
    );
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

  it('should throw an error if a bad datapoint is sent', async () => {
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

  it('should return all share tokens', async () => {
    const response = await request(app).get('/share/share_tokens').expect(200);
    const allShareTokens: ShareToken[] = response.body;
    expect(allShareTokens).toEqual(initialShareTokensData);
  });

  it('should create share token correctly for a new email', async () => {
    const email = 'new@gmail.com';
    const expiresAt = nextYear();
    await request(app)
      .post(`/share/share_tokens`)
      .send({ email, expiresAt })
      .expect(200);

    const response = await request(app).get('/share/share_tokens').expect(200);
    const allShareTokens: ShareToken[] = response.body;
    const initialTokenIds = initialShareTokensData.map(({ id }) => id);

    const newShareTokens = allShareTokens.filter(
      ({ id }) => !initialTokenIds.includes(id),
    );
    expect(newShareTokens.length).toEqual(1);

    const newShareToken = newShareTokens[0]!;

    expect(newShareToken.email).toEqual(email);
    expect(new Date(newShareToken.expiresAt)).toEqual(expiresAt);
  });

  it('should throw an error when an expired share token request is sent', async () => {
    await request(app)
      .post(`/share/share_tokens`)
      .send({
        email: 'expired@gmail.com',
        expiresAt: '2023-01-10T00:00:00.000Z',
      })
      .expect(400);
  });

  it('should throw an error when a bad format email is sent', async () => {
    await request(app)
      .post(`/share/share_tokens`)
      .send({
        email: 'expired@gmail',
        expiresAt: nextYear(),
      })
      .expect(400);
  });

  it('should update share token expiry for an existing email', async () => {
    const email = 'updated@gmail.com';
    const expiresAt = nextYear();
    const response = await request(app)
      .post(`/share/share_tokens`)
      .send({ email, expiresAt })
      .expect(200);

    const shareToken: ShareToken = response.body.shareToken;

    const newDate = '2025-01-10T00:00:00.000Z';

    await request(app)
      .post(`/share/share_tokens`)
      .send({ email, expiresAt: newDate })
      .expect(200);

    const updatedResponse = await request(app)
      .get(`/share/share_tokens/${shareToken.id}`)
      .send({ email })
      .expect(200);

    const updatedShareToken: ShareToken = updatedResponse.body.shareToken;

    expect(new Date(updatedShareToken.expiresAt)).toEqual(new Date(newDate));
  });

  it('should get a share token by id', async () => {
    const response = await request(app)
      .get(`/share/share_tokens/${initialShareTokensData[0]!.id}`)
      .expect(200);

    const shareToken: ShareToken = response.body!.shareToken;

    expect(response.body.shareToken).toEqual(shareToken);
  });

  it('get share token should throw not found error if token is invalid', async () => {
    await request(app).get(`/share/share_tokens/bad_token`).expect(404);
  });

  it('should get shared data by token and email', async () => {
    const response = await request(app)
      .get(`/chart/shared/${initialShareTokensData[0]!.id}`)
      .query({ email })
      .expect(200);

    const shareToken: ShareToken = response.body!.shareToken;

    expect(response.body.data).toEqual(data);
    expect(response.body.shareToken).toEqual(shareToken);
  });

  it('chart share should throw a not found error if token is invalid', async () => {
    await request(app)
      .get(`/chart/shared/bad_token`)
      .query({ email })
      .expect(404);
  });

  it('should throw error if token has expired', async () => {
    await request(app)
      .get(`/chart/shared/${initialShareTokensData[1]!.id}`)
      .query({ email: 'expired@gmail.com' })
      .expect(400);
  });

  it('should throw error if email is not a valid email address', async () => {
    await request(app)
      .get(`/chart/shared/${initialShareTokensData[0]!.id}`)
      .send({ email: 'wrong@gmai' })
      .expect(400);
  });

  it('should throw error if email does not match share token email', async () => {
    await request(app)
      .get(`/chart/shared/${initialShareTokensData[0]!.id}`)
      .send({ email: 'wrong@gmail.com' })
      .expect(400);
  });
});
