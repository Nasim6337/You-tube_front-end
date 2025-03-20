import { createContext, useState, useEffect,useContext } from 'react';

// Create the context
export const LoginStatusContext = createContext();

// Provide context to children
export function LoginStatusContextProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem("userLoggedIn")|| null);



  useEffect(() => {
    localStorage.setItem("userLoggedIn",userLoggedIn);
  }, [setUserLoggedIn]);

  return (
    <LoginStatusContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </LoginStatusContext.Provider>
  );
}




