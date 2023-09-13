import { createContext, useCallback, useEffect, useState } from "react";
// import { useGetLoggedInQuery } from "../store/api/customers.api";
import { baseUrl } from "../utils/vars";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()
  // const { data} = useGetLoggedInQuery();
  const { pathname } = useLocation();

  const LogIn = useCallback(async () => {
    const data = await fetch(`${baseUrl}customers/loggedIn`, { method: 'GET', credentials: 'include' });
    const res = await data.json();

    if (!res && pathname !== '/password-reset') {
      navigate("/login")
    } else {
      setLoggedIn(res);
    }
  }, [navigate])

  useEffect(() => {
    LogIn();
  }, [LogIn]);

  return (
    <AuthContext.Provider value={{ loggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
