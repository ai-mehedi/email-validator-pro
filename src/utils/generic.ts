const GENERIC_USERNAMES = ['info', 'admin', 'contact', 'sales', 'support'];

export function isGeneric(username: string): boolean {
  return GENERIC_USERNAMES.includes(username);
}