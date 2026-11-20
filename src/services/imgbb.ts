export async function uploadToImgBB(
  fileBuffer: Buffer,
  fileName: string = 'salon-service.jpg'
): Promise<string> {
  const apiKey = process.env.IMGBB_API_KEY?.replace(/['"\s]/g, '').trim();
  if (!apiKey) {
    throw new Error('IMGBB_API_KEY environment variable is not configured');
  }

  const formData = new FormData();
  const blob = new Blob([fileBuffer]);
  formData.append('image', blob, fileName);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as any;

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to upload image to ImgBB');
  }

  return data.data.url;
}
