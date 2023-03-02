import type { IoProcessMap, IoProcessMapMethods } from '@amnis/state';
import { processAuthChallenge } from './auth.challenge.js';
import { processAuthCreate } from './auth.create.js';
import { processAuthCredential } from './auth.credential.js';
import { processAuthLogin } from './auth.login.js';
import { processAuthLogout } from './auth.logout.js';
import { processAuthOtp } from './auth.otp.js';
import { processAuthRegister } from './auth.register.js';
import { processAuthVerify } from './auth.verify.js';

export const processAuthPost: IoProcessMap = {
  challenge: processAuthChallenge,
  create: processAuthCreate,
  credential: processAuthCredential,
  otp: processAuthOtp,
  register: processAuthRegister,
  login: processAuthLogin,
  logout: processAuthLogout,
  verify: processAuthVerify,
};

export const processAuth: IoProcessMapMethods = {
  post: processAuthPost,
};

export default processAuth;
