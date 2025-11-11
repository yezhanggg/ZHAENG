# Quick Start Guide - ZHAENG Camera on Wix

## Goal
Get the ZHAENG Camera feature working on your Wix website (www.zhaeng.com) so iPhone users can take photos with watermarks.

## Step-by-Step Setup (Easiest Method)

### Step 1: Host on GitHub Pages (5 minutes)

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/ZHAENG`

2. Click **Settings** (top navigation)

3. Scroll down to **Pages** (left sidebar)

4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`

5. Click **Save**

6. Wait 1-2 minutes, then your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/ZHAENG/features/zhaeng-camera/
   ```

7. Test it on your iPhone Safari browser to make sure it works!

### Step 2: Add to Wix Website (10 minutes)

#### Option A: Embed in a Page (Full Experience)

1. Log into your Wix account and open your site editor

2. Create a new page or edit an existing one:
   - Click **Pages** (left menu)
   - Add a new page called "Camera" or "Photo Booth"

3. Add an HTML embed:
   - Click **Add** (+) button
   - Select **Embed** → **HTML iframe**
   - Drag it onto your page

4. Click on the iframe element, then click **Enter Code**

5. Paste this code (replace `YOUR_USERNAME` with your GitHub username):
   ```html
   <iframe
       src="https://YOUR_USERNAME.github.io/ZHAENG/features/zhaeng-camera/"
       style="width: 100%; height: 100vh; border: none; position: fixed; top: 0; left: 0;"
       allow="camera; geolocation"
       allowfullscreen>
   </iframe>
   ```

6. Click **Update**

7. Resize the iframe to fill the entire page

8. **Publish** your site

#### Option B: Button Link (Simple)

1. In Wix editor, add a **Button** to your homepage

2. Edit button text: "📸 Take a Photo" or "ZHAENG Camera"

3. Click **Link** → **Web Address**

4. Paste your GitHub Pages URL:
   ```
   https://YOUR_USERNAME.github.io/ZHAENG/features/zhaeng-camera/
   ```

5. Select: **Open link in: New Window**

6. **Publish** your site

### Step 3: Test on Your iPhone

1. Open Safari on your iPhone

2. Go to www.zhaeng.com

3. Navigate to your Camera page or click the button

4. Grant camera and location permissions when prompted

5. Take a photo - you should see:
   - "ZHAENG" watermarks around the edges
   - Timestamp at the bottom
   - Location coordinates
   - Large center watermark

6. Click **Save Photo** to download to your phone

## Troubleshooting

### "Camera access denied"
- Go to iPhone Settings → Safari → Camera
- Enable camera access
- Refresh the page

### "Page won't load"
- Make sure GitHub Pages is enabled
- Wait a few minutes for deployment
- Check the URL is correct

### "Can't save photo"
- Check iPhone storage space
- Try using Safari (not Chrome)
- Check download permissions

### Watermark doesn't look good
- Open the file: `features/zhaeng-camera/index.html`
- Find the `drawWatermark()` function
- Adjust font sizes and opacity values
- Commit and push changes

## Next Steps

### Customize the Look
Edit `index.html` to change:
- Colors: Search for `#4A90E2` and replace with your brand color
- Text: Change "ZHAENG" to anything you want
- Watermark style: Adjust in the `drawWatermark()` function

### Add to Your Navigation
In Wix:
1. Add "Camera" to your main menu
2. Make it prominent for visitors
3. Add an icon or emoji to make it eye-catching

### Promote It
- Add to your homepage with a call-to-action
- Share on social media
- Tell users they can take branded photos

## Need Help?

1. Check the full documentation: `features/zhaeng-camera/README.md`
2. Test locally first before hosting
3. Open an issue on GitHub if something doesn't work

---
**You're all set!** Your mobile camera feature should now be live on www.zhaeng.com 🎉
