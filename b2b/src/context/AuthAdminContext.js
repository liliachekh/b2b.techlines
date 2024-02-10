import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/vars";
import { useLocation, useNavigate } from "react-router-dom";

const AuthAdminContext = createContext();

function AuthAdminContextProvider(props) {
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const navigate = useNavigate();

  const LogInAdmin = useCallback(async () => {
    const data = await fetch(`${baseUrl}customers/loggedInAdmin`, { method: 'GET', credentials: 'include' });
    const res = await data.json();
    console.log(res)
    if (!res) {
      navigate("/not-found")
      setLoggedInAdmin(false);
    } else {
      setLoggedInAdmin(res);
    }
  }, [navigate])

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

// export function useAuthAdminContext() {
//     const context = useContext(AuthAdminContext);
//     if (!context) {
//         throw new Error("useAuthAdminContext must be used within a AuthAdminContextProvider")
//     }
//     return context;
// }