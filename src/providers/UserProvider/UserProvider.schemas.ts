import { z } from "zod";
import { languagesKeys } from "@/localization/localization.const";
import {
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../PlacesProvider/PlacesProvider.schemas";
import { workshopSchema } from "../WorkshopsProvider/WorkshopsProvider.schemas";
import { businessMarketSchema } from "../BusinessProvider/BusinessProvider.schemas";
import { eventSchema } from "../EventsProvider/EventsProvider.schemas";
import { productSchema } from "../MarketProvider/MarketProvider.schemas";
import {
  subscriptionAdvertSchema,
  subscriptionAdvertUpdateSchema,
  subscriptionWorkshopSchema,
} from "../SubscriptionProvider/SubscriptionProvider.schemas";

export const googleBDSchema = z.object({
  iss: z.string(),
  at_hash: z.string().optional(),
  email_verified: z.string().or(z.boolean()).optional(),
  sub: z.string(),
  azp: z.string().optional(),
  email: z.string().optional(),
  profile: z.string().optional(),
  picture: z.string().optional(),
  name: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  aud: z.string(),
  iat: z.number(),
  exp: z.number(),
  nonce: z.string().optional(),
  hd: z.string().optional(),
  locale: z.string().optional(),
});

export const facebookBDSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  name: z.string(),
  email: z.string(),
});

export const userDataS = z.object({
  _id: z.string(),
  isGeoLocation: z.boolean(),
  isGeoLocationBackground: z.boolean(),
  avatar: z
    .object({
      _id: z.string(),
      url: z.string(),
    })
    .nullable(),
  email: z.string().nullable(),
  eventsIds: z.array(eventSchema),
  workshopsIds: z.array(workshopSchema),
  productsIds: z.array(productSchema),
  isCheckBiometric: z.boolean().nullable(),
  languageLocal: z.enum(languagesKeys),
  isNewUser: z.boolean(),
  isDeleteUser: z.boolean(),
  googleDate: googleBDSchema.nullable(),
  facebookDate: facebookBDSchema.nullable(),
  place_id: placeDbSchema.nullable(),
  region_place_id: regionDbSchema.nullable(),
  country_place_id: countryDbSchema.nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  settingsSos: z.object({
    isEnable: z.boolean(),
    radiusKm: z.number(),
  }),
  businessMarketId: businessMarketSchema.nullable(),
  subscriptionAdvertIds: z.array(subscriptionAdvertSchema),
  subscriptionEventIds: z.array(subscriptionAdvertUpdateSchema),
  subscriptionWorkshopIds: z.array(subscriptionWorkshopSchema),
  defaultAmount: z.object({
    advertAmount: z.number(),
    advertBusinessAmount: z.number(),
    eventSmallAmount: z.number(),
    eventBigAmount: z.number(),
    workshopAmount: z.number(),
  }),
});
