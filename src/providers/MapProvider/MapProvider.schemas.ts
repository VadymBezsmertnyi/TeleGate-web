import { z } from "zod";

export const locationObjectCoordsSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().nullable(),
  accuracy: z.number().nullable(),
  altitudeAccuracy: z.number().nullable(),
  heading: z.number().nullable(),
  speed: z.number().nullable(),
});

export const userLocationMapSchema = z.object({
  date: z.number(),
  userId: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  isUkraine: z.boolean(),
});

export const usersLocationMapSchema = z.array(userLocationMapSchema);

export const userLocationSosSchema = z.object({
  date: z.number(),
  userId: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  description: z.string(),
  phoneNumber: z.string(),
  telegram: z.string(),
});

export const usersLocationSosSchema = z.array(userLocationSosSchema);
