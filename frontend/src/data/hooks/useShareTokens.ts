import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  fetchShareTokensAtom,
  shareTokensListAtom
} from "../atoms/shareTokens";

export const useShareTokens = () => {
  const [shareTokens] = useAtom(shareTokensListAtom);
  const fetchShareTokens = useSetAtom(fetchShareTokensAtom);

  useEffect(() => {
    fetchShareTokens();
  }, [fetchShareTokens]);

  return shareTokens;
};
