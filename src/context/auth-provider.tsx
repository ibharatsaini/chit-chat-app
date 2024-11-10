// AuthContext.tsx
import { getTokenFromLocalCookie } from "@/lib/auth";
import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  user: User | null;
  handleUser: (auth: User | null) => void;
  loadingUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type User = {
  username: string;
  email: string;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoadingUser(true);
    const jwt = getTokenFromLocalCookie();

    (async function () {
    const API_DOMAIN = import.meta.env.VITE_ENVIRONMENT == 'production' ? import.meta.env.VITE_API_DOMAIN : 'http://localhost:1337'

      const { data } = await axios
        .get(`${API_DOMAIN}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((data) => data);
      if (data && data.id) {
        console.log(data.id, data);
        // setIsAuthenticated(true)
        setUser({
          email: data.email,
          username: data.username,
        });
        setLoadingUser(false);
      }
    })();
  }, []);
  const handleUser = (user: User | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ handleUser, user, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
