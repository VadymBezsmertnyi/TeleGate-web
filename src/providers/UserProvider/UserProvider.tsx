import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";

// schemas
import { userDataS } from "./UserProvider.schemas";

// types
import { UserDataT } from "./UserProvider.types";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";

// helps
import {
  deleteDeviceStorage,
  getDeviceStorage,
  setDeviceStorage,
} from "@/helps/storage.help";

// constants
import {
  DEFAULT_USER_DATA,
  TOKEN_KEY_ASYNC_STORAGE,
} from "./UserProvider.constants";
import { PATHS_API } from "../paths.constants";

type UserContext = {
  userData: UserDataT | null;
  setUserData: React.Dispatch<React.SetStateAction<UserDataT | null>>;
  meUser: (isLoading?: boolean) => Promise<UserDataT | null>;
  signInGoogle: (idToken: string) => Promise<UserDataT | null>;
  signInApple: (identityToken: string) => Promise<UserDataT | null>;
  editUser: (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, any> | null | undefined
    >
  ) => Promise<boolean>;
  exitUser: () => boolean;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const userContext = React.createContext({} as UserContext);

const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
  const { api } = useApiProvider();
  const [userData, setUserData] = useState<UserDataT | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const setNewUserData = async (
    newUserData: UserDataT,
    tokens?: {
      accessToken: string;
      refreshToken: string;
    }
  ) => {
    if (tokens)
      setDeviceStorage(TOKEN_KEY_ASYNC_STORAGE, JSON.stringify(tokens));
    setUserData({
      ...DEFAULT_USER_DATA,
      ...newUserData,
    });
  };

  const meUser = async (
    isLoading: boolean = false
  ): Promise<UserDataT | null> => {
    try {
      const token = getDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
      if (!token) return null;
      if (isLoading) setLoading(true);
      const result = await api(
        PATHS_API.me,
        undefined,
        z.object({ userData: userDataS })
      );
      if (result) {
        const userData = { ...DEFAULT_USER_DATA, ...result.userData };
        setUserData(userData);
        return userData;
      }
      return null;
    } catch (error: any) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async (idToken: string): Promise<UserDataT | null> => {
    try {
      const resultCreateNewUser = await api(
        PATHS_API.loginGoogle,
        {
          method: "POST",
          data: {
            idToken,
          },
        },
        z.object({
          userData: userDataS,
          tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
        })
      );
      if (resultCreateNewUser) {
        setNewUserData(
          resultCreateNewUser.userData,
          resultCreateNewUser.tokens
        );
        return resultCreateNewUser.userData;
      }
      return null;
    } catch (error: any) {
      return null;
    }
  };

  const signInApple = async (
    identityToken: string
  ): Promise<UserDataT | null> => {
    setLoading(true);
    try {
      const resultCreateNewUser = await api(
        PATHS_API.loginApple,
        {
          method: "POST",
          data: {
            identityToken,
          },
        },
        z.object({
          userData: userDataS,
          tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
        })
      );
      if (resultCreateNewUser) {
        setNewUserData(
          resultCreateNewUser.userData,
          resultCreateNewUser.tokens
        );
        return resultCreateNewUser.userData;
      }
      return null;
    } catch (error: any) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, any> | null | undefined
    >
  ): Promise<boolean> => {
    if (userData)
      try {
        setLoading(true);
        const resultCreateNewUser = await api(
          PATHS_API.editUser,
          {
            method: "PUT",
            data: {
              ...userData,
              ...newInfoUser,
              time_token: 1,
            },
          },
          z.object({
            userData: userDataS,
            tokens: z.object({
              accessToken: z.string(),
              refreshToken: z.string(),
            }),
          })
        );

        if (resultCreateNewUser?.tokens) {
          setDeviceStorage(
            TOKEN_KEY_ASYNC_STORAGE,
            JSON.stringify(resultCreateNewUser.tokens)
          );
          setUserData({
            ...DEFAULT_USER_DATA,
            ...resultCreateNewUser.userData,
          });
        }
        return true;
      } catch (error: any) {
        if (process.env.NODE_ENV === "development") console.error(error);
        return false;
      } finally {
        setLoading(false);
      }
    else if (process.env.NODE_ENV === "development")
      console.error("User data is null");
    return false;
  };

  const exitUser = (): boolean => {
    try {
      setLoading(true);
      deleteDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
      setUserData(null);
      return true;
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const valueContext: UserContext = useMemo(
    () => ({
      userData,
      setUserData,
      signInGoogle,
      signInApple,
      editUser,
      meUser,
      exitUser,
    }),
    [userData]
  );

  useEffect(() => {
    meUser(false);
  }, []);

  return (
    <userContext.Provider value={valueContext}>{children}</userContext.Provider>
  );
};

export const useUserProvider = (): UserContext => useContext(userContext);

export default UserProvider;
