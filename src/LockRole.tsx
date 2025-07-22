import React from "react";

interface LockRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const LockRole = ({ children, allowedRoles }: LockRoleProps) => {
  const userRole = localStorage.getItem("role")?.toLowerCase() ?? "";
  const allowedRolesLower = allowedRoles.map(role => role.toLowerCase());

  if (!userRole || !allowedRolesLower.includes(userRole)) {
    window.location.href = "/login"; 
    return null;
  }

  return <>{children}</>;
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location.href = "/login";
};

export default LockRole;
