import { z } from "zod";
import {
  commentSchema,
  typeWorkSchema,
  typeWorksSchema,
  workshopSchema,
  workshopsSchema,
} from "./WorkshopsProvider.schemas";
export type TypeWorkType = z.infer<typeof typeWorkSchema>;
export type TypeWorksType = z.infer<typeof typeWorksSchema>;

export type CommentType = z.infer<typeof commentSchema>;

export type WorkshopType = z.infer<typeof workshopSchema>;
export type WorkshopsType = z.infer<typeof workshopsSchema>;
