import { useAtom, useSetAtom } from "jotai";
import {
  commentPublishingAtom,
  commentPublishingErrorAtom,
  publishCommentAtom,
} from "../atoms/sendComment";

export const usePublishComment = () => {
  const publishComment = useSetAtom(publishCommentAtom);
  const [commentPublishing] = useAtom(commentPublishingAtom);
  const [commentError] = useAtom(commentPublishingErrorAtom);

  return { publishComment, commentPublishing, commentError };
};
