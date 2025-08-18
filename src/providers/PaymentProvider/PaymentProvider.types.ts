import { z } from "zod";
import {
  codeCurrenciesSchema,
  currenciesSchema,
  currencySchema,
} from "./PaymentProvider.schemas";

export type CurrencyType = z.infer<typeof currencySchema>;

export type CodeCurrenciesType = z.infer<typeof codeCurrenciesSchema>;

export type CurrenciesType = z.infer<typeof currenciesSchema>;
