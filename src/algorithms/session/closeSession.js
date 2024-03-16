const { signOut } = require("next-auth/react");

export const closeSession = async () => {
  await signOut({ redirect: true, callbackUrl: "/" }).finally(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
};
