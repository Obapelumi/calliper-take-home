import { atom } from "jotai";
import { createCommentThread, respondToThread } from "../../api/commentThreads";
import { Comment } from "../models/Comment";
import { commentThreadsAtom } from "./commentThreads";
import { selectedDataPointAtom } from "./selectedDataPoint";
import { selectedThreadAtom, selectedThreadIdAtom } from "./selectedThread";

export const commentPublishingAtom = atom(false);
export const commentPublishingErrorAtom = atom<string | null>(null);
export const publishCommentAtom = atom(
  null,
  async (get, set, comment: Comment) => {
    const selectedDataPoint = get(selectedDataPointAtom);
    const selectedThreadId = get(selectedThreadIdAtom);

    if (selectedDataPoint == null) return;

    set(commentPublishingAtom, true);
    set(commentPublishingErrorAtom, null);
    try {
      if (selectedThreadId == null) {
        const newThread = await createCommentThread(comment, selectedDataPoint);
        set(commentThreadsAtom, (state) => [...state, newThread]);
      } else {
        const updatedThread = await respondToThread(selectedThreadId, comment);
        set(commentThreadsAtom, (state) =>
          state.map((thread) =>
            updatedThread.id === thread.id ? updatedThread : thread
          )
        );
        set(selectedThreadAtom, updatedThread);
      }
    } catch (error: any) {
      set(commentPublishingErrorAtom, error.message);
    }
    set(commentPublishingAtom, false);
  }
);
