import { API_URL } from "../constants/api";
import { ChartData } from "../data/models/ChartData";
import { handleErrors } from "./handleErrors";

export const fetchSharingToken = async (): Promise<{ token: string }> => {
  const response = await fetch(`${API_URL}/share`, {
    headers: { "content-type": "application/json" },
  });
  await handleErrors(response);

  return await response.json();
};

export const fetchSharedChartData = async (
  token: string
): Promise<ChartData> => {
  const response = await fetch(`${API_URL}/chart/shared/${token}`, {
    headers: { "content-type": "application/json" },
  });
  await handleErrors(response);

  return await response.json();
};
