# Deployment Guide: Website Hosting & Google Workspace Setup

This guide walks you through deploying your static website (HTML, CSS, JS) and setting up **Google Workspace** (professional custom email) with your purchased domain.

---

## Part 1: Host Your Website (HTML/CSS/JS)

Since your site consists of static files, you can host it for free or very low cost. We recommend using **Netlify** or **Vercel** for the simplest setup, or **GitHub Pages**.

### Option A: Using Netlify (Recommended - Simplest & Free)
1. Go to [Netlify](https://www.netlify.com/) and sign up for a free account.
2. Drag and drop the folder containing your website files (including `index.html`, `css/`, and `js/`) into the Netlify upload box.
3. Once uploaded, go to **Site settings** > **Domain management** > **Add custom domain**.
4. Enter your domain (e.g., `nexoraio.co.in`).
5. Netlify will provide DNS settings (typically CNAME and A records, or Netlify Name Servers). Add these to your domain registrar (GoDaddy, Namecheap, Hostinger, etc.).

### Option B: Using GitHub Pages (Free)
1. Push your project files to a repository on GitHub.
2. Go to repository **Settings** > **Pages**.
3. Under **Build and deployment**, select your branch (e.g., `main`) and folder (e.g., `/root`) and click **Save**.
4. In the **Custom domain** field, enter your purchased domain and click **Save**.
5. Configure your DNS provider with the A records and CNAME record provided by GitHub.

---

## Part 2: Set Up Google Workspace (Professional Email)

Google Workspace handles professional email addresses (like `contact@yourdomain.com`). To connect it to your domain, follow these steps:

### Step 1: Sign Up for Google Workspace
1. Go to [workspace.google.com](https://workspace.google.com/) and click **Get Started**.
2. Enter your business name, number of employees, and country.
3. Select **"Yes, I have one that I can use"** when asked for a domain, and enter your purchased domain.
4. Set up your admin username (e.g., `admin@yourdomain.com` or `info@yourdomain.com`) and password.

### Step 2: Verify Domain Ownership
Before Google can send or receive emails on your domain, you must prove you own it:
1. Log into the **Google Admin Console** using your new Google Workspace credentials.
2. Follow the setup wizard to verify your domain. Google will provide a **TXT Verification Record**. It looks like this:
   * **Type**: `TXT`
   * **Host/Name**: `@` or blank
   * **Value**: `google-site-verification=YOUR_UNIQUE_CODE`
3. Log into your domain registrar (where you purchased the domain, e.g. GoDaddy) and find the **DNS Management / DNS Zone Editor** settings page.
4. Add the `TXT` record, then click **Verify** in the Google Admin Console.

### Step 3: Route Emails (Add MX Records)
To direct emails to Gmail, you need to tell your domain registrar to route mail through Google's servers:
1. In your domain registrar's **DNS Management** page, locate the **MX Records** section.
2. Delete any existing default MX records (e.g., records pointing to GoDaddy mail, Hostinger mail, etc.).
3. Add Google's MX Record:
   * **Type**: `MX`
   * **Host/Name**: `@` (or leave blank)
   * **Mail Server/Value**: `SMTP.GOOGLE.COM.` (make sure to include the dot at the end if required by your registrar)
   * **Priority**: `1`
   * **TTL**: `1 hour` or `3600`
4. Go back to the Google Admin Console and click **Activate Gmail**.

### Step 4: Add Security Records (SPF & DKIM)
To prevent your business emails from going to spam:

1. **Add SPF Record**:
   In your registrar's DNS Management, add a new TXT record:
   * **Type**: `TXT`
   * **Host/Name**: `@`
   * **Value**: `v=spf1 include:_spf.google.com ~all`

2. **Add DKIM Record**:
   * In Google Admin Console, go to **Apps** > **Google Workspace** > **Gmail** > **Authenticate email**.
   * Select your domain and click **Generate New Record**.
   * Copy the host name (`google._domainkey`) and the long value text.
   * Go to your registrar's DNS page and add a `TXT` record with those details.
   * Return to the Google Admin Console and click **Start Authentication**.