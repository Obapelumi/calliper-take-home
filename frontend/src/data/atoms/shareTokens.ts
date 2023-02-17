import { atom } from "jotai";
import { fetchShareTokens } from "../../api/sharing";
import { indexBy } from "../../utils/functional";
import { ShareToken } from "../models/ShareToken";

export const shareTokensAtom = atom<Record<string, ShareToken>>({});
export const shareTokensListAtom = atom<ShareToken[]>((get) => {
  const shareTokens = get(shareTokensAtom);
  return Object.values(shareTokens);
});
export const shareTokensLoadingAtom = atom<boolean>(false);

export const fetchShareTokensAtom = atom(null, async (_get, set) => {
  set(shareTokensLoadingAtom, true);
  const shareTokens = await fetchShareTokens();
  set(
    shareTokensAtom,
    indexBy((shareToken) => shareToken.id, shareTokens)
  );
  set(shareTokensLoadingAtom, true);
});
