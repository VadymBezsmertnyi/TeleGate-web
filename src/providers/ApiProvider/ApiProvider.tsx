import React, { FunctionComponent, useContext, useMemo } from "react";
import { ZodSchema, z } from "zod";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

// helps
import { getApiUrl } from "./ApiProvider.helps";
import { getDeviceStorage } from "../../helps/storage.help";

// constants
import { TOKEN_KEY_ASYNC_STORAGE } from "./ApiProvider.constants";
import { PATHS_API } from "../paths.constants";

type ApiContext = {
  api: <T>(
    url: string,
    config?: AxiosRequestConfig | null,
    schema?: ZodSchema<T>
  ) => Promise<T | null>;
};

type ApiProviderProps = {
  children: JSX.Element;
};

export const apiContext = React.createContext({} as ApiContext);

const ApiProvider: FunctionComponent<ApiProviderProps> = (props) => {
  const { children } = props;
  const urlApi = `${getApiUrl()}/api`;

  async function api<T>(
    url: string,
    config: AxiosRequestConfig | null = { method: "GET" },
    schema: ZodSchema<T> = z.any()
  ): Promise<T | null> {
    const platform = "web";
    const verifyTokensJSON = getDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
    const verifyTokens = verifyTokensJSON
      ? (JSON.parse(verifyTokensJSON) as {
          accessToken: string;
          refreshToken: string;
        })
      : null;
    const queryParams = qs.stringify(
      { platform },
      {
        addQueryPrefix: !url.includes("?"),
      }
    );
    const currentUrl = url.includes("http")
      ? url
      : `${urlApi}${url}${url.includes("?") ? `&${queryParams}` : queryParams}`;
    const currentConfig = config ? config : {};

    console.log("currentUrl", currentUrl);
    try {
      const response = await axios(currentUrl, {
        ...currentConfig,
        headers: {
          "Content-Type": "application/json",
          authorization: verifyTokens?.accessToken || "",
          ...currentConfig.headers,
        },
      });
      if (response.status === 204) return null;

      // TODO for test
      const isCurrent = schema.safeParse(response.data);
      if (isCurrent.success) return isCurrent.data;
      console.warn("currentUrl", currentUrl);
      console.warn("response.data", response.data);
      console.warn("isCurrent", isCurrent);

      return null;
    } catch (error: any) {
      try {
        if (error.status === 402 && verifyTokens?.refreshToken) {
          const currentUrlToken = url.includes("http")
            ? url
            : `${urlApi}${PATHS_API.token}`;
          const responseOther = await axios(currentUrlToken, {
            ...currentConfig,
            headers: {
              "Content-Type": "application/json",
              authorization: verifyTokens.refreshToken,
              ...currentConfig.headers,
            },
          });
          const isCurrent = schema.safeParse(responseOther.data);
          if (isCurrent.success) {
            return isCurrent.data;
          }
          console.warn("error-402-currentUrl", currentUrl);
          console.warn("error-402-responseOther.data", responseOther.data);
          console.warn("error-402-isCurrent", isCurrent);
          return null;
        }
        if (process.env.NODE_ENV === "development") {
          console.warn("error", error);
        }
      } catch (error402) {
        if (process.env.NODE_ENV === "development") {
          console.warn("error-402-verifyTokens?.refreshToken", error402);
        }
        throw error402;
      }
      throw error;
    }
  }

  const contextValue = useMemo(() => ({ api }), []);

  return (
    <apiContext.Provider value={contextValue}>{children}</apiContext.Provider>
  );
};

export const useApiProvider = () => useContext(apiContext);

export default ApiProvider;
