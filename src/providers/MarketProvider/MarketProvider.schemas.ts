import { z } from "zod";

import {
  codeCurrenciesSchema,
  currenciesSchema,
  ratesCurrencySchema,
} from "../PaymentProvider/PaymentProvider.schemas";
import {
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../PlacesProvider/PlacesProvider.schemas";
import { imageSchema } from "../BusinessProvider/BusinessProvider.schemas";

const populateUserData = z.object({
  _id: z.string(),
  avatar: z
    .object({
      _id: z.any(),
      url: z.string(),
      image: imageSchema.optional(),
    })
    .nullable(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
});

export const infoCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_id: z.number().optional(),
});

export const transportSchema = z.object({
  brandId: z.number(),
  mileage: z.number(),
  yearRelease: z.number(),
  isCleared: z.boolean(),
  typeFuelId: z.number(),
  typeTransmissionId: z.number(),
});

export const partsSchema = z.object({
  brandId: z.number(),
  typeId: z.number(),
});

export const productSchema = z.object({
  _id: z.string(),
  userId: populateUserData.nullable(),
  title: z.string(),
  isNewProduct: z.boolean(),
  isBusiness: z.boolean(),
  place_id: placeDbSchema.nullable(),
  region_place_id: regionDbSchema.nullable(),
  country_place_id: countryDbSchema.nullable(),
  images: z.array(
    z.object({
      _id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  description: z.string(),
  price: z.number(),
  prices: z.object({
    UAH: z.number().optional(),
    USD: z.number().optional(),
    EUR: z.number().optional(),
    date: z.number().nullable(),
  }),
  codeCurrency: codeCurrenciesSchema,
  phoneNumber: z.string(),
  telegram: z.string(),
  moto: transportSchema.nullable(),
  auto: transportSchema.nullable(),
  motoParts: partsSchema.nullable(),
  autoParts: partsSchema.nullable(),
  updateAT: z.number(),
  quantityViews: z.number(),
  likeUserIds: z.array(populateUserData),
});

export const productsSchema = z.array(productSchema);

export const placesAllIdsSchema = z.object({
  cityPlaceIds: z.array(placeDbSchema),
  regionPlaceIds: z.array(regionDbSchema),
  countryPlaceIds: z.array(countryDbSchema),
});

export const resultProductsSchema = z.object({
  result: z.boolean(),
  code: z.number(),
  products: productsSchema,
  currencies: currenciesSchema,
  max: ratesCurrencySchema,
  min: ratesCurrencySchema,
  places: placesAllIdsSchema.optional(),
});

export const minMaxPricesSchema = z.object({
  min: ratesCurrencySchema,
  max: ratesCurrencySchema,
});
