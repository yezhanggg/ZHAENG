# Domain Setup Guide: Wix + GitHub Pages

## Your Current Situation
- **Domain:** zhaeng.net (registered through Wix for 1 year)
- **Main Site:** Hosted on Wix
- **Features:** Want to host on GitHub Pages

## Recommended Setup

### Architecture
```
www.zhaeng.net (Wix)
├── Your main website (marketing, content, etc.)
└── Links/buttons to features

features.zhaeng.net (GitHub Pages)
├── /camera/          → ZHAENG Camera
└── /fortune/         → ZHAENG Fortune Cookie
```

---

## Step-by-Step Setup

### Part 1: Enable GitHub Pages (5 minutes)

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/YOUR_USERNAME/ZHAENG`

2. **Enable GitHub Pages**
   - Click **Settings** (top navigation)
   - Click **Pages** (left sidebar)
   - Under "Source":
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

3. **Wait 2-3 minutes** for initial deployment

4. **Test the default URL**
   - Your features will be live at:
     - `https://YOUR_USERNAME.github.io/ZHAENG/features/zhaeng-camera/`
     - `https://YOUR_USERNAME.github.io/ZHAENG/features/fortune-cookie/`
   - Test these URLs on your phone to make sure everything works

---

### Part 2: Configure Custom Subdomain (15 minutes)

#### Step 2A: Add DNS Record in Wix

1. **Log into Wix Dashboard**
   - Go to: https://www.wix.com/my-account/

2. **Navigate to Domains**
   - Click **Domains** in the sidebar
   - Find **zhaeng.net** and click **Manage**

3. **Access DNS Settings**
   - Look for **DNS** or **Advanced DNS** or **Manage DNS Records**
   - Click to open DNS management

4. **Add CNAME Record**
   - Click **Add Record** or **+ Add**
   - Select record type: **CNAME**
   - Fill in:
     - **Host/Name:** `features` (this creates features.zhaeng.net)
     - **Value/Points to:** `YOUR_GITHUB_USERNAME.github.io`
     - **TTL:** Leave as default (usually 3600 or "Automatic")
   - Click **Save**

**Example:**
```
Type    Host        Points To                   TTL
CNAME   features    YOUR_USERNAME.github.io     3600
```

5. **Wait 5-10 minutes** for DNS to propagate (sometimes takes up to 24 hours)

---

#### Step 2B: Configure GitHub Pages Custom Domain

1. **Go back to GitHub** → Your repository → **Settings** → **Pages**

2. **Custom domain**
   - In the "Custom domain" field, enter: `features.zhaeng.net`
   - Click **Save**

3. **DNS Check**
   - GitHub will check if the DNS is configured correctly
   - You might see: "DNS check in progress" - this is normal
   - Wait a few minutes and refresh

4. **Enable HTTPS** (IMPORTANT)
   - Once DNS check passes, check the box: **✓ Enforce HTTPS**
   - Wait 5-10 minutes for SSL certificate to be issued
   - This is REQUIRED for camera feature to work

---

### Part 3: Update Your Code (5 minutes)

Since you're using a custom domain, you need to tell GitHub Pages to use the correct paths.

Create a file called `CNAME` in the root of your repository:

```bash
# In your ZHAENG directory
echo "features.zhaeng.net" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

---

### Part 4: Update Links in Wix (10 minutes)

Now update your Wix site to link to the new URLs:

#### If using iframe embed:
```html
<iframe
    src="https://features.zhaeng.net/features/zhaeng-camera/"
    style="width: 100%; height: 100vh; border: none;"
    allow="camera; geolocation"
    allowfullscreen>
</iframe>
```

#### If using button links:
- Camera: `https://features.zhaeng.net/features/zhaeng-camera/`
- Fortune: `https://features.zhaeng.net/features/fortune-cookie/`

---

## Testing Checklist

### DNS Propagation
- [ ] Wait 5-30 minutes after adding DNS record
- [ ] Test: Open `https://features.zhaeng.net` in browser
- [ ] Should redirect to your GitHub Pages site

### SSL Certificate
- [ ] Wait 5-10 minutes after enabling HTTPS
- [ ] URL should show 🔒 (padlock) in browser
- [ ] No SSL warnings when visiting

### Camera Feature
- [ ] Open `https://features.zhaeng.net/features/zhaeng-camera/` on iPhone
- [ ] Camera permission prompt should appear
- [ ] Camera should work
- [ ] Photo should save

### Fortune Cookie
- [ ] Open `https://features.zhaeng.net/features/fortune-cookie/` on iPhone
- [ ] Cookie should crack when tapped
- [ ] Fortune should appear
- [ ] Share button should work

---

## Troubleshooting

### "DNS check unsuccessful"
**Problem:** GitHub can't verify your DNS
**Solutions:**
- Wait longer (DNS can take up to 24 hours)
- Check CNAME record points to `YOUR_USERNAME.github.io` (without https://)
- Make sure you spelled "features" correctly
- Try running: `nslookup features.zhaeng.net` in terminal

### "HTTPS not available"
**Problem:** SSL certificate not issued yet
**Solutions:**
- Wait 10-15 minutes
- Uncheck and re-check "Enforce HTTPS"
- Make sure DNS is fully propagated first

### "Page not found (404)"
**Problem:** Wrong URL or paths
**Solutions:**
- Verify you're using the correct path: `/features/zhaeng-camera/` (not `/zhaeng-camera/`)
- Check the CNAME file exists in your repo root
- Wait 2-3 minutes after pushing for GitHub to rebuild

### Camera doesn't work
**Problem:** Not using HTTPS
**Solutions:**
- Make sure "Enforce HTTPS" is checked in GitHub Pages settings
- Wait for SSL certificate
- Never use http:// - always https://

---

## Alternative: Keep Using GitHub's Default Domain

If the custom domain setup is too complex, you can skip it and just use:
- `https://YOUR_USERNAME.github.io/ZHAENG/features/zhaeng-camera/`
- `https://YOUR_USERNAME.github.io/ZHAENG/features/fortune-cookie/`

This works perfectly fine! The URLs are just longer.

---

## Cost Breakdown

| Item | Cost |
|------|------|
| Domain (zhaeng.net) | Already paid to Wix |
| Wix hosting | Whatever your current Wix plan is |
| GitHub Pages | FREE |
| SSL Certificate | FREE (auto from GitHub) |
| DNS subdomain | FREE (included with domain) |
| **Total Additional Cost** | **$0** |

---

## How DNS Works (Simple Explanation)

When someone visits `features.zhaeng.net`:

1. Browser asks: "Where is features.zhaeng.net?"
2. Wix DNS says: "It's at YOUR_USERNAME.github.io"
3. Browser goes to GitHub Pages
4. GitHub Pages serves your camera/fortune cookie

**You control the DNS** because you own the domain through Wix!

---

## Summary: What You Need

### From Wix:
1. Access to DNS settings for zhaeng.net
2. Ability to add CNAME record

### From GitHub:
1. Repository with your code (already have ✓)
2. GitHub Pages enabled
3. Custom domain configured

### Time Required:
- Initial setup: 30 minutes
- DNS propagation wait: 5 minutes - 24 hours (usually ~15 minutes)
- SSL certificate: 5-10 minutes

---

## Quick Start Commands

```bash
# 1. Create CNAME file
echo "features.zhaeng.net" > CNAME

# 2. Commit and push
git add CNAME
git commit -m "Add custom domain for GitHub Pages"
git push origin main

# 3. Wait 2-3 minutes, then check:
# https://features.zhaeng.net/features/zhaeng-camera/
```

---

## Need Help?

If you get stuck, you can:
1. Check GitHub's DNS status: Repository → Settings → Pages
2. Test DNS propagation: https://dnschecker.org/
3. Check SSL status: https://www.sslshopper.com/ssl-checker.html

---

**Ready to set this up? Start with Part 1 (Enable GitHub Pages) and work through each step!**
