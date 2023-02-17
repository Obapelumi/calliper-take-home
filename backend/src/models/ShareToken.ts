import { z } from 'zod';

export const ShareTokenData = z.object({
  email: z.string().email(),
  expiresAt: z.coerce.date(),
});

export type ShareTokenData = z.infer<typeof ShareTokenData>;

export const ShareToken = ShareTokenData.extend({ id: z.string() });

export type ShareToken = z.infer<typeof ShareToken>;
