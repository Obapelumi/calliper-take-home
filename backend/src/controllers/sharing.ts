import { Request, Response } from 'express';
import * as dataService from 'services/data/dataService';
import * as sharingService from 'services/sharing/sharingService';

export const getShareToken = async (_: Request, res: Response) => {
  const token = sharingService.getShareToken();
  res.status(200).send({ token });
};

export const getSharedData = async (
  req: Request<{ token: string }>,
  res: Response,
) => {
  sharingService.validateToken(req.params.token);
  const data = dataService.getChartData();
  res.status(200).send(data);
};
