import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  fetchSelectedThreadAtom,
  selectedThreadIdAtom,
} from "../atoms/selectedThread";

export const useFetchSelectedThread = () => {
  const [selectedThreadId] = useAtom(selectedThreadIdAtom);
  const fetchThread = useSetAtom(fetchSelectedThreadAtom);

  useEffect(() => {
    fetchThread(selectedThreadId);
  }, [fetchThread, selectedThreadId]);
};
