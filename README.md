# SocialPulse — Social Media Analytics & Management Dashboard

A premium, production-ready **Social Media Analytics & Management Dashboard** built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. Inspired by modern SaaS platforms like Hootsuite, Buffer, Sprout Social, Later, and Meta Business Suite.

![Theme](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-7C3AED)
![JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E)
![Responsive](https://img.shields.io/badge/Responsive-Yes-22C55E)

---

## Project Information

| | |
|---|---|
| **Project Name** | SocialPulse |
| **Type** | Frontend demo / portfolio SaaS dashboard |
| **Data** | Extensive mock datasets (no real APIs, no personal data) |
| **License** | Demo project for portfolio and learning |

### Features

- **Analytics Dashboard** — Followers, engagement, reach, growth charts, real-time activity feed
- **Post Scheduling** — Calendar, queue, caption editor, hashtag suggestions, multi-platform UI
- **Engagement Tracking** — Likes, comments, shares, saves, CTR, platform breakdowns
- **Audience Insights** — Demographics, geography, devices, interests, active hours
- **Campaign Management** — Budget, ROI, conversions, 45+ demo campaigns
- **Multi-Platform Monitoring** — Instagram, Facebook, X, LinkedIn, YouTube, TikTok, Pinterest
- **Notifications System** — 120+ notifications, toast alerts, dropdown, activity timeline
- **Hashtag Analytics** — 200 tracked hashtags with trends and performance tables
- **Media Library** — 80+ assets with grid gallery and upload UI
- **AI Content UI** — Caption generator, suggestions, voice command (frontend only)
- **Competitor Analysis** — 12 competitors with overlap and engagement comparison
- **Team Collaboration** — 25 team members, roles, permissions UI
- **Reports & Export** — PDF/CSV UI, scheduled reports, print preview
- **Security Center** — Login logs, devices, API keys, 2FA UI
- **Theme Customization** — Dark/light mode with `localStorage` persistence
- **25+ Pages** — Landing, dashboard, scheduler, calendar, and more

### Technologies Used

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism, Animations)
- Vanilla JavaScript (modular architecture)
- Canvas API (charts)
- Intersection Observer (scroll reveal)
- localStorage (theme persistence)

---

## How to Run the Project in VS Code

### Step 1: Install Visual Studio Code

1. Download VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Run the installer and complete setup
3. Launch Visual Studio Code

### Step 2: Open the Project Folder

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `Social Media` project folder (the folder containing `index.html`)
4. Click **Select Folder**

### Step 3: Install Live Server Extension

1. Click the **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X`)
2. Search for **Live Server**
3. Install **Live Server** by **Ritwick Dey**
4. Reload VS Code if prompted

### Step 4: Launch the Application

1. In the Explorer panel, locate **`index.html`**
2. **Right-click** on `index.html`
3. Click **"Open with Live Server"**
4. Your browser will open at `http://127.0.0.1:5500/index.html` (port may vary)

### Alternative: Open Without Live Server

You can double-click `index.html` to open it in a browser. For full functionality (some features work best with a local server), Live Server is recommended.

---

## Folder Structure

```
Social Media/
├── index.html              # Landing page
├── dashboard.html          # Main analytics dashboard
├── analytics.html          # Advanced analytics
├── scheduler.html          # Post scheduling
├── calendar.html           # Content calendar
├── engagement.html         # Engagement analytics
├── audience.html           # Audience insights
├── campaigns.html          # Campaign management
├── accounts.html           # Social accounts
├── notifications.html      # Notifications center
├── comments.html           # Comments & messages
├── hashtags.html           # Hashtag analytics
├── reports.html            # Reports & export
├── team.html               # Team collaboration
├── ai-content.html         # AI content suggestions
├── media.html              # Media library
├── influencers.html        # Influencer analytics
├── trends.html             # Trend monitoring
├── competitors.html        # Competitor analysis
├── heatmaps.html           # Performance heatmaps
├── profile.html            # User profile
├── subscription.html       # Subscription plans
├── settings.html           # Settings
├── security.html           # Security center
├── themes.html             # Dark/light themes
├── about.html              # About platform
├── contact.html            # Contact page
├── css/
│   ├── style.css           # Base styles & variables
│   ├── dashboard.css       # Dashboard components
│   ├── analytics.css       # Charts, heatmaps, hashtags
│   ├── themes.css          # Landing & pricing
│   └── responsive.css      # Media queries
├── js/
│   ├── data.js             # Large demo datasets
│   ├── app.js              # Core app, sidebar, layout
│   ├── charts.js           # Canvas chart rendering
│   ├── themes.js           # Theme toggle & persistence
│   ├── notifications.js    # Toasts & notification UI
│   ├── analytics.js        # Analytics page helpers
│   ├── scheduler.js        # Scheduler & calendar
│   ├── campaigns.js        # Campaign rendering
│   └── audience.js         # Audience insights
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
└── README.md
```

---

## Usage Guide

### Landing Page (`index.html`)

- Hero section with animated floating cards
- Features, platform integrations, testimonials, pricing
- CTA buttons link to the dashboard

### Analytics Dashboard (`dashboard.html`)

- Overview stats, growth charts, platform cards
- Real-time activity feed and top-performing posts
- Use sidebar to navigate all sections

### Post Scheduler (`scheduler.html`)

- Create posts with caption, platforms, date/time
- View publishing queue and 230+ scheduled posts
- Hashtag suggestions and drag-and-drop upload UI

### Campaign Management (`campaigns.html`)

- 45 campaigns with budget, ROI, and progress bars
- Filter tabs and ROI chart

### Theme Customization

- Click **🌓** in the header or visit `themes.html`
- Theme preference is saved in `localStorage`

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Focus global search |
| `Ctrl+D` | Go to dashboard |
| `Ctrl+N` | Go to notifications |

---

## Demo Datasets

All data is generated in `js/data.js`:

| Dataset | Count |
|---------|-------|
| Posts | 150+ |
| Scheduled Posts | 230+ |
| Campaigns | 45 |
| Notifications | 120 |
| Comments | 100 |
| Direct Messages | 50 |
| Hashtags | 200 |
| Team Members | 25 |
| Media Assets | 80 |
| Competitors | 12 |
| Influencers | 20 |
| Trends | 30 |
| Security Logs | 35 |
| Reports | 24 |
| Activity Feed | 80 |

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Edge 90+ | ✅ |

Uses modern CSS (`backdrop-filter`, CSS Grid, custom properties). Older browsers may have reduced visual effects.

---

## Performance Optimization

- Efficient DOM updates via template rendering
- Canvas charts resize on debounced window resize
- CSS animations use GPU-friendly transforms
- Scroll reveal via Intersection Observer (no scroll listeners)
- Modular JS loaded per page (only required scripts)

---

## Troubleshooting

### Live Server not opening

- Ensure the Live Server extension is installed and enabled
- Try **Command Palette** (`Ctrl+Shift+P`) → `Live Server: Open with Live Server`

### Charts not displaying

- Refresh the page after full load
- Resize the browser window to trigger chart redraw
- Use a local server (Live Server), not `file://` if issues persist

### Theme not saving

- Enable cookies/localStorage in your browser
- Clear site data and toggle theme again

### Sidebar not visible on mobile

- Tap the **☰** menu button in the header

---

## Screens Overview

| Page | Description |
|------|-------------|
| Home | SaaS landing with hero, features, pricing |
| Dashboard | Main admin overview |
| Analytics | Deep metrics and post tables |
| Scheduler | Post creation and queue |
| Engagement | Likes, shares, platform breakdown |
| Audience | Demographics and geography |
| Campaigns | Ad campaigns and ROI |
| Hashtags | 200 hashtag performance entries |
| AI Content | Generator and suggestions UI |
| Security | Login activity and devices |

---

## Contributing

This is a demo/portfolio project. Feel free to fork, customize colors in `css/style.css` (`:root` variables), or extend `js/data.js` with more mock data.

---

## Disclaimer

**SocialPulse** is a fictional demo platform. No real social media accounts are connected. No personal information or third-party branding is included. All metrics and names are randomly generated for demonstration purposes.

---

**Built with ❤️ using HTML, CSS, and JavaScript**
