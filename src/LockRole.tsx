import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LockRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const LockRole = ({ children, allowedRoles }: LockRoleProps) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role")?.toLowerCase() ?? "";
  const allowedRolesLower = allowedRoles.map(role => role.toLowerCase());

  useEffect(() => {
    if (!userRole || !allowedRolesLower.includes(userRole)) {
      navigate("/login", { replace: true });
    }
  }, [userRole, allowedRolesLower, navigate]);

  if (!userRole || !allowedRolesLower.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location.href = "/login";
};

export default LockRole;
