import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  // if already logged in
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PublicRoute;