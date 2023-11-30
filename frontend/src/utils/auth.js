export const isAuthenticated = () => {
  const storageLogin = window.localStorage.getItem("loginUser");
  const { loginUser } = JSON.parse(storageLogin ?? "{}");
  return !!loginUser?.token;
};
