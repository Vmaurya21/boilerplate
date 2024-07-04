import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import { Error } from "../pages/Error/index";
import useLogout from "../hooks/auth/useLogout";
import { jwtDecode } from "jwt-decode";

export const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const logout = useLogout(location);

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const roles = decoded?.Role || "";

  if (!auth?.accessToken) {
    logout();
  }

  return allowedRoles?.includes(roles) ? (
    <Outlet />
  ) : (
    auth?.username && <Error code="403" />
  );
};

export const RequireNotAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.username ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
