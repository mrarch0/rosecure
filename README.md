# RoSecure Website

Community safety platform for Roblox and Discord communities.

## 🌐 Live Sites

- **Production**: https://rosecure.pages.dev (from `main` branch)
- **Staging**: https://staging.rosecure.pages.dev (from `staging` branch)

## 🚀 Deployment

This site is automatically deployed via Cloudflare Pages:

### Production (main branch)
- Automatically deploys when changes are pushed to `main`
- Live at: https://rosecure.pages.dev

### Staging (staging branch)
- Automatically deploys when changes are pushed to `staging`
- Live at: https://staging.rosecure.pages.dev
- Used for review before merging to main

## 📁 Project Structure

```
RoSecure/
├── index.html          # Homepage
├── about.html          # About page
├── faq.html            # FAQ page
├── docs.html           # Documentation
├── donate.html         # Donation page
├── volunteer.html      # Volunteer application
├── moderation.html     # Moderation info
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── eula.html           # End-user license
├── transparency.html   # Transparency report
├── style.css           # Global styles
├── script.js           # JavaScript functionality
├── rosecurelogo.png    # Logo
├── _headers            # Cloudflare Pages headers
└── _redirects          # Cloudflare Pages redirects

```

## 🔧 Cloudflare Pages Setup

### Initial Setup
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create Application** → **Pages**
3. Connect to GitHub and select `mrarch0/rosecure`

### Build Configuration
- **Framework preset**: None
- **Build command**: (leave empty)
- **Build output directory**: `/`
- **Root directory**: (leave empty)

### Branch Deployments
- **Production branch**: `main`
- **Preview branch**: `staging`

Both branches will auto-deploy on push!

## 🛠️ Development Workflow

1. **Make changes** on `staging` branch
2. **Test** at https://staging.rosecure.pages.dev
3. **Review** changes online
4. **Merge** to `main` when approved
5. **Goes live** at https://rosecure.pages.dev

## 📝 License

© 2026 RoSecure Technologies. All Rights Reserved.
