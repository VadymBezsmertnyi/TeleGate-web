import { z } from "zod";
import {
  TYPES_SUBSCRIPTIONS_ADVERT,
  TYPES_SUBSCRIPTIONS_EVENT,
} from "./SubscriptionProvider.constants";

export const subscriptionAdvertSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  amount: z.number(),
  type: z.enum(TYPES_SUBSCRIPTIONS_ADVERT),
  dateCreate: z.number(),
  dateEnd: z.number(),
});

export const subscriptionAdvertUpdateSchema = z.object({
  _id: z.string(),
  amount: z.number(),
  type: z.enum(TYPES_SUBSCRIPTIONS_EVENT),
  dateCreate: z.number(),
  dateEnd: z.number(),
});

export const subscriptionWorkshopSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  amount: z.number(),
  dateCreate: z.number(),
  dateEnd: z.number(),
});
