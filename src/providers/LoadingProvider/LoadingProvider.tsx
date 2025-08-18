import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LinearProgress } from "@mui/material";
import styles from "./LoadingProvider.styles";

type LoadingContext = {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
};

type LoadingProviderType = {
  children: JSX.Element;
  isLoadingProps?: boolean;
};

export const loadingContext = React.createContext({} as LoadingContext);

const LoadingProvider: FunctionComponent<LoadingProviderType> = ({
  children,
  isLoadingProps = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (state: boolean) => {
    setIsLoading(state);
  };

  const contextValue: LoadingContext = useMemo(
    () => ({ isLoading, setLoading }),
    [isLoading]
  );

  useEffect(() => {
    setIsLoading(isLoadingProps);
  }, [isLoadingProps]);

  return (
    <loadingContext.Provider value={contextValue}>
      <LinearProgress
        color="secondary"
        style={{ ...styles.linearProgress, opacity: isLoading ? 1 : 0 }}
      />
      {children}
    </loadingContext.Provider>
  );
};

export const useLoadingProvider = () => useContext(loadingContext);

export default LoadingProvider;
