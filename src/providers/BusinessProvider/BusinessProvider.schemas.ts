import { z } from "zod";
import {
  coordinatesSchema,
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../PlacesProvider/PlacesProvider.schemas";

export const imageSchema = z.object({
  _id: z.string().optional(),
  width: z.number(),
  height: z.number(),
  base64: z.string(),
  url: z.string().optional(),
  uri: z.string().optional(),
});

export const phoneSchema = z.object({
  phoneNumber: z.string(),
  selectCountryIso: z.string(),
  isTelegram: z.boolean(),
  isWhatsApp: z.boolean(),
  isViber: z.boolean(),
});

export const businessMarketSchema = z.object({
  _id: z.string(),
  userId: z
    .object({
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
    })
    .nullable(),
  logo: z
    .object({
      _id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .nullable(),
  name: z.string(),
  place: z
    .object({
      place_id: placeDbSchema.nullable(),
      region_place_id: regionDbSchema.nullable(),
      country_place_id: countryDbSchema.nullable(),
      place_address: z.string(),
      coordinates: coordinatesSchema,
    })
    .nullable(),
  mainPhoneNumber: phoneSchema,
  otherPhoneNumbers: z.array(phoneSchema).nullable(),
});
