import { API_URL } from "../constants/api";
import { ChartData } from "../data/models/ChartData";
import { ShareToken, ShareTokenData } from "../data/models/ShareToken";
import { handleErrors } from "./handleErrors";

export const fetchSharingToken = async (): Promise<{ token: string }> => {
  const response = await fetch(`${API_URL}/share`, {
    headers: { "content-type": "application/json" }
  });
  await handleErrors(response);

  return await response.json();
};

export const fetchShareTokens = async (): Promise<ShareToken[]> => {
  const response = await fetch(`${API_URL}/share/share_tokens`, {
    headers: { "content-type": "application/json" }
  });
  await handleErrors(response);

  return await response.json();
};

export const fetchShareToken = async (
  id: string
): Promise<{ shareToken: ShareToken }> => {
  const response = await fetch(`${API_URL}/share/share_tokens/${id}`, {
    headers: { "content-type": "application/json" }
  });
  await handleErrors(response);

  return await response.json();
};

export const createShareToken = async (
  shareToken: ShareTokenData
): Promise<{ shareToken: ShareToken }> => {
  const response = await fetch(`${API_URL}/share/share_tokens`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(shareToken)
  });
  await handleErrors(response);

  return await response.json();
};

export const fetchSharedChartData = async (
  token: string,
  email: string
): Promise<{ data: ChartData; shareToken: ShareToken }> => {
  const response = await fetch(
    `${API_URL}/chart/shared/${token}?email=${email}`,
    {
      headers: { "content-type": "application/json" }
    }
  );
  await handleErrors(response);

  return await response.json();
};
