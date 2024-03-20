import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl } from "../utils/vars";

const AuthAdminContext = createContext();

function AuthAdminContextProvider(props) {
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);

  const LogInAdmin = useCallback(async () => {
    const data = await fetch(`${baseUrl}customers/loggedInAdmin`, { method: 'GET', credentials: 'include' });
    const res = await data.json();
    console.log(res)
    if (!res) {
      setLoggedInAdmin(false);
    } else {
      setLoggedInAdmin(res);
    }
  }, [])

  useEffect(() => {
    LogInAdmin();
  }, [LogInAdmin]);

  return (
    <AuthAdminContext.Provider value={{ loggedInAdmin }}>
      {props.children}
    </AuthAdminContext.Provider>
  );
}

export default AuthAdminContext;
export { AuthAdminContextProvider };
