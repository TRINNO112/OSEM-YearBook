/**
 * Resolves image paths correctly for both local development and GitHub Pages production.
 *
 * @param path The relative path to the image (e.g., "/images/foo.png")
 * @returns The absolute path including the base URL if coming from vite's base config
 */
export const resolveImagePath = (path: string | undefined | null): string | null => {
  if (!path) return null;

  // If it's already an absolute URL (http/https), return it as is
  if (path.startsWith('http')) {
    return path;
  }

  // If the path already contains the base URL (repo name), don't add it again
  // preventing double prefixes like /OSEM-YearBook/OSEM-YearBook/...
  if (path.includes('/OSEM-YearBook/')) {
     return path;
  }

  // Remove leading slash if present to avoid double slashes when joining
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Use Vite's base URL environment variable
  // In dev: '/'
  // In prod: '/OSEM-YearBook/'
  const baseUrl = import.meta.env.BASE_URL;

  return `${baseUrl}${cleanPath}`;
};
