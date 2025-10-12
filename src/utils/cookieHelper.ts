/**
 * Helper functions for managing cookies
 */

/**
 * Get a cookie value by name
 * Note: Returns the raw cookie value without decoding.
 * Caller is responsible for URL decoding if needed.
 */
export function getCookie(name: string): string | null {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));

  return cookie ? cookie.split('=')[1] : null;
}

/**
 * Delete a cookie by name
 * Note: If your cookies are set with a specific domain, you may need to
 * configure VITE_COOKIE_DOMAIN in your .env file
 */
export function deleteCookie(name: string): void {
  const domain = import.meta.env.VITE_COOKIE_DOMAIN;
  const domainAttr = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${domainAttr}`;
}

/**
 * Check if a cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
