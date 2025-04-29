import { Navigate } from "react-router-dom";
import { useAuth } from "./Authentication";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login"/>;
}