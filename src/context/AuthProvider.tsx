import * as React from "react";
import { ReactNode, createContext, useState } from "react";

interface AuthContextInterface {
  auth: {
    accessToken: string;
    username: string;
    email: string;
    // password: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextInterface>({
  auth: {
    accessToken: "",
    username: "",
    // password: "",
    email: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuth: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({
    accessToken: "",
    username: "",
    // password: "",
    email: "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
