import { ShareToken, ShareTokenData } from 'models/ShareToken';
import { InternalError } from 'utils/errors';
import { indexBy } from 'utils/indexBy';
import { v4 } from 'uuid';
import { parseItems } from 'utils/parseItems';
import initialShareTokensData from 'stubData/initialShareTokens.json';

const initialShareTokens = parseItems(ShareToken, initialShareTokensData);

const shareTokens = indexBy((shareToken) => shareToken.id, initialShareTokens);

export const getAll = (): ShareToken[] => {
  return Object.values(shareTokens);
};

export const get = (id: string): ShareToken | null => {
  return shareTokens[id] ?? null;
};

export const getByEmail = (email: string): ShareToken | null => {
  return (
    Object.values(shareTokens).find(
      (shareToken) => shareToken.email === email,
    ) ?? null
  );
};

export const createShareToken = ({
  email,
  expiresAt,
}: ShareTokenData): ShareToken => {
  const existingShareToken = getByEmail(email);
  if (existingShareToken) {
    const newShareToken = { ...existingShareToken, expiresAt };
    shareTokens[existingShareToken.id] = newShareToken;
    return newShareToken;
  }
  const id = v4();
  if (shareTokens[id])
    throw new InternalError('Share Token with this id already exists');

  const shareToken: ShareToken = { id, email, expiresAt };
  shareTokens[id] = shareToken;
  return shareToken;
};
