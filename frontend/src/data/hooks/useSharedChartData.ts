import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  fetchSharedChartDataAtom,
  sharedChartDataAtom,
} from "../atoms/sharedChartData";

export const useSharedChartData = () => {
  const [chartData] = useAtom(sharedChartDataAtom);
  const fetchChartData = useSetAtom(fetchSharedChartDataAtom);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return chartData;
};
