import { getShareToken, validateToken } from './sharingService';
import { NotFoundError } from 'utils/errors';

describe('SharingService', () => {
  it('should successfully validate token', function () {
    const token = getShareToken();
    expect(() => validateToken(token)).not.toThrowError();
  });

  it('should throw 404 error if token is invalid', function () {
    expect(() => validateToken('bad_token')).toThrowError(NotFoundError);
  });
});
