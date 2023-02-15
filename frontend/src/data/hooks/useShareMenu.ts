import { useAtom } from "jotai";
import { showShareMenuAtom } from "../atoms/shareMenu";

export const useShareMenu = () => {
  const [shareMenuShown, setShareMenuVisibility] = useAtom(showShareMenuAtom);
  return { shareMenuShown, setShareMenuVisibility };
};
