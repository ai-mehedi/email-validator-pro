# 📧 email-validator-pro

A powerful Node.js email validation library that goes beyond regex.  
Performs DNS/MX record checks, SMTP deliverability tests, disposable email detection, and more.

---

## ⚠️ Important

If you want to check if an email inbox exists (SMTP/bounce check), make sure:

- Your server **allows outbound port 25** (many hosts block it by default).
- You provide a **valid `fromEmail` sender** (e.g., `noreply@yourdomain.com`).
- **SMTP check is optional** and **disabled by default**.



## 🔧 Features

- ✅ **Format validation** (RFC-compliant)
- 📮 **MX record lookup**
- ✉️ **SMTP inbox existence check** *(optional)*
- 🚫 **Disposable email detection**
- 👤 **Generic username detection** (e.g., `admin`, `info`)
- 💼 **Provider and domain info**
- 🔢 **Email quality scoring**
- 🆓 **Free email provider detection** (e.g., Gmail, Yahoo)
- 💡 **Catch-all detection** *(optional)*

## 📦 Installation

```bash
npm install email-validator-pro
```

## 📦 Installation
Basic Example (ESM)
```bash

import { validateEmail } from 'email-validator-pro';

const result = await validateEmail({
  email: 'someone@example.com',
  fromEmail: 'noreply@yourdomain.com',
  smtpCheck: true,       // Enable SMTP validation (optional)
  debug: true            // Optional SMTP debug logs
});

console.log(result);


```


Using with Express (CommonJS)

```bash
const { validateEmail } = require('email-validator-pro');

app.post('/validate', async (req, res) => {
  const result = await validateEmail({
    email: req.body.email,
    fromEmail: 'noreply@yourdomain.com',
    smtpCheck: true
  });

  res.json(result);
});


```

## ✅ Validation Result Example


```bash
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


```

## 🧪 Options

| Option    | Type    | Required | Description                                 |
|:--------- |:-------:|:--------:|:-------------------------------------------|
| email     | string  | ✅       | Email address to validate                   |
| fromEmail | string  | ✅       | Email sender used for SMTP (if enabled)    |
| smtpCheck | boolean | ❌       | Enable SMTP inbox check (default: false)   |
| debug     | boolean | ❌       | Log SMTP conversation to console            |


## 🤝 Contributing

Contributions are welcome! Whether it's reporting bugs, suggesting features, or submitting pull requests, your help is appreciated.

Please follow these guidelines:

- Fork the repository and create your branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/your-feature`)
- Open a pull request describing your changes

Make sure your code passes all tests and adheres to the existing style.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE] file for details.  
© 2025

---
## ✍️ Author

**Mehedi Hasan**  
📧 [aminulislamdev23@gmail.com](mailto:aminulislamdev23@gmail.com)   
🌐 [GitHub](https://github.com/ai-mehedi) 

## 🔑 Keywords

[Email validation](https://www.google.com/search?q=email+validation) ·
[SMTP check](https://www.google.com/search?q=SMTP+check) ·
[Disposable email detection](https://www.google.com/search?q=disposable+email+detection) ·
[MX record lookup](https://www.google.com/search?q=MX+record+lookup) ·
[Catch-all detection](https://www.google.com/search?q=catch-all+detection) ·
[Email format validation](https://www.google.com/search?q=email+format+validation) ·
[Node.js email validator](https://www.google.com/search?q=node.js+email+validator) ·
[Email quality scoring](https://www.google.com/search?q=email+quality+scoring) ·
[Generic username detection](https://www.google.com/search?q=generic+username+detection)


