import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useGlobalAuth } from "../context/globalAuthContext";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useGlobalAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post("/auth/google-login", {
        credential: credentialResponse.credential,
      });

      if (res.data.success) {
        setUser(res.data.user);

        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error("Google Authentication Failed:", error);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login popup was closed or failed.");
  };

  return { handleGoogleSuccess, handleGoogleError };
};
