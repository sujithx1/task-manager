import { createContext, useContext, useState } from "react";


interface User{
  id: string,
  name: string,
  phone: string
  role: string,
  role_details: {id: string, name: string},
  user_type: string
  
}
interface AuthContextType {
  user:  User | null;
  login: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }:{children: React.ReactNode}) => {
  const [user, setUser] = useState<User|null>(null);

  const login = () => {
    setUser({
      id: "1",
      name: "John Doe",
      phone: "1234567890",
      role: "admin",
      role_details: {id: "1", name: "Admin"},
      user_type: "admin"
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);