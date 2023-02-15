import { useAtom } from "jotai";
import {
  selectedThreadAtom,
  selectedThreadLoadingAtom,
} from "../atoms/selectedThread";

export const useSelectedThread = () => {
  const [selectedThread] = useAtom(selectedThreadAtom);
  const [loading] = useAtom(selectedThreadLoadingAtom);

  return { selectedThread, loading };
};
