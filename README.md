# ZHAENG - Interactive Features for www.zhaeng.net

## 🌐 Live Demo
**Landing Page**: [https://yezhanggg.github.io/ZHAENG/](https://yezhanggg.github.io/ZHAENG/)

Visit the landing page to try out all features directly!

## Project Overview
This repository contains custom interactive features and tools for the Wix website **www.zhaeng.net**. The features built here are designed to enhance the user experience with games, interactive tools, and dynamic content.

## Design Philosophy
**Mobile-First Design** - All features are optimized for phone users first, then adapted for larger screens.

### Key Mobile Design Principles:
- Touch-friendly interfaces (large buttons, easy tapping)
- Vertical scrolling layouts
- Fast loading times
- Responsive design that works on all phone sizes
- Simple, intuitive navigation
- Minimal text input (use selections/taps when possible)

## Integration Approach
Features built in this repository will be integrated with the Wix website using:
- **External API** - Build standalone web features that can be embedded or linked from the Wix site
- **Custom embeds** - Interactive tools that can be embedded directly into Wix pages
- **Responsive design** - Ensures everything works perfectly on mobile devices

## Project Structure
```
/ZHAENG
  index.html      - Landing page showcasing all features
  /features       - Individual interactive features and games
  /api            - Backend services and APIs (if needed)
  /shared         - Shared components and utilities
  /docs           - Documentation and guides
```

## Available Features

### 📸 ZHAENG Camera
**Status**: ✅ Complete and ready to use

A mobile-optimized camera application that allows users to take photos with:
- Custom ZHAENG watermarks (border pattern + center logo)
- Automatic timestamp overlay
- GPS location data
- Save directly to phone

**Perfect for**: iPhone users, branded photo experiences, events, social media content

📁 **Location**: `/features/zhaeng-camera/`
📖 **Documentation**: [Camera Feature README](features/zhaeng-camera/README.md)
🚀 **Quick Start**: [Setup Guide](docs/QUICK_START.md)

---

### 🥠 ZHAENG Fortune Cookie
**Status**: ✅ Complete and ready to use

An interactive fortune cookie experience with beautiful animations:
- 200 unique positive fortune messages
- Tap-to-crack cookie animation
- Lucky lottery numbers (6 random numbers)
- Sparkle and confetti effects
- Share fortunes with friends
- Unlimited fortunes (tap for another)

**Perfect for**: Daily engagement, positive vibes, social sharing, user retention

📁 **Location**: `/features/fortune-cookie/`
📖 **Documentation**: [Fortune Cookie README](features/fortune-cookie/README.md)
🎨 **Design Notes**: [Design Philosophy](features/fortune-cookie/DESIGN_NOTES.md)

---

## Planned Features
- More interactive games (puzzle games, trivia, mini-games)
- Additional custom tools and utilities
- Dynamic content features
- More mobile-optimized experiences
- Quiz/poll tools
- Interactive galleries

## Tech Stack
- **HTML5**: Canvas API, MediaDevices API, Geolocation API
- **CSS3**: Mobile-first responsive design
- **Vanilla JavaScript**: No dependencies, fast loading
- **Deployment**: GitHub Pages, Netlify, or Vercel

## Getting Started

### Quick Deploy (All Features)
1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `main` branch, `/ (root)` folder
   - Save and wait 2-3 minutes

2. **Your features will be live at**:
   - Landing Page: `https://YOUR_USERNAME.github.io/ZHAENG/`
   - Camera: `https://YOUR_USERNAME.github.io/ZHAENG/features/zhaeng-camera/`
   - Fortune Cookie: `https://YOUR_USERNAME.github.io/ZHAENG/features/fortune-cookie/`

3. **Integrate with Wix**:
   - Read the [Wix Integration Guide](docs/WIX_INTEGRATION_GUIDE.md)
   - Read the [Domain Setup Guide](docs/DOMAIN_SETUP_GUIDE.md)
   - Use iframe embeds or direct links
   - Test on your iPhone

### For Individual Features
- **ZHAENG Camera**: [Camera README](features/zhaeng-camera/README.md)
- **Fortune Cookie**: [Fortune Cookie README](features/fortune-cookie/README.md)

### For Development
Each feature has its own README with detailed setup and customization instructions.

---
*This is a work-in-progress project to extend www.zhaeng.net with custom interactive features.*