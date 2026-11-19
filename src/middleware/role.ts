import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access restricted to salon administrators only',
    });
    return;
  }

  next();
}

export function requireCustomer(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
    return;
  }

  if (req.user.role !== 'customer') {
    res.status(403).json({
      success: false,
      message: 'Administrative accounts cannot submit customer bookings',
    });
    return;
  }

  next();
}
