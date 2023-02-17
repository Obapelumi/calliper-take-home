import { atom } from "jotai";
import { createShareToken } from "../../api/sharing";
import { ShareTokenData } from "../models/ShareToken";
import { shareTokensAtom } from "./shareTokens";

export const sendingShareTokenAtom = atom(false);
export const sendShareTokenErrorAtom = atom<string | null>(null);
export const sendShareTokenAtom = atom(
  null,
  async (_get, set, shareToken: ShareTokenData) => {
    set(sendingShareTokenAtom, true);
    set(sendShareTokenErrorAtom, null);
    try {
      const { shareToken: newShareToken } = await createShareToken(shareToken);
      set(shareTokensAtom, (state) => ({
        ...state,
        [newShareToken.id]: newShareToken
      }));
    } catch (error: any) {
      set(sendShareTokenErrorAtom, error.message);
    }
    set(sendingShareTokenAtom, false);
  }
);
