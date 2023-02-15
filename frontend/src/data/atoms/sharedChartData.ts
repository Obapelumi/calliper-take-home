import { atom } from "jotai";
import { fetchSharedChartData } from "../../api/sharing";
import { getShareTokenFromUrl } from "../../utils/getShareTokenFromUrl";
import { ChartData } from "../models/ChartData";

export const sharedChartDataAtom = atom<ChartData | null>(null);
export const sharedChartDataLoadingAtom = atom(true);
export const sharedChartDataErrorAtom = atom<string | null>(null);
export const fetchSharedChartDataAtom = atom(null, async (_, set) => {
  const token = getShareTokenFromUrl();
  set(sharedChartDataErrorAtom, null);

  try {
    const chartData = await fetchSharedChartData(token);
    set(sharedChartDataAtom, chartData);
  } catch (error: any) {
    set(sharedChartDataErrorAtom, error.message);
  }
  set(sharedChartDataLoadingAtom, false);
});
