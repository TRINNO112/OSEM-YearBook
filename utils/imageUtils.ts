/**
 * Resolves image paths correctly for both local development and GitHub Pages production.
 *
 * @param path The relative path to the image (e.g., "/images/foo.png")
 * @returns The absolute path including the base URL if coming from vite's base config
 */
export const resolveImagePath = (path: string): string => {
  // If it's already an absolute URL (http/https), return it as is
  if (path.startsWith('http')) {
    return path;
  }

  // If path doesn't start with slash, add it
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // In production (GitHub Pages), we need to prepend the repository name
  // Vite injects import.meta.env.BASE_URL which is set to '/OSEM-YearBook/' in prod
  // and '/' in dev
  const baseUrl = import.meta.env.BASE_URL;

  // Remove trailing slash from baseUrl if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  return `${cleanBaseUrl}${cleanPath}`;
};
