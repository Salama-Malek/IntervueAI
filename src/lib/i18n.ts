/**
 * Internationalization utilities
 */

/**
 * Determine if a language code requires RTL layout
 */
export function isRtlLanguage(languageCode: string): boolean {
  const rtlPrefixes = ['ar-', 'fa-', 'ur-'];
  return rtlPrefixes.some((prefix) => languageCode.startsWith(prefix));
}

/**
 * Get text direction for a language code
 */
export function getTextDirection(languageCode: string): 'ltr' | 'rtl' {
  return isRtlLanguage(languageCode) ? 'rtl' : 'ltr';
}
