import { useEffect, useState } from "react";
import { fetchChartData } from "../../api/chartData";
import { ChartData } from "../models/ChartData";

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartData>([]);

  useEffect(() => {
    (async () => {
      const chartData = await fetchChartData();
      setChartData(chartData);
    })();
  }, []);

  return chartData;
};
