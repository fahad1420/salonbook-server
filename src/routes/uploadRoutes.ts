import { Router } from 'express';
import { handleImageUpload } from '../controllers/uploadController';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/', upload.single('image'), handleImageUpload);

export default router;
