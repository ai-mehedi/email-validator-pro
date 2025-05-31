import { resolveMx } from 'dns/promises';

export async function hasMXRecord(domain: string): Promise<boolean> {
  try {
    const records = await resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}

export async function getMxHost(domain: string): Promise<string | null> {
  try {
    const records = await resolveMx(domain);
    return records.sort((a, b) => a.priority - b.priority)[0].exchange;
  } catch {
    return null;
  }
}