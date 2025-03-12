import { admin, auth } from "@/config/firebase-config";
import { AuthenticationError } from "@/models/error.model";
import { Request, Response, NextFunction } from "express";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers['authorization']?.split(' ')[1];
    try {
      if (!idToken) {
        throw new AuthenticationError()
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken); 
      req.user = decodedToken;
      next();
    } catch (error) {
        return res.status(403).json({ error: 'UNAUTHORIZED' });
    }
};