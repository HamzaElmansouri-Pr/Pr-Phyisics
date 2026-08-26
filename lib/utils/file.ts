/**
 * validateImageFile - Validates the file's MIME type using magic numbers (file headers)
 * and checks the maximum size limit.
 * 
 * @param file The File object (e.g. from FormData)
 * @param maxSizeMb Maximum allowed size in Megabytes (default 2MB)
 * @returns boolean True if valid, false otherwise.
 */
export async function validateImageFile(file: File, maxSizeMb: number = 2): Promise<boolean> {
  // Check size limit
  const maxSizeBytes = maxSizeMb * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return false;
  }

  // We need at least 12 bytes to check all our magic numbers (WEBP requires 12)
  if (file.size < 12) {
    return false;
  }

  const arrayBuffer = await file.slice(0, 12).arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  // JPEG: FF D8 FF
  const isJpeg = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;

  // PNG: 89 50 4E 47 0D 0A 1A 0A (we check first 4: 89 50 4E 47)
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;

  // GIF: 47 49 46 38 ('GIF8')
  const isGif = bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38;

  // WEBP: 'RIFF' + 4 bytes + 'WEBP'
  const isWebp = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && 
                 bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;

  return isJpeg || isPng || isGif || isWebp;
}
