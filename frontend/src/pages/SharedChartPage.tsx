import { Chart } from "../components/Chart";
import { ChartPageLayout } from "../components/ChartPageLayout";
import { VerifyShareToken } from "../components/sharing/VerifyShareToken";
import { useSharedChartData } from "../data/hooks/useSharedChartData";

export const SharedChartPage = () => {
  const { chartData } = useSharedChartData();
  if (chartData == null) return <VerifyShareToken />;

  return <ChartPageLayout main={<Chart data={chartData} />} />;
};
