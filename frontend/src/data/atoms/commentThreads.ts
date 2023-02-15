import { atom } from "jotai";
import { fetchCommentThreads } from "../../api/commentThreads";
import { groupBy, indexBy, mapValues } from "../../utils/functional";
import { CommentThread } from "../models/ChartCommentThread";

export const commentThreadsAtom = atom<CommentThread[]>([]);

export const commentThreadsGroupedByDataPointsAtom = atom((get) => {
  const atom = get(commentThreadsAtom);

  const groupedByCountry = groupBy(
    (commentThread) => commentThread.chartDataPoint.country,
    atom
  );
  const indexedByFeature = mapValues(
    (commentThreads) =>
      indexBy(
        (commentThread) => commentThread.chartDataPoint.feature,
        commentThreads
      ),
    groupedByCountry
  );

  return indexedByFeature;
});

export const fetchCommentThreadsAtom = atom(
  (get) => get(commentThreadsAtom),
  async (_, set) => {
    const threads = await fetchCommentThreads();
    set(commentThreadsAtom, threads);
  }
);
