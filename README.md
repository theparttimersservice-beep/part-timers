# The Part-Timer's — Complete Setup Guide
## theparttimers.service@gmail.com

---

## STEP 1: Supabase Setup (Free — 10 minutes)

### 1.1 Account Banao
1. https://supabase.com jaao
2. "Start your project" click karo
3. Gmail se login karo (theparttimers.service@gmail.com)
4. "New Project" click karo
   - Name: part-timers
   - Password: koi strong password rakho (yaad rakhna)
   - Region: Southeast Asia (Singapore) — India ke liye closest
5. "Create new project" — 2 min wait karo

### 1.2 Database Tables Banao
1. Left sidebar mein "SQL Editor" click karo
2. "New Query" click karo
3. supabase-setup.sql file ka sara content copy karo
4. "Run" button dabao (ya Ctrl+Enter)
5. "Success" message aayega

### 1.3 API Keys Lo
1. Left sidebar → Settings → API
2. Yeh do cheezein copy karo:
   - "Project URL" — looks like: https://abcdefgh.supabase.co
   - "anon public" key — long string hai

### 1.4 index.html mein Keys Daalo
index.html file open karo, line ~351 mein:
```
const SUPA_URL = 'YOUR_SUPABASE_URL';     // Yahan apna Project URL daalo
const SUPA_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Yahan apna anon key daalo
```
Replace karo apni real values se.

### 1.5 Admin Panel mein bhi Keys Daalo
admin.html file open karo, same jagah:
```
const SUPA_URL = 'YOUR_SUPABASE_URL';
const SUPA_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

### 1.6 Phone OTP Enable Karo
1. Supabase Dashboard → Authentication → Providers
2. "Phone" enable karo
3. Free testing ke liye: Test OTPs ON karo
   - Test phone: koi bhi number
   - Test OTP: 123456 (testing mein)
4. Production ke liye: Twilio connect karo (baad mein)

### 1.7 Storage Buckets Banao
1. Supabase → Storage → "New Bucket"
2. Bucket 1: Name = "profiles" → Public ON → Create
3. Bucket 2: Name = "listings" → Public ON → Create
4. Bucket 3: Name = "avatars" → Public ON → Create

### 1.8 Admin panel mein bhi same keys
admin.html line ~20 mein same SUPA_URL aur SUPA_KEY daalo.

---

## STEP 2: GitHub Pages pe Deploy

### 2.1 GitHub Account
1. https://github.com jaao
2. Sign up (Gmail se)
3. New Repository → Name: "part-timers" → Public → Create

### 2.2 Files Upload
1. "uploading an existing file" click karo
2. Yeh 4 files drag karo:
   - index.html
   - admin.html
   - README.md
   - supabase-setup.sql
3. "Commit changes" click karo

### 2.3 Pages ON Karo
1. Repository → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: main → / (root) → Save
4. 2-3 minute wait karo
5. URL milega: https://[tumhara-username].github.io/part-timers/

### 2.4 Admin Panel URL
https://[tumhara-username].github.io/part-timers/admin.html
- Username: admin
- Password: admin@parttimers123
(Settings mein jaake change karo)

---

## STEP 3: WhatsApp Business Setup (Free)

### WhatsApp Business App (Phone pe)
1. WhatsApp Business app download karo
2. Apna number register karo
3. Business name: "The Part-Timer's"
4. Profile photo, description add karo

### index.html mein WhatsApp number daalo
Line ~355 mein:
```
const WA_NUMBER = '91XXXXXXXXXX'; // Apna 10-digit mobile (91 + number)
```
Example: 919876543210

### Quick Reply Messages (Automatic bhejega)
Booking confirm hone par customer ko automatically WhatsApp message jayega.
Worker ko bhi notification jayegi.

---

## STEP 4: Supabase Realtime ON Karo

### Database Realtime
1. Supabase → Database → Replication
2. "bookings" table → Enable Realtime
3. "orders" table → Enable Realtime
4. "listings" table → Enable Realtime

Ab jab bhi koi booking hogi — customer ke phone pe live status update hoga!

---

## STEP 5: Testing

### Test Flow
1. Website open karo
2. Register karo (any phone number)
3. OTP: 123456 (test mode mein)
4. Service book karo
5. Admin panel mein dekho — booking appear hogi
6. Admin se status change karo — user ke page pe live update hoga

### Test Credentials
- Any 10-digit number se register kar sakte ho
- Test OTP: 123456

---

## Costs — Sab Free

| Service | Free Limit | Paid |
|---------|-----------|------|
| GitHub Pages | Unlimited | Free forever |
| Supabase DB | 500MB, 50k users | $25/month after |
| Supabase Storage | 1GB | $0.021/GB after |
| Supabase Realtime | Unlimited | Free |
| WhatsApp Business | Unlimited | Free |

**Total monthly cost: ₹0** (jab tak 50,000 users nahi ho jaate)

---

## Troubleshooting

**OTP nahi aa raha?**
→ Supabase → Auth → Phone provider ON hai? Test mode ON hai?

**Photos upload nahi ho rahi?**
→ Supabase → Storage → Bucket "profiles" public hai?

**Admin data nahi dikh raha?**
→ Admin.html mein SUPA_URL aur SUPA_KEY same hai index.html se?

**Realtime kaam nahi kar raha?**
→ Database → Replication → Tables enabled hain?

---

## Support
Email: theparttimers.service@gmail.com
