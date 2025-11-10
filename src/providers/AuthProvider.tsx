import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Agregar luego una llamada a la api para validar token
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  function login(token: string) {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);

    const origin = location.state?.from?.pathname || "/dashboard/home";
    navigate(origin, { replace: true });
  }

  function logout() {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
