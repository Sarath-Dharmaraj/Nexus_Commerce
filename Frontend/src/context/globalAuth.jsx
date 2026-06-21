import { createContext, useContext, useReducer, useEffect } from "react";
import api from "../api/api";

const AuthContextNode = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, user: action.payload, loading: false };
    case "CLEAR_PROFILE":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  const fetchData = async () => {
    try {
      const response = await api.get("/auth/me");
      dispatch({ type: "SET_PROFILE", payload: response.data.user });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      dispatch({ type: "CLEAR_PROFILE" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthContextNode.Provider value={{ ...state, refreshPage: dispatch }}>
      {children}
    </AuthContextNode.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContextNode);
