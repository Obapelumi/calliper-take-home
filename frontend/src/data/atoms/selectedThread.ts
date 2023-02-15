import { atom } from "jotai";
import { fetchCommentThread } from "../../api/commentThreads";
import { CommentThreadWithComments } from "../models/ChartCommentThread";
import { commentThreadsGroupedByDataPointsAtom } from "./commentThreads";
import { selectedDataPointAtom } from "./selectedDataPoint";

export const selectedThreadIdAtom = atom<string | null>((get) => {
  const selectedDataPoint = get(selectedDataPointAtom);
  const commentThreadsGroupedByDataPoints = get(
    commentThreadsGroupedByDataPointsAtom
  );

  const selectedThread =
    commentThreadsGroupedByDataPoints[selectedDataPoint?.country ?? ""]?.[
      selectedDataPoint?.feature ?? ""
    ] ?? null;

  return selectedThread?.id;
});

export const selectedThreadAtom = atom<CommentThreadWithComments | null>(null);
export const selectedThreadLoadingAtom = atom<boolean>(false);

export const fetchSelectedThreadAtom = atom(
  null,
  async (_, set, selectedThreadId: string | null) => {
    if (selectedThreadId != null) {
      set(selectedThreadLoadingAtom, true);
      set(selectedThreadAtom, await fetchCommentThread(selectedThreadId));
      set(selectedThreadLoadingAtom, false);
    } else {
      set(selectedThreadAtom, null);
      set(selectedThreadLoadingAtom, false);
    }
  }
);
