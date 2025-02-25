import axios from "../../lib/axios";
import useAuth from "./useAuth";

/**
 * Custom hook to handle token refresh functionality.
 * @returns {Function} - Function to refresh the access token.
 */
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  /**
   * Function to refresh the access token by making a request to the server.
   * Updates the authentication context with the new access token.
   * @returns {string} - New access token received from the server.
   */
  const refreshToken = async () => {
    // Making a request to the server to refresh the token
    const response = await axios("/user/refreshToken", {});

    // Updating the authentication context with the new access token and username
    setAuth((prev) => {
      return {
        ...prev,
        username: response.data.username,
        accessToken: response.data.accessToken,
      };
    });

    // Returning the new access token received from the server
    return response.data.accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
