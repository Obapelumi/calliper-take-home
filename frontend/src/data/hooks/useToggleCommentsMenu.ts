import { useAtom, useSetAtom } from "jotai";
import { commentsToggleAtom, hideCommentsAtom } from "../atoms/commentsMenu";

export const useToggleCommentsMenu = () => {
  const [commentsMenuShown, toggleCommentsMenu] = useAtom(commentsToggleAtom);
  const hideCommentsMenu = useSetAtom(hideCommentsAtom);

  return { commentsMenuShown, toggleCommentsMenu, hideCommentsMenu };
};
