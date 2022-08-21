import { z } from 'zod';

export const BasicDetailsValidator = z.object({
  name: z.string().nonempty('Name can not be empty.'),
  email: z.string().email('Email can not be empty'),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  gender: z.string().nonempty('Select a gender'),
  caste: z.string().nonempty('Select a caste'),
  nationality: z.string().nonempty('Nationality can not be empty'),
});

export type BasicDetailsSchema = z.infer<typeof BasicDetailsValidator>;

const AcademicDetailsSchema = z.object({
  course: z.enum(['S', 'HS', 'DIP', 'UG', 'PG', 'BTECH', 'MTECH']),
  institute: z.string().nonempty(),
  board: z.string().nonempty(),
  dept: z.string().optional(),
  marks: z.number().positive(),
  start: z.date(),
  end: z.date(),
});

const WorkExperienceSchema = z.object({
  have: z.boolean(),
  company: z.string(),
  start: z.date(),
  end: z.date(),
  salary: z.number(),
});

const UserProfileSchema = z.object({
  basic: BasicDetailsValidator,
  academic: z.array(AcademicDetailsSchema).nonempty(),
  work: WorkExperienceSchema,
});

export type UserProfileModel = z.infer<typeof UserProfileSchema>;
