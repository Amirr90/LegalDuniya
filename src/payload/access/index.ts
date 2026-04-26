import type { Access, FieldAccess } from "payload";

export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";
export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);
export const isPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};
export const anyone: Access = () => true;

/** Field-level variant of {@link isAdmin} (FieldAccess returns boolean only). */
export const isAdminField: FieldAccess = ({ req: { user } }) => user?.role === "admin";
