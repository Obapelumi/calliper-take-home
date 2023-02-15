import { atom } from "jotai";
import { fetchSharingToken } from "../../api/sharing";

export const sharingTokenAtom = atom<string | null>(null);
export const sharingTokenLoadingAtom = atom<boolean>(false);

export const fetchSharingTokenAtom = atom(null, async (get, set) => {
  set(sharingTokenLoadingAtom, true);
  const { token } = await fetchSharingToken();
  set(sharingTokenAtom, token);
  set(sharingTokenLoadingAtom, false);
});
