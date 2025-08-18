import { z } from "zod";
import { languagesKeys } from "./localization.const";

export const languagesSchema = z.enum(languagesKeys);
