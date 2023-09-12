import { createContext, useEffect, useState } from "react";
import { useGetLoggedInQuery } from "../store/api/customers.api";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const { data} = useGetLoggedInQuery();

  useEffect(() => {
      setLoggedIn(data);
  }, [data]);

  return (
    <AuthContext.Provider value={{ loggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
