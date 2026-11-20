import { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../config/auth';

export interface AuthenticatedRequest extends Request {
  user?: any;
  tokenPayload?: any;
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const headers = fromNodeHeaders(req.headers);
    const session = await auth.api.getSession({
      headers,
    });

    if (!session || !session.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. Active session not found.',
      });
      return;
    }

    if ((session.user as any).isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Your account has been suspended by salon administration.',
      });
      return;
    }

    const userId = session.user.id || (session.user as any)._id;

    req.user = {
      ...session.user,
      _id: userId,
      id: userId,
    };

    req.tokenPayload = {
      id: userId,
      email: session.user.email,
      role: (session.user as any).role || 'customer',
    };

    next();
  } catch (error) {
    console.error('Better Auth session verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal authentication verification error.',
    });
  }
}
