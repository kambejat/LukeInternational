import  { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

interface UserProps {
  username: string;
  user_id: number;
  first_name: string;
  last_name: string;
  role: string;
}

interface AuthContextProps {
  user: UserProps | null;
  token: string | null;
  loginUser: (loginData: LoginDataProps) => Promise<void>;
  logoutUser: any;
  registerUser: (registerData: RegisterDataProps) => Promise<void>;
  isServerError: string | boolean;
}

interface RegisterDataProps {
  username: string;
  password: string;
  email: string;
}

interface LoginDataProps {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;

function setUserObject(user: UserProps | null): UserProps | null {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const [user, setUser] = useState<UserProps | null>(null);
  const [isServerError, setIsServerError] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken: any = localStorage.getItem("token");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);
      const decodedToken: any = jwtDecode(parsedToken); 
      setUser(setUserObject(decodedToken));
    }
    setIsLoading(false);
  }, []);

  const registerUser = async (registerData: RegisterDataProps) => {
    try {
      const response = await axios.post(`/api/v1/register/`, registerData);
      if (response.status === 201) {
        toast.success("Successful registration! You can now login.");
        setIsServerError(false);
        navigate("/login");
      } else {
        navigate("/register");
      }
    } catch (error: any) {
      setIsServerError(error.response.data);
      toast.error(error.response.data);
    }
  };

  const loginUser = async (loginData: LoginDataProps) => {
    try {
      const response = await axios.post(`/api/v1/login/`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(response.data.access);
        const loggedInUser: UserProps = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        setIsServerError(false);
        toast.success(`Welcome back ${loginData.username}`);
        navigate(`/dashboard/${1}/${1}`);
      }
    } catch (error: any) {
      setIsServerError(error.response);
      navigate("/login");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/login");
      window.location.reload();
    }
  };

  const contextData: AuthContextProps = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!isLoading && children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
