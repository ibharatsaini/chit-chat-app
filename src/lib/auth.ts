import Cookies from "js-cookie";

export const setToken = (jwt: string) => {
  if (typeof window === "undefined") {
    return;
  }
  console.log("jwt");
  Cookies.set("jwt", jwt);
};

export const removeToken = () => {
  Cookies.remove("jwt");
};

export const getTokenFromLocalCookie = () => {
  console.log(Cookies.get("jwt"));
  return Cookies.get("jwt");
};
