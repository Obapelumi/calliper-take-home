import { atom } from "jotai";
import { sharingTokenAtom } from "./sharingToken";

export const sharingLinkAtom = atom<string | null>((get) => {
  const token = get(sharingTokenAtom);
  return `${window.location.host}/share/chart/${token}`;
});
