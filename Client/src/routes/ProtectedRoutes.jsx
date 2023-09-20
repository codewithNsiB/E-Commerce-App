import { Navigate, useLocation } from "react-router-dom";



export default function ProtectedRoutes( { children }) {
  const location = useLocation();
  const getToken = localStorage.getItems("userinfo");
  const token = getToken.access_token;

  if (!token) return <Navigate to={"/"} state={{ from: location }} 
  replace />;

  return children; 
}
