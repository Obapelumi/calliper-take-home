import { useEffect } from "react";
import { useAtom } from "jotai";
import { fetchCommentThreadsAtom } from "../atoms/commentThreads";

export const useCommentThreads = () => {
  const [commentThreads, fetchCommentThreads] = useAtom(
    fetchCommentThreadsAtom
  );

  useEffect(() => {
    fetchCommentThreads();
  }, [fetchCommentThreads]);

  return commentThreads;
};
