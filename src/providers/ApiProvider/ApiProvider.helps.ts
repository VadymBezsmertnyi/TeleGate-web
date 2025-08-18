import { z } from "zod";

const appManifestEnvS = z.object({
  APP_DOMAIN_APP: z.string(),
  APP_DOMAIN_WEB: z.string(),
  APP_PORT: z.string(),
});

type AppManifestEnvT = z.infer<typeof appManifestEnvS>;

export const getEnv = (): AppManifestEnvT => {
  const parsedEnv = z.object({ developer: appManifestEnvS }).parse({
    developer: {
      APP_DOMAIN_WEB: "localhost",
      APP_DOMAIN_APP: "192.168.31.31",
      APP_PORT: "5008",
    },
  });
  return parsedEnv.developer;
};

export const getApiUrl = () => {
  const { APP_DOMAIN_WEB, APP_PORT } = getEnv();
  const herokuServer =
    "https://moto-auto-road-assistant-9ba1127a6934.herokuapp.com";
  const api = `http://${APP_DOMAIN_WEB}:${APP_PORT}`;
  if (process.env.NODE_ENV === "development") return api;
  return herokuServer;
};
