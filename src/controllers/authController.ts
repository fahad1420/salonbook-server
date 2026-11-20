import { Request, Response } from 'express';
import { fromNodeHeaders } from '../utils/esm';
import { auth } from '../config/auth';
import { User } from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';
import { connectDB } from '../config/db';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, image, phone } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ success: false, message: 'Full name is required.' });
      return;
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).json({ success: false, message: 'Valid email address is required.' });
      return;
    }

    if (!password || typeof password !== 'string' || !PASSWORD_REGEX.test(password)) {
      res.status(400).json({
        success: false,
        message:
          'Password must be at least 6 characters and contain at least one uppercase and one lowercase letter.',
      });
      return;
    }

    const signUpRes = await auth.api.signUpEmail({
      body: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        image: typeof image === 'string' ? image.trim() : '',
        phone: typeof phone === 'string' ? phone.trim() : '',
      },
      headers: fromNodeHeaders(req.headers),
    });

    if (!signUpRes?.user) {
      res.status(400).json({ success: false, message: 'Failed to create user account.' });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token: (signUpRes as any).token || '',
      user: {
        id: signUpRes.user.id,
        _id: signUpRes.user.id,
        name: signUpRes.user.name,
        email: signUpRes.user.email,
        image: signUpRes.user.image,
        phone: (signUpRes.user as any).phone || '',
        role: (signUpRes.user as any).role || 'customer',
        isBlocked: (signUpRes.user as any).isBlocked || false,
      },
    });
  } catch (error: any) {
    console.error('Better Auth sign-up error:', error);
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || 'Failed to create account.',
    });
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const signInRes = await auth.api.signInEmail({
      body: {
        email: email.toLowerCase().trim(),
        password,
      },
      headers: fromNodeHeaders(req.headers),
    });

    if (!signInRes?.user) {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
      return;
    }

    if ((signInRes.user as any).isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Your account has been suspended by salon administration.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      token: (signInRes as any).token || '',
      user: {
        id: signInRes.user.id,
        _id: signInRes.user.id,
        name: signInRes.user.name,
        email: signInRes.user.email,
        image: signInRes.user.image,
        phone: (signInRes.user as any).phone || '',
        role: (signInRes.user as any).role || 'customer',
        isBlocked: (signInRes.user as any).isBlocked || false,
      },
    });
  } catch (error: any) {
    console.error('Better Auth sign-in error:', error);
    const status = error.statusCode || 401;
    res.status(status).json({
      success: false,
      message: error.message || 'Invalid email or password.',
    });
  }
}

export async function googleTokenAuth(req: Request, res: Response): Promise<void> {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({ success: false, message: 'Google ID token is required.' });
      return;
    }

    const signInRes = await auth.api.signInSocial({
      body: {
        provider: 'google',
        idToken: {
          token: idToken,
        },
      },
      headers: fromNodeHeaders(req.headers),
    });

    if (!('user' in signInRes) || !signInRes.user) {
      res.status(401).json({ success: false, message: 'Google authentication failed.' });
      return;
    }

    const authUser = signInRes.user;

    if ((authUser as any).isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Your account has been suspended by salon administration.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Google authentication successful.',
      token: (signInRes as any).token || '',
      user: {
        id: authUser.id,
        _id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        image: authUser.image,
        phone: (authUser as any).phone || '',
        role: (authUser as any).role || 'customer',
        isBlocked: (authUser as any).isBlocked || false,
      },
    });
  } catch (error: any) {
    console.error('Google token auth error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Google authentication failed.',
    });
  }
}

export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'User not authenticated' });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id || req.user.id,
        _id: req.user._id || req.user.id,
        name: req.user.name,
        email: req.user.email,
        image: req.user.image || '',
        phone: req.user.phone || '',
        role: req.user.role || 'customer',
        isBlocked: req.user.isBlocked || false,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve profile' });
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    await connectDB();
    const { name, phone, image } = req.body;
    const userId = req.user._id || req.user.id;

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        ...(typeof name === 'string' && name.trim() ? { name: name.trim() } : {}),
        ...(typeof phone === 'string' ? { phone: phone.trim() } : {}),
        ...(typeof image === 'string' ? { image: image.trim() } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: 'User account not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updated._id,
        _id: updated._id,
        name: updated.name,
        email: updated.email,
        image: updated.image,
        phone: updated.phone,
        role: updated.role,
        isBlocked: updated.isBlocked,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
}
