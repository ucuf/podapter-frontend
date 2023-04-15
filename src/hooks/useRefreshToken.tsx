import axios from "../api/axios";
import useAuth from "./useAuth";
import { useLocalStorageState } from "./useLocalStorageState";

function useRefreshToken() {
  const { setAuth } = useAuth();
  const [refreshToken] = useLocalStorageState("refreshToken");

  const refresh = async () => {
    try {
      const response = await axios.post("/api/v1/auth/refresh", refreshToken, {
        headers: {
          "Content-Type": "text/plain",
        },
        withCredentials: true,
      });

      const { authToken: accessToken } = response.data;
      setAuth((prev) => {
        return { ...prev, accessToken };
      });

      return accessToken;
    } catch (err) {
      console.error("Error happend when refreshing the token");
    }
  };
  return refresh;
}

export default useRefreshToken;
