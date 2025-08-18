import { z } from "zod";
import {
  userLocationMapSchema,
  userLocationSosSchema,
} from "./MapProvider.schemas";

export type UserLocationMapType = z.infer<typeof userLocationMapSchema>;
export type UserLocationSosType = z.infer<typeof userLocationSosSchema>;
