import { z } from "zod";
import {
  coordinatesSchema,
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../PlacesProvider/PlacesProvider.schemas";
import { codeCurrenciesSchema } from "../PaymentProvider/PaymentProvider.schemas";
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

export const eventSchema = z.object({
  _id: z.string(),
  userId: populateUserData.nullable(),
  title: z.string(),
  place_id: placeDbSchema.nullable(),
  region_place_id: regionDbSchema.nullable(),
  country_place_id: countryDbSchema.nullable(),
  place_address: z.string(),
  coordinates: coordinatesSchema,
  date: z.object({
    start: z.number(),
    finish: z.number(),
  }),
  price: z.object({ start: z.number(), finish: z.number() }).nullable(),
  currency: codeCurrenciesSchema,
  description: z.string(),
  images: z.array(
    z.object({
      _id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  likeUserIds: z.array(populateUserData),
});

export const eventsSchema = z.array(eventSchema);

export const resultEventsSchema = z.object({
  result: z.boolean(),
  events: eventsSchema,
  code: z.number(),
});

export const upcomingEventSchema = eventSchema.merge(
  z.object({
    isOld: z.boolean(),
    isNow: z.boolean(),
  })
);

export const upcomingEventsSchema = z.array(upcomingEventSchema);
