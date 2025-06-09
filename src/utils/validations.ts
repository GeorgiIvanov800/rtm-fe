import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const nonNegNumber = z.number().nonnegative('Bitte geben Sie nur Nummern.');

export const validationSchema = toTypedSchema(
  z.object({
    sequenceNumber: nonNegNumber,
    sleeveNumber: nonNegNumber,
  }),
);
