import { API_URL } from "../constants/api";
import { ChartData } from "../data/models/ChartData";
import { handleErrors } from "./handleErrors";

export const fetchChartData = async (): Promise<ChartData> => {
  const response = await fetch(`${API_URL}/chart/data`, {
    headers: { "content-type": "application/json" },
  });
  await handleErrors(response);

  return await response.json();
};
