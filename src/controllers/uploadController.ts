import { Request, Response } from 'express';
import { uploadToImgBB } from '../services/imgbb';

export async function handleImageUpload(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image file uploaded' });
      return;
    }

    const imageUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url: imageUrl,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Image upload failed',
    });
  }
}
