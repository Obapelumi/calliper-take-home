import { atom } from "jotai";
import { fetchSharedChartData, fetchShareToken } from "../../api/sharing";
import { getShareTokenFromUrl } from "../../utils/getShareTokenFromUrl";
import { ChartData } from "../models/ChartData";

export const shareTokenLoadingAtom = atom(true);
export const shareTokenErrorAtom = atom<string | null>(null);
export const sharedChartDataAtom = atom<ChartData | null>(null);
export const sharedChartDataLoadingAtom = atom(false);
export const sharedChartDataErrorAtom = atom<string | null>(null);

export const fetchShareTokenAtom = atom(null, async (_, set) => {
  const token = getShareTokenFromUrl();
  set(shareTokenErrorAtom, null);

  try {
    const { shareToken } = await fetchShareToken(token);
    if (new Date(shareToken.expiresAt) < new Date()) {
      set(shareTokenErrorAtom, "Share link has Expired");
    }
  } catch (error: any) {
    set(shareTokenErrorAtom, error.message);
  }
  set(shareTokenLoadingAtom, false);
});

export const fetchSharedChartDataAtom = atom(
  null,
  async (_, set, email: string) => {
    const token = getShareTokenFromUrl();
    set(sharedChartDataErrorAtom, null);
    set(sharedChartDataLoadingAtom, true);

    try {
      const { data } = await fetchSharedChartData(token, email);
      set(sharedChartDataAtom, data);
    } catch (error: any) {
      set(sharedChartDataErrorAtom, error.message);
    }
    set(sharedChartDataLoadingAtom, false);
  }
);
