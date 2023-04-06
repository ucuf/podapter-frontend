import axios from "axios";
import { useLocalStorageState } from "./useLocalStorageState";

type LoginData = {
  username: string;
  password: string;
};

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type RegisterData = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
};

type LogoutFunction = () => void;

export const useAuth = () => {
  const [authState, setAuthState] = useLocalStorageState("authState");

  const login = async (data: LoginData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        data
      );
      const authResponse: AuthResponse = response.data;
      setAuthState(authResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        data
      );
      const authResponse: AuthResponse = response.data;
      setAuthState(authResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const logout: LogoutFunction = () => {
    setAuthState({});
  };

  return {
    accessToken: authState.accessToken,
    refreshToken: authState.refreshToken,
    login,
    register,
    logout,
  };
};
