import { API_URL } from "../constants/api";
import {
  CommentThread,
  CommentThreadWithComments,
} from "../data/models/ChartCommentThread";
import { DataPoint } from "../data/models/ChartData";
import { Comment } from "../data/models/Comment";
import { handleErrors } from "./handleErrors";

export const fetchCommentThreads = async (): Promise<CommentThread[]> => {
  const response = await fetch(`${API_URL}/chart/comment_threads`, {
    headers: { "content-type": "application/json" },
  });
  await handleErrors(response);

  return await response.json();
};

export const fetchCommentThread = async (
  threadId: string
): Promise<CommentThreadWithComments> => {
  const response = await fetch(`${API_URL}/chart/comment_threads/${threadId}`, {
    headers: { "content-type": "application/json" },
  });
  await handleErrors(response);

  return await response.json();
};

export const createCommentThread = async (
  comment: Comment,
  dataPoint: DataPoint
): Promise<CommentThreadWithComments> => {
  const response = await fetch(`${API_URL}/chart/comment_threads`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ comment, dataPoint }),
  });
  await handleErrors(response);

  return await response.json();
};

export const respondToThread = async (
  threadId: string,
  comment: Comment
): Promise<CommentThreadWithComments> => {
  const response = await fetch(
    `${API_URL}/chart/comment_threads/${threadId}/respond`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ comment }),
    }
  );
  await handleErrors(response);

  return await response.json();
};
