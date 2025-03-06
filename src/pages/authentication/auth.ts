import { getCookie } from 'typescript-cookie';

export const isAuthenticated = (): boolean => {
  return Boolean(getCookie('token') && sessionStorage.getItem("curUn"));
};
  