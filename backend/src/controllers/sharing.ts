import { z } from 'zod';
import { Request, Response } from 'express';
import * as dataService from 'services/data/dataService';
import * as sharingService from 'services/sharing/sharingService';
import { parseItemStrict } from 'utils/parseItems';

const CreateSharedTokenRequest = z.object({
  email: z.string().email(),
  expiresAt: z.coerce.date().min(new Date()),
});

const GetSharedDataRequest = z.object({ email: z.string().email() });

export const getAllShareTokens = (_: Request, res: Response) => {
  const shareTokens = sharingService.getAllShareTokens();
  res.status(200).send(shareTokens);
};

export const getShareToken = (
  req: Request<{ token: string }>,
  res: Response,
) => {
  const shareToken = sharingService.getShareToken(req.params.token);
  res.status(200).send({ shareToken });
};

export const createShareToken = async (req: Request, res: Response) => {
  const shareTokenData = parseItemStrict(CreateSharedTokenRequest, req.body);
  const shareToken = sharingService.createShareToken(shareTokenData);
  res.status(200).send({ shareToken });
};

export const getSharedData = async (
  req: Request<{ token: string }, unknown, unknown, { email: string }>,
  res: Response,
) => {
  const { email } = parseItemStrict(GetSharedDataRequest, req.query);
  const shareToken = sharingService.verifyShareToken(req.params.token, email);
  const data = dataService.getChartData();
  res.status(200).send({ data, shareToken });
};
