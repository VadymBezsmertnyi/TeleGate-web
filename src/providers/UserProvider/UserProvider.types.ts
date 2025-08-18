import { z } from "zod";

// schemas
import { userDataS } from "./UserProvider.schemas";

export type UserDataT = z.infer<typeof userDataS>;

export type SessionCustomType = {
  update: () => void;
  status: "authenticated" | "loading" | "unauthenticated";
  data?: {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
    id_token: string;
    provider: string;
  } | null;
};
