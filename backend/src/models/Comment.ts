import { z } from 'zod';

export const Comment = z.object({
  userName: z.string(),
  text: z.string(),
});
export type Comment = z.infer<typeof Comment>;
