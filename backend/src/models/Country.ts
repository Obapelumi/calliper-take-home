import { z } from 'zod';

export const Country = z.enum(['FR', 'GB', 'BE', 'DE', 'ES', 'IT']);
export type Country = z.infer<typeof Country>;
