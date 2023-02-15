import { z } from 'zod';

import { Country } from './Country';
import { ChartDataFeature } from './ChartDataFeature';

export const ChartDataPoint = z.object({
  feature: ChartDataFeature,
  country: Country,
});
export type ChartDataPoint = z.infer<typeof ChartDataPoint>;
