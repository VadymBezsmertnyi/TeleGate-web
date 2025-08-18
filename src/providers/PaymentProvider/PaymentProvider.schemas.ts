import { z } from "zod";
import {
  CURRENCY_UAH,
  CURRENCY_EUR,
  CURRENCY_USD,
} from "./PaymentProvider.constants";

export const codeCurrenciesSchema = z.enum([
  CURRENCY_UAH,
  CURRENCY_EUR,
  CURRENCY_USD,
]);

export const currencySchema = z.object({
  name: z.string(),
  symbol_native: z.string(),
  symbol: z.string(),
  code: codeCurrenciesSchema,
  name_plural: z.string(),
  rounding: z.number(),
  decimal_digits: z.number(),
});

export const ratesCurrencySchema = z.object({
  UAH: z.number(),
  USD: z.number(),
  EUR: z.number(),
});

export const currenciesSchema = z.object({
  UAH: ratesCurrencySchema.omit({ UAH: true }).nullable(),
  USD: ratesCurrencySchema.omit({ USD: true }).nullable(),
  EUR: ratesCurrencySchema.omit({ EUR: true }).nullable(),
  date: z.number().nullable(),
});
