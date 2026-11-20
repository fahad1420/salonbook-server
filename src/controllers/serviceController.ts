import { Request, Response } from 'express';
import { Service, SERVICE_CATEGORIES, ServiceCategory } from '../models/Service';
import { connectDB } from '../config/db';

const BROKEN_404_IMAGE = 'photo-1512290900672-1f416d860d5b';
const VERIFIED_FACIAL_IMAGE =
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80';

// Auto-heal legacy or invalid image URLs on the fly and persist fix
function sanitizeServiceImage(service: any) {
  if (service && service.image && service.image.includes(BROKEN_404_IMAGE)) {
    service.image = VERIFIED_FACIAL_IMAGE;
    Service.updateOne({ _id: service._id }, { image: VERIFIED_FACIAL_IMAGE }).exec().catch(() => {});
  }
  return service;
}

export async function getActiveServices(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { search, category, sort, limit, page } = req.query;

    const query: Record<string, unknown> = {
      status: 'active',
    };

    if (search && typeof search === 'string' && search.trim() !== '') {
      query.serviceName = { $regex: search.trim(), $options: 'i' };
    }

    if (
      category &&
      typeof category === 'string' &&
      category.trim() !== '' &&
      category !== 'all'
    ) {
      query.category = category.trim();
    }

    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === 'price_asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 };
    }

    const totalCount = await Service.countDocuments(query);
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = parseInt(limit as string, 10);

    let serviceQuery = Service.find(query).sort(sortOption);

    if (!isNaN(limitNum) && limitNum > 0) {
      serviceQuery = serviceQuery.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    const services = await serviceQuery.exec();
    services.forEach(sanitizeServiceImage);

    const totalPages = !isNaN(limitNum) && limitNum > 0 ? Math.ceil(totalCount / limitNum) : 1;

    res.status(200).json({
      success: true,
      count: services.length,
      totalCount,
      currentPage: pageNum,
      totalPages,
      data: services,
    });
  } catch (error) {
    console.error('Get active services error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve services' });
  }
}

export async function getServiceById(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    sanitizeServiceImage(service);

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Get service by id error:', error);
    res.status(500).json({ success: false, message: 'Invalid service identifier' });
  }
}

export async function getAllServicesAdmin(_req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const services = await Service.find().sort({ createdAt: -1 });
    services.forEach(sanitizeServiceImage);

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('Admin get services error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch services list' });
  }
}

export async function createService(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { serviceName, category, description, price, duration, image, status } = req.body;

    if (!serviceName || typeof serviceName !== 'string' || serviceName.trim().length === 0) {
      res.status(400).json({ success: false, message: 'Service name is required' });
      return;
    }

    if (!category || !SERVICE_CATEGORIES.includes(category as ServiceCategory)) {
      res.status(400).json({
        success: false,
        message: `Valid category is required. Options: ${SERVICE_CATEGORIES.join(', ')}`,
      });
      return;
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      res.status(400).json({ success: false, message: 'Description is required' });
      return;
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      res.status(400).json({ success: false, message: 'Price must be greater than 0' });
      return;
    }

    const parsedDuration = Number(duration);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      res.status(400).json({ success: false, message: 'Duration must be greater than 0 minutes' });
      return;
    }

    if (!image || typeof image !== 'string' || !image.trim().startsWith('http')) {
      res.status(400).json({
        success: false,
        message: 'A valid hosted image URL from ImgBB is required',
      });
      return;
    }

    const newService = await Service.create({
      serviceName: serviceName.trim(),
      category,
      description: description.trim(),
      price: parsedPrice,
      duration: parsedDuration,
      image: image.trim(),
      status: status === 'inactive' ? 'inactive' : 'active',
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService,
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ success: false, message: 'Failed to create salon service' });
  }
}

export async function updateService(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { id } = req.params;
    const { serviceName, category, description, price, duration, image, status } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    if (serviceName !== undefined) service.serviceName = serviceName.trim();
    if (category !== undefined) {
      if (!SERVICE_CATEGORIES.includes(category as ServiceCategory)) {
        res.status(400).json({ success: false, message: 'Invalid category' });
        return;
      }
      service.category = category;
    }
    if (description !== undefined) service.description = description.trim();
    if (price !== undefined) {
      const p = Number(price);
      if (isNaN(p) || p <= 0) {
        res.status(400).json({ success: false, message: 'Price must be greater than 0' });
        return;
      }
      service.price = p;
    }
    if (duration !== undefined) {
      const d = Number(duration);
      if (isNaN(d) || d <= 0) {
        res.status(400).json({ success: false, message: 'Duration must be greater than 0' });
        return;
      }
      service.duration = d;
    }
    if (image !== undefined) service.image = image.trim();
    if (status !== undefined && (status === 'active' || status === 'inactive')) {
      service.status = status;
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ success: false, message: 'Failed to update service' });
  }
}

export async function toggleServiceStatus(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    service.status = service.status === 'active' ? 'inactive' : 'active';
    await service.save();

    res.status(200).json({
      success: true,
      message: `Service status updated to ${service.status}`,
      data: service,
    });
  } catch (error) {
    console.error('Toggle status error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle service status' });
  }
}

export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    await connectDB();
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Service removed successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
}
