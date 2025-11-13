/**
 * Generate a random ID for utterances and other entities
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
