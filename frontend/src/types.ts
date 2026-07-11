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

export const BankNames = {
  MayBank: "MayBank",
  CIMB: "CIMB",
  PublicBank: "Public Bank",
  RHB: "RHB",
  HongLeongBank: "Hong Leong Bank",
} as const;
export type BankName = (typeof BankNames)[keyof typeof BankNames];
export const BankNameValues = Object.values(BankNames);

export const Languages = {
  Malay: "Malay",
  English: "English",
  Mandarin: "Mandarin",
  Tamil: "Tamil",
} as const;
export type Language = (typeof BankNames)[keyof typeof BankNames];
export const LanguagesValues = Object.values(Languages);

// === helper ===

const currencySchema = (fieldName: string) =>
  z
    .number()
    .gt(0, `${fieldName} cannot be RM0`)
    .max(utils.MAX_AMOUNT, `${fieldName} must be <RM10B`)
    .refine(
      (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
      { message: `${fieldName} must have exactly 2 decimal places` },
    );

const phoneSchema = (fieldName: string) =>
  z
    .string()
    .regex(/^(?:01[02346-9]\d{7}|011\d{8}|015\d{8}|03\d{8}|0[4-9]\d{7})$/, {
      error: `${fieldName} is an invalid phone number`,
    });

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
  businessName: z.string().min(1, { error: "Business name cannot be empty" }),
  businessRegistrationNumber: z.string().length(12, {
    error: "Business registration number must be 12 numbers long",
  }),
  businessCommencementDate: z
    .date()
    .transform(utils.toLocalMidnight)
    .refine((date) => date <= utils.todayLocalMidnight(), {
      message: "Business commencement date cannot be in the future",
    }),
  businessActivitiesDescription: z
    .string()
    .min(1, { error: "Business activities cannot be empty" }),
  businessAddress: z.string().min(1),
  businessStructure: z.union(BusinessStructureValues.map((v) => z.literal(v))),
  businessEmail: z.email().min(1, { error: "Business email cannot be empty" }),
  businessPhoneNo: phoneSchema("Business phone number"),
  businessEmployeeCount: z
    .int()
    .min(1, { error: "Employee count cannot be 0" }),
  businessIsShariah: z.boolean(),
});
export type LoanBusinessFields = z.infer<typeof loanBusinessFieldsSchema>;

export const loanContactFieldsSchema = z.object({
  contactName: z.string().min(1, { error: "Contact name cannot be empty" }),
  contactPosition: z
    .string()
    .min(1, { error: "Position in business cannot be empty" }),
  contactEmail: z.email(),
  contactPhoneNo: phoneSchema("Personal phone number"),
  contactAddress: z
    .string()
    .min(1, { error: "Personal address cannot be empty" }),
  contactLanguagePreferences: z
    .array(z.union(LanguagesValues.map((v) => z.literal(v))))
    .min(1, { error: "Language preferences cannot be empty" }),
});
export type LoanContactFields = z.infer<typeof loanContactFieldsSchema>;

export const loanFinanceFieldsSchema = z.object({
  annualRevenue: currencySchema("Annual revenue"),
  netProfit: currencySchema("Net profit"),
  monthlyCashFlow: currencySchema("Monthly cashflow"),
  bankName: z.union(BankNameValues.map((v) => z.literal(v))),
  bankNumber: z.string().min(1, { error: "Bank number cannot be empty" }),
});
export type LoanFinanceFields = z.infer<typeof loanFinanceFieldsSchema>;

export const loanRequirementsFieldsSchema = z.object({
  loanAmount: currencySchema("Loan amount"),
  loanTenureYears: z
    .int()
    .min(1, { error: "Tenure cannot be 0 years" })
    .max(15, { error: "Tenure cannot be more than 15 years" }),
  loanPurpose: z.string().min(1, { error: "Loan purpose cannot be empty" }),
});
export type LoanRequirementsFields = z.infer<
  typeof loanRequirementsFieldsSchema
>;

export const loanFieldsSchema = z.object({
  ...loanBusinessFieldsSchema.shape,
  ...loanContactFieldsSchema.shape,
  ...loanFinanceFieldsSchema.shape,
  ...loanRequirementsFieldsSchema.shape,
});
export type LoanFields = z.infer<typeof loanFieldsSchema>;
