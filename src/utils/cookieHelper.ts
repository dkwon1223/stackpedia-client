/**
 * Helper functions for managing cookies
 */

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));

  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Check if a cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
