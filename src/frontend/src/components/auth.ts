import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function useAuth() {
  const { identity, login, clear, isInitializing } = useInternetIdentity();
  return {
    isAuthenticated: !!identity && !isInitializing,
    isInitializing,
    login,
    logout: clear,
    principal: identity?.getPrincipal(),
  };
}
