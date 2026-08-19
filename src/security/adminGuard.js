export function adminGuard(auth, redirect = "/login", home = "/") {
  return context => {
    if (!auth || typeof auth.authenticated !== "function") {
      throw new TypeError("adminGuard requires an auth service with authenticated().");
    }

    if (!auth.authenticated()) {
      window.Router?.navigate(redirect);
      return false;
    }

    const user = typeof auth.user === "function" ? auth.user() : auth.user;

    if (user?.role !== "admin") {
      window.Router?.navigate(home);
      return false;
    }

    return true;
  };
}

export default adminGuard;
