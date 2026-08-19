export function authGuard(auth, redirect = "/login") {
  return context => {
    if (!auth || typeof auth.authenticated !== "function") {
      throw new TypeError("authGuard requires an auth service with authenticated().");
    }

    if (auth.authenticated()) {
      return true;
    }

    if (typeof window !== "undefined" && window.Router) {
      window.Router.navigate(redirect);
    }

    return false;
  };
}

export default authGuard;
