const PROVIDER_MAP: Record<string, string> = {
  'gmail.com': 'Gmail',
  'googlemail.com': 'Gmail',
  'yahoo.com': 'Yahoo',
  'ymail.com': 'Yahoo',
  'rocketmail.com': 'Yahoo',
  'hotmail.com': 'Hotmail',
  'outlook.com': 'Outlook',
  'live.com': 'Outlook',
  'msn.com': 'MSN',
  'icloud.com': 'iCloud',
  'me.com': 'Apple Mail',
  'mac.com': 'Apple Mail',
  'protonmail.com': 'Proton Mail',
  'tutanota.com': 'Tutanota',
  'zoho.com': 'Zoho Mail',
  'gmx.com': 'GMX Mail',
  'mail.com': 'Mail.com',
  'yandex.com': 'Yandex',
  'qq.com': 'QQ Mail',
  'mail.ru': 'Mail.ru',
  'aol.com': 'AOL Mail',
  'fastmail.com': 'FastMail',
  'mailfence.com': 'Mailfence',
  'seznam.cz': 'Seznam',
  'web.de': 'Web.de',
  'laposte.net': 'La Poste',
  'orange.fr': 'Orange Mail',
  'libero.it': 'Libero',
  'email.it': 'Email.it',
  'bluewin.ch': 'Bluewin',
  'shaw.ca': 'Shaw',
  'btinternet.com': 'BT Internet',
  'comcast.net': 'Comcast',
  'cox.net': 'Cox',
  'sbcglobal.net': 'SBCGlobal',
  'verizon.net': 'Verizon',
  'att.net': 'AT&T',
  'sky.com': 'Sky Mail',
  'talktalk.net': 'TalkTalk',
  'virginmedia.com': 'Virgin Media',
  'naver.com': 'Naver',
  'daum.net': 'Daum',
  '126.com': '126 Mail',
  '163.com': '163 Mail',
};


export function getProvider(domain: string): string {
  domain = domain.trim().toLowerCase();

  // 1. Exact match
  if (PROVIDER_MAP[domain]) return PROVIDER_MAP[domain];

  // 2. Fuzzy match (e.g. subdomains or similar)
  for (const [key, name] of Object.entries(PROVIDER_MAP)) {
    const keyBase = key.split('.')[0];
    if (domain.includes(keyBase)) {
      return name;
    }
  }

  return 'Unknown';
}
