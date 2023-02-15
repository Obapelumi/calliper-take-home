import { z } from 'zod';

export const ChartDataFeature = z.enum([
  'hotdog',
  'burger',
  'sandwich',
  'kebab',
  'fries',
  'donut',
]);
export type ChartDataFeature = z.infer<typeof ChartDataFeature>;
