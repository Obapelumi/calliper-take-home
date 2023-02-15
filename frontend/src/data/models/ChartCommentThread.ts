import { DataPoint } from "./ChartData";
import { Comment } from "./Comment";

export interface CommentThread {
  id: string;
  chartDataPoint: DataPoint;
  commentsCount: number;
}

export interface CommentThreadWithComments extends CommentThread {
  comments: Comment[];
}
