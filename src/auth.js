let auth = false;

export const isAuth = () => auth;

export const setAuth = nextAuth => {
  console.log('Set auth to', nextAuth);
  auth = nextAuth;
};
