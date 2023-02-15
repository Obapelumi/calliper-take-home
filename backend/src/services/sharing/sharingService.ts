import { getToken } from 'repositories/shareTokenRepository';
import { NotFoundError } from 'utils/errors';

export const validateToken = (token: string) => {
  const expectedToken = getToken();

  if (token !== expectedToken) {
    throw new NotFoundError('Page Not Found');
  }
};

export const getShareToken = () => {
  return getToken();
};
