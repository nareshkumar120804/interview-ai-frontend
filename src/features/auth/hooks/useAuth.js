// import { useContext, useEffect } from "react";
// import { AuthContext } from "../auth.context";
// import { login, register, logout, getMe } from "../services/auth.api";



// export const useAuth = () => {

//     const context = useContext(AuthContext)
//     const { user, setUser, loading, setLoading } = context


//     const handleLogin = async ({ email, password }) => {
//         setLoading(true)
//         try {
//             const data = await login({ email, password })
//             setUser(data.user)
//             return data
//         } catch (err) {

//         } finally {
//             setLoading(false)
//         }
//     }


 

//     const handleRegister = async ({ username, email, password }) => {
//         setLoading(true)
//         try {
//             const data = await register({ username, email, password })
//             setUser(data.user)
//         } catch (err) {

//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleLogout = async () => {
//         setLoading(true)
//         try {
//             const data = await logout()
//             setUser(null)
//         } catch (err) {

//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {

//         const getAndSetUser = async () => {
//             try {

//                 const data = await getMe()
//                 setUser(data.user)
//             } catch (err) { } finally {
//                 setLoading(false)
//             }
//         }
     
//         getAndSetUser()

//     }, [])

//     return { user, loading, handleRegister, handleLogin, handleLogout }
// }


import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  // ✅ LOGIN FIXED
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });

      setUser(data?.user || null);

      return data;
    } catch (err) {
      console.error("Login error:", err.message);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ REGISTER FIXED
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });

      setUser(data?.user || null);

      return data;
    } catch (err) {
      console.error("Register error:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT FIXED
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ⚠️ FIXED getMe (IMPORTANT PART)
  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();

        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};