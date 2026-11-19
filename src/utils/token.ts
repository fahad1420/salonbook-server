import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  email: string;
  role: 'customer' | 'admin';
}

export function generateToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET || process.env.BETTER_AUTH_SECRET || 'salonbook_jwt_fallback_secret_32chars';
  return jwt.sign(payload, secret, {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = process.env.JWT_SECRET || process.env.BETTER_AUTH_SECRET || 'salonbook_jwt_fallback_secret_32chars';
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
}
