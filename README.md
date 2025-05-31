📧 email-validator-pro
A powerful Node.js email validation library that goes beyond regex.
Performs DNS/MX record checks, SMTP deliverability tests, disposable email detection, and more.

🔧 Features
✅ Format validation (RFC-compliant)

📮 MX record lookup

✉️ SMTP inbox existence check (optional)

🚫 Disposable email detection

👤 Generic username detection (e.g., admin, info)

💼 Provider and domain info

🔢 Email quality scoring

🆓 Free email provider detection (e.g., Gmail, Yahoo)

💡 Catch-all detection (optional)

⚠️ Important
If you want to check if an email inbox exists (SMTP/bounce check), make sure:

Your server allows outbound port 25 (many hosts block it by default).

You provide a valid fromEmail sender (e.g., noreply@yourdomain.com).

SMTP check is optional and disabled by default.

📦 Installation
bash
Copy
Edit
npm install email-validator-pro
🚀 Usage
Basic Example (ESM)
ts
Copy
Edit
import { validateEmail } from 'email-validator-pro';

const result = await validateEmail({
email: 'someone@example.com',
fromEmail: 'noreply@yourdomain.com',
smtpCheck: true, // Enable SMTP validation (optional)
debug: true // Optional SMTP debug logs
});

console.log(result);
Using with Express (CommonJS)
js
Copy
Edit
const { validateEmail } = require('email-validator-pro');

app.post('/validate', async (req, res) => {
const result = await validateEmail({
email: req.body.email,
fromEmail: 'noreply@yourdomain.com',
smtpCheck: true
});

res.json(result);
});
✅ Validation Result Example
json
Copy
Edit
{
"email": "someone@example.com",
"username": "someone",
"domain": "example.com",
"formatValid": true,
"hasMX": true,
"isDisposable": false,
"isGeneric": false,
"isFree": false,
"provider": "Example",
"mxRecord": "mx1.example.com",
"canReceiveEmail": {
"smtpSuccess": true,
"message": "SMTP verification passed",
"catchAll": false
},
"qualityScore": 92
}
🧪 Options
Option Type Required Description
email string ✅ Email address to validate
fromEmail string ✅ Email sender used for SMTP (if enabled)
smtpCheck boolean ❌ Enable SMTP inbox check (default: false)
debug boolean ❌ Log SMTP conversation to console

📌 Notes
SMTP validation performs a "handshake" with the mail server but does not send actual email.

Not all mail servers support catch-all detection — result may vary.

📄 License
MIT © 2025
