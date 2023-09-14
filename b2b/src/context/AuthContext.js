import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl } from "../utils/vars";
import { useLocation, useNavigate } from "react-router-dom";
// import { useGetLoggedInQuery } from "../store/api/customers.api";

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
      setLoggedIn(false);
    } else {
      setLoggedIn(res);
    }
  }, [navigate, pathname])

  useEffect(() => {
    LogIn();
  }, [LogIn]);

  // const [loggedIn, setLoggedIn] = useState(undefined);

  // const { data } = useGetLoggedInQuery();

  // useEffect(() => {
  //   setLoggedIn(data);
  // }, [data]);

  return (
    <AuthContext.Provider value={{ loggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
