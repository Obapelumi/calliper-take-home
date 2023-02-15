import { z } from 'zod';
import { BadRequestError } from 'utils/errors';

export function parseItems<Output, Input = Output>(
  parser: z.ZodType<Output, z.ZodTypeDef, Input>,
  items?: Record<string, unknown>[] | null,
): Output[] {
  return (items || []).map((item) => parseItemStrict(parser, item));
}

export function parseItemStrict<Output, Input = Output>(
  parser: z.ZodType<Output, z.ZodTypeDef, Input>,
  item?: Record<string, unknown> | null,
): Output {
  const result = parser.safeParse(item);

  if (!result.success) {
    throw new BadRequestError(
      `Error parsing ${JSON.stringify(parser)} ${JSON.stringify(item)}`,
    );
  }
  return result.data;
}
