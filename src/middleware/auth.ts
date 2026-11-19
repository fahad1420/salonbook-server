import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/token';
import { User, IUser } from '../models/User';
import { connectDB } from '../config/db';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
  tokenPayload?: TokenPayload;
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. No bearer token provided.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired session token.',
      });
      return;
    }

    await connectDB();
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User account no longer exists.',
      });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Your account has been suspended by salon administration.',
      });
      return;
    }

    req.user = user;
    req.tokenPayload = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication service failed',
    });
  }
}
