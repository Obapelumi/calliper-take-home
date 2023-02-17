import { ShareTokenData } from 'models/ShareToken';
import { BadRequestError, NotFoundError } from 'utils/errors';
import * as shareTokenRepository from 'repositories/shareTokenRepository';

export const getAllShareTokens = () => {
  return shareTokenRepository.getAll();
};

export const getShareToken = (id: string) => {
  const shareToken = shareTokenRepository.get(id);
  if (!shareToken) {
    throw new NotFoundError('Page Not Found');
  }
  return shareToken;
};

export const verifyShareToken = (id: string, email: string) => {
  const shareToken = getShareToken(id);

  if (shareToken.email !== email) {
    throw new BadRequestError('Email is invalid');
  }

  if (shareToken.expiresAt < new Date()) {
    throw new BadRequestError('Share token has expired');
  }

  return shareToken;
};

export const createShareToken = (shareTokenData: ShareTokenData) => {
  return shareTokenRepository.createShareToken(shareTokenData);
};
