import { z } from 'zod';

import { ChartDataPoint } from './ChartDataPoint';
import { Comment } from './Comment';

export const CommentThread = z.object({
  id: z.string(),
  chartDataPoint: ChartDataPoint,
  commentsCount: z.number(),
});
export type CommentThread = z.infer<typeof CommentThread>;

export const CommentThreadWithComments = CommentThread.extend({
  comments: z.array(Comment),
});
export type CommentThreadWithComments = z.infer<
  typeof CommentThreadWithComments
>;
