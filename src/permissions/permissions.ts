export const isSuperAdmin = (roles: string[]) => {
  return roles.some(
    (role) => role.toLowerCase() === "super admin"
  );
};

export const isAdmin = (roles: string[]) => {
  return roles.includes("admin");
};