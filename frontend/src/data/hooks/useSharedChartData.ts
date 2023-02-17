import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  fetchSharedChartDataAtom,
  fetchShareTokenAtom,
  sharedChartDataAtom,
  sharedChartDataErrorAtom,
  sharedChartDataLoadingAtom,
  shareTokenErrorAtom,
  shareTokenLoadingAtom
} from "../atoms/sharedChartData";

export const useSharedChartData = () => {
  const [shareTokenError] = useAtom(shareTokenErrorAtom);
  const [shareTokenLoading] = useAtom(shareTokenLoadingAtom);
  const fetchShareToken = useSetAtom(fetchShareTokenAtom);

  const [chartData] = useAtom(sharedChartDataAtom);
  const [sharedChartDataLoading] = useAtom(sharedChartDataLoadingAtom);
  const [sharedChartDataError] = useAtom(sharedChartDataErrorAtom);
  const fetchChartData = useSetAtom(fetchSharedChartDataAtom);

  useEffect(() => {
    fetchShareToken();
  }, [fetchShareToken]);

  return {
    shareTokenError,
    shareTokenLoading,
    chartData,
    fetchChartData,
    sharedChartDataLoading,
    sharedChartDataError
  };
};
