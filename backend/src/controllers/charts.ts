import { Request, Response } from 'express';
import * as dataService from 'services/data/dataService';

export const getChartData = async (_: Request, res: Response) => {
  const data = await dataService.getChartData();
  res.status(200).send(data);
};
