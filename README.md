# ZHAENG - Interactive Features for www.zhaeng.com

## Project Overview
This repository contains custom interactive features and tools for the Wix website **www.zhaeng.com**. The features built here are designed to enhance the user experience with games, interactive tools, and dynamic content.

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

## Planned Features
- Interactive games
- Additional custom tools and utilities
- Dynamic content features
- More mobile-optimized experiences

## Tech Stack
- **HTML5**: Canvas API, MediaDevices API, Geolocation API
- **CSS3**: Mobile-first responsive design
- **Vanilla JavaScript**: No dependencies, fast loading
- **Deployment**: GitHub Pages, Netlify, or Vercel

## Getting Started

### For the ZHAENG Camera Feature
1. Read the [Quick Start Guide](docs/QUICK_START.md)
2. Enable GitHub Pages on this repository
3. Embed or link from your Wix site at www.zhaeng.com
4. Test on your iPhone

### For Development
Each feature has its own README with detailed setup and customization instructions.

---
*This is a work-in-progress project to extend www.zhaeng.com with custom interactive features.*