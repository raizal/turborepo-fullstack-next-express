import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export interface JWTInfo {
  name: string;
  userId: string;
}

declare module 'express' {
  interface Request {
      user?: DecodedIdToken;
  }
}
