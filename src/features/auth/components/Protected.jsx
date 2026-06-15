// import { useAuth } from "../hooks/useAuth";
// import { Navigate } from "react-router-dom";
// import React from 'react'

// const Protected = ({children}) => {
//     const { loading,user } = useAuth()


//     if(loading){
//         return (<main><h1>Loading...</h1></main>)
//     }

//     if(!user){
//         return <Navigate to={'/login'} />
//     }
    
//     return children
// }

// export default Protected

import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading...</h2>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;