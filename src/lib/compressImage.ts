/**
 * Redimensionne et recompresse une image côté navigateur avant upload, pour
 * éviter d'envoyer des photos brutes de plusieurs Mo vers Supabase Storage.
 */
export async function compressImage(
  file: File,
  { maxDimension = 2000, quality = 0.8 }: { maxDimension?: number; quality?: number } = {},
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );

  return blob ?? file;
}
