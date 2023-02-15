import { Chart } from "../components/Chart";
import { ChartPageLayout } from "../components/ChartPageLayout";
import { useSharedChartData } from "../data/hooks/useSharedChartData";

export const SharedChartPage = () => {
  const data = useSharedChartData();
  if (data == null) return null;

  return <ChartPageLayout main={<Chart data={data} />} />;
};
