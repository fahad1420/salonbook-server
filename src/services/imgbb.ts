export async function uploadToImgBB(
  fileBuffer: Buffer,
  fileName?: string
): Promise<string> {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('IMGBB_API_KEY environment variable is not configured');
  }

  const base64Data = fileBuffer.toString('base64');
  const formData = new URLSearchParams();
  formData.append('image', base64Data);
  if (fileName) {
    formData.append('name', fileName);
  }

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to upload image to ImgBB');
  }

  return data.data.url;
}
