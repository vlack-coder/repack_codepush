import React, {ReactNode, createContext, useState} from 'react';

// Create the AuthContext
const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: any;
  logout: any;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Create the AuthProvider component
const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log in the user
  const login = () => {
    // Perform authentication logic, e.g., API request
    // Upon successful authentication, update isAuthenticated state
    setIsAuthenticated(true);
  };

  // Function to log out the user
  const logout = () => {
    // Perform logout logic, e.g., clear session, remove tokens
    // Update isAuthenticated state accordingly
    setIsAuthenticated(false);
  };

  // Value object to provide to consumers of the AuthContext
  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider};
