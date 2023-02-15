import { ChartPage } from "./pages/ChartPage";
import { SharedChartPage } from "./pages/SharedChartPage";

export const Router = () => {
  const page = window.location.pathname;

  if (page.startsWith("/share/chart")) return <SharedChartPage />;
  else return <ChartPage />;
};
