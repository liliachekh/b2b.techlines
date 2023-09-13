import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl } from "../utils/vars";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  // const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()
  const { pathname } = useLocation();

  const LogIn = useCallback(async () => {
    const data = await fetch(`${baseUrl}customers/loggedIn`, { method: 'GET', credentials: 'include' });
    const res = await data.json();

    if (!res && pathname !== '/password-reset') {
      navigate("/login")
    } else {
      setLoggedIn(res);
    }

  }, [navigate, pathname])

  useEffect(() => {
    LogIn();
  }, [LogIn, loggedIn]);
  console.log(loggedIn)
  return (
    <AuthContext.Provider value={{ loggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
