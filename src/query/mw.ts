import type { Middleware } from '@reduxjs/toolkit';

export const mwApi: Middleware = () => (next) => (action) => {
  // console.log('mwApi', action);
  next(action);
};

export default mwApi;
