import { z } from "zod";
import utils from "./utils";

// === Enums ===

export const BusinessStructures = {
  Proprietorship: "Sole Proprietorship",
  Partnership: "Partnership",
  LLP: "Limited Liability Partnership (LLP/PLT)",
  PrivateLimited: "Private Limited (Sdn. Bhd.)",
} as const;
export type BusinessStructure =
  (typeof BusinessStructures)[keyof typeof BusinessStructures];
export const BusinessStructureValues = Object.values(BusinessStructures);

// === User ===

export interface User {
  username: string;
  fullname: string;
  email: string;
}

export interface NewUser {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

// === Application Fields ===

export const loanBusinessFieldsSchema = z.object({
  businessName: z.string(),
  businessRegistrationNumber: z.string().length(12),
  businessCommencementDate: z
    .date()
    .transform(utils.toLocalMidnight)
    .refine((date) => date <= utils.todayLocalMidnight(), {
      message: "Date must be today or in the past",
    }),
  businessStructure: z.union(BusinessStructureValues.map((v) => z.literal(v))),
  businessIsShariah: z.boolean(),
});
export type LoanBusinessFields = z.infer<typeof loanBusinessFieldsSchema>;

export const loanContactFieldsSchema = z.object({
  contactName: z.string(),
  contactPosition: z.string(),
  contactEmail: z.string(),
});
export type LoanContactFields = z.infer<typeof loanContactFieldsSchema>;

const MAX_AMOUNT = 10 ** 10 - 1;
export const loanFinanceFieldsSchema = z.object({
  annualRevenue: z
    .number()
    .max(MAX_AMOUNT)
    .refine(
      (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
      { message: "Must have exactly 2 decimal places" },
    ),
});
export type LoanFinanceFields = z.infer<typeof loanFinanceFieldsSchema>;

export const loanFieldsSchema = z.object({
  ...loanBusinessFieldsSchema.shape,
  ...loanContactFieldsSchema.shape,
  ...loanFinanceFieldsSchema.shape,
});
export type LoanFields = z.infer<typeof loanFieldsSchema>;
