import { z } from "zod";
import {
  coordinatesSchema,
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../PlacesProvider/PlacesProvider.schemas";
import { imageSchema } from "../BusinessProvider/BusinessProvider.schemas";

export const typeWorkSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const typeWorksSchema = z.array(typeWorkSchema);

export const commentSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  userName: z.string(),
  description: z.string(),
  rating: z.number().min(1).max(5),
  dateCreate: z.number(),
  dateUpdate: z.number(),
});

export const workshopSchema = z.object({
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
  title: z.string(),
  description: z.string(),
  phoneNumber: z.string(),
  place_id: placeDbSchema.nullable(),
  region_place_id: regionDbSchema.nullable(),
  country_place_id: countryDbSchema.nullable(),
  place_address: z.string(),
  coordinates: coordinatesSchema,
  motoTypesWorks: z.array(z.number()),
  autoTypesWorks: z.array(z.number()),
  images: z.array(
    z.object({
      _id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  dataCreate: z.number(),
  comments: z.array(commentSchema),
  rating: z.number().nullable(),
  likeUserIds: z.array(
    z.object({
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
  ),
});

export const workshopsSchema = z.array(workshopSchema);
