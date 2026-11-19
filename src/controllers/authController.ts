import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateToken } from '../utils/token';
import { AuthenticatedRequest } from '../middleware/auth';
import { connectDB } from '../config/db';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
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
        message: 'Password must be at least 6 characters and contain at least one uppercase and one lowercase letter.',
      });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Public registration strictly assigns 'customer' role
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      image: typeof image === 'string' ? image.trim() : '',
      phone: typeof phone === 'string' ? phone.trim() : '',
      role: 'customer',
      isBlocked: false,
    });

    const token = generateToken({
      id: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
        phone: newUser.phone,
        role: newUser.role,
        isBlocked: newUser.isBlocked,
      },
    });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ success: false, message: 'Failed to create account.' });
  }
}

export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user || !user.password) {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Your account has been suspended by salon administration.',
      });
      return;
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        phone: user.phone,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed.' });
  }
}

export async function googleAuth(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { name, email, image } = req.body;

    if (!email || !name) {
      res.status(400).json({ success: false, message: 'Google profile payload is missing email or name.' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    if (user) {
      if (user.isBlocked) {
        res.status(403).json({
          success: false,
          message: 'Your account has been suspended by salon administration.',
        });
        return;
      }
      if (image && !user.image) {
        user.image = image;
        await user.save();
      }
    } else {
      user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        image: image || '',
        role: 'customer',
        isBlocked: false,
      });
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: 'Authenticated with Google.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        phone: user.phone,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, message: 'Google authentication failed.' });
  }
}

export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return;
  }

  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
      phone: req.user.phone,
      role: req.user.role,
      isBlocked: req.user.isBlocked,
      createdAt: req.user.createdAt,
    },
  });
}

export async function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    await connectDB();
    const { name, image, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (name && typeof name === 'string') user.name = name.trim();
    if (image !== undefined && typeof image === 'string') user.image = image.trim();
    if (phone !== undefined && typeof phone === 'string') user.phone = phone.trim();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        phone: user.phone,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
}
