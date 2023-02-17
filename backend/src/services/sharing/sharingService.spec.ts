import {
  createShareToken,
  getAllShareTokens,
  getShareToken,
  verifyShareToken,
} from './sharingService';
import { BadRequestError, NotFoundError } from 'utils/errors';
import { lastMonth, nextYear } from 'utils/indexBy';
import { v4 } from 'uuid';
import initialShareTokensData from 'stubData/initialShareTokens.json';
import { parseItems } from 'utils/parseItems';
import { ShareToken } from 'models/ShareToken';
import * as shareTokenRepository from 'repositories/shareTokenRepository';

const initialShareTokens = parseItems(ShareToken, initialShareTokensData);
const email = 'valid@gmail.com';
const expiresAt = nextYear();

jest.mock('repositories/shareTokenRepository', () => ({
  getAll: jest.fn(() => initialShareTokens),
  get: jest.fn(() => initialShareTokens[0]!),
  getByEmail: jest.fn(() => initialShareTokens[0]!),
  createShareToken: jest.fn(() => ({ id: v4(), email, expiresAt })),
}));

describe('SharingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllShareTokens should call share token repository getAll', function () {
    const result = getAllShareTokens();
    expect(shareTokenRepository.getAll).toBeCalledTimes(1);
    expect(result).toEqual(initialShareTokens);
  });

  it('should successfully get token', function () {
    const shareToken = initialShareTokens[0]!;
    const result = getShareToken(shareToken.id);
    expect(shareTokenRepository.get).toBeCalledTimes(1);
    expect(result).toEqual(shareToken);
  });

  it('should throw 404 error if token does not exist', function () {
    (shareTokenRepository.get as jest.Mock).mockReturnValueOnce(null);
    expect(() => getShareToken('bad_token')).toThrowError(NotFoundError);
  });

  it('should successfully verify token', function () {
    const shareToken = initialShareTokens[0]!;
    const result = verifyShareToken(shareToken.id, email);
    expect(shareTokenRepository.get).toBeCalledTimes(1);
    expect(result).toEqual(shareToken);
  });

  it('should throw 400 error if email is invalid', function () {
    const shareToken = initialShareTokens[0]!;
    expect(() =>
      verifyShareToken(shareToken.id, 'invalid@gmail.com'),
    ).toThrowError(BadRequestError);
  });

  it('should throw 400 error if token has expired', function () {
    const expiredToken = v4();
    (shareTokenRepository.get as jest.Mock).mockReturnValueOnce({
      id: expiredToken,
      email: 'expired@gmail.com',
      expiresAt: lastMonth(),
    });
    expect(() =>
      verifyShareToken(expiredToken, 'expired@gmail.com'),
    ).toThrowError(BadRequestError);
  });

  it('createShareToken should call share token repository createShareToken', () => {
    const result = createShareToken({ email, expiresAt });
    expect(shareTokenRepository.createShareToken).toBeCalledTimes(1);
    expect(result.email).toEqual(email);
    expect(result.expiresAt).toEqual(expiresAt);
  });
});
