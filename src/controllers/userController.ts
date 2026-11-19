import { Response } from 'express';
import { User } from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';
import { connectDB } from '../config/db';

export async function getAllCustomersAdmin(
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    await connectDB();
    const customers = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve customer list' });
  }
}

export async function toggleCustomerBlockAdmin(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    await connectDB();
    const { id } = req.params;

    if (req.user && req.user._id.toString() === id) {
      res.status(400).json({ success: false, message: 'Administrators cannot block themselves' });
      return;
    }

    const targetUser = await User.findById(id);
    if (!targetUser) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (targetUser.role === 'admin') {
      res.status(403).json({ success: false, message: 'Administrative accounts cannot be blocked' });
      return;
    }

    targetUser.isBlocked = !targetUser.isBlocked;
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: `Customer ${targetUser.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        isBlocked: targetUser.isBlocked,
      },
    });
  } catch (error) {
    console.error('Toggle block error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle account block status' });
  }
}
