import { z } from "zod";
import { businessMarketSchema, imageSchema } from "./BusinessProvider.schemas";

export type BusinessMarketType = z.infer<typeof businessMarketSchema>;

export type ItemSearchPlaceAddressType = {
  placeId: string;
  title: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export type ImageType = z.infer<typeof imageSchema>;
