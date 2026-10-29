# Wildflower & Wax E-Commerce Hub

## Student Information
- **Name:** Shalom Tinevimbo
- **Surname:** Dutuma
- **Student Number:** ST10489972
- **Module Code:** WEDE5020

## Project Overview
Wildflower & Wax is an organic, home-based artisanal candle and wellness studio located in Pretoria, South Africa. This project establishes a responsive, accessible, and fully interactive digital storefront designed to transition the brand from physical local marketplace stalls to a nationwide e-commerce site.

## Website Goals and Objectives
- **Main Goal:** Build an accessible, clean digital storefront to showcase boutique home fragrance collections and process orders smoothly online.
- **Visitor Target (KPI 1):** Reach 1,500 monthly unique visitors within the first six months of launch.
- **Sales Conversion Target (KPI 2):** Achieve a minimum 3% shopper conversion rate.
- **Community Growth (KPI 3):** Gather 200 email newsletter sign-ups during the initial launch month.

## Deployment & Hosting
- **Deployment Target:** GitHub Pages
- **Live Site URL:** `https://<your-github-username>.github.io/<your-repo-name>/`
- **Repository URL:** `https://github.com<your-github-username>/<your-repo-name>`

## Key Features & Enhancements

### 1. Interactive Functionality (JavaScript)
- **Universal Search Drawer & Popup:** Implemented a search feature that toggles the native `#searchPanel` drawer on home/product pages and generates a popup fallback on secondary pages (About, Contact, Enquiry, Cart), redirecting search queries directly to `products.html?search=...`.
- **Live Catalog Filtering:** Dynamic real-time filtering on `products.html` allowing users to search and filter products by scent profile and wax type.
- **Gallery Lightbox:** High-resolution product image modal allowing users to expand and view candle items in detail.
- **FAQ Accordions:** Dynamic `<details>` / `.faq-question` toggle elements with `aria-expanded` attributes for accessible Q&A navigation.
- **Cart State Management:** Unified local storage management (`localStorage`) that dynamically calculates item counts and updates the global `.cart-count` badge across all pages.

### 2. Form Handling & Validation
- **Enquiry Form (`enquiry.html`):** Custom bulk order and stockist enquiry form featuring client-side validation rules (min-length checks, select options, and numeric limits) with automatic redirect to `Success.html`.
- **Contact Form (`contact.html`):** General messaging interface with email format validation and dynamic `mailto:` compilation that prepares user messages directly for transmission.
- **Checkout Form (`checkout.html`):** Input validation enforcing 16-digit card verification, MM/YY expiration rules, 3-digit CVV checks, and shipping address compliance.

### 3. Search Engine Optimization (SEO) & Performance
- **On-Page SEO:** Keyword-optimized page title tags, meta descriptions, descriptive image alt text, and structured heading hierarchies (H1–H3) across all templates.
- **Technical SEO Files:** Added `robots.txt` and `sitemap.xml` in the root directory to guide search engine crawlers.
- **Page Speed & Security:** Scripts loaded via non-blocking DOM listeners, minimal lightweight styling, and forced HTTPS security provided by GitHub Pages deployment.
- **Off-Page SEO:** Integrated social media links (Instagram, Facebook, Pinterest) in the footer to foster backlink authority and social reach.

## Folder Map & File Structure
```text
├── index.html            # Main landing portal with brand overview & collection teasers
├── products.html         # Shop catalog with search, filters, & lightbox image gallery
├── about.html            # Company history, values, & sustainability goals
├── enquiry.html          # Custom bulk order enquiry form with input validation
├── contact.html          # Contact form, direct mail line, & Pretoria studio location details
├── Success.html          # Confirmation page rendered after valid form submissions
├── robots.txt            # Search engine crawler instructions
├── sitemap.xml           # Structured site map for search indexing
├── css/
│   └── style.css        # Central stylesheet with media queries for mobile responsiveness
├── js/
│   └── Script.js        # Master JavaScript file handling interactive UI & validations
└── IMAGES/               # Optimized image asset directory
```

## Step-by-Step Project Timeline & Milestones
- **Phase 1: Concepts & Layout Planning (Week 1 / Days 1–3)**
  - Outlined brand goals, calculated targets, defined audience personas, and wireframed layouts.
- **Phase 2: Semantic HTML Construction (Week 2 / Days 4–7)**
  - Built the initial 5 HTML template pages using semantic tags and established file structures.
- **Phase 3: CSS Styling & Mobile Responsiveness (Week 3 / Days 8–11)**
  - Created central css/style.css stylesheet and set up responsive media queries (768px and 480px breakpoints).
- **Phase 4: Advanced Functionality, SEO & Deployment (Week 4 / Days 12–14)**
  - Implemented modular JavaScript features, form validation algorithms, technical SEO assets (robots.txt, sitemap.xml), and deployed the final application live to GitHub Pages.

## Log of Changes (Changelog)

### [Build 3.0.0] - 2026-10-29 (Part 3 Final Release)
#### Added
- **Gallery Lightbox:** Added an interactive modal gallery for full-screen product image previews.
- **Technical SEO Files:** Created robots.txt and sitemap.xml in the root directory.
- **Confirmation Page:** Implemented Success.html as the landing page after valid form submissions.
- **Universal Search System:** Added a dynamic fallback popup search for non-product pages alongside live parameter search handling (?search=...).
- **Off-Page Integration:** Expanded footer column components with active social media channels.

#### Changed & Fixed
- **JavaScript Unification:** Consolidated disparate JS logic into a clean, unified js/Script.js file.
- **Form Validation Enhancements:** Upgraded input checks for enquiry.html, contact.html, and checkout.html with real-time error messages.
- **Performance & Security:** Configured deferred script execution, optimized media sizes, and enabled HTTPS via GitHub Pages.
- **Changelog & Documentation:** Comprehensive update of README.md to document all Part 1, Part 2, and Part 3 requirements.

### [Build 2.0.0] - 2026-09-07 (Part 2 Updates)
#### Added
- **Developer Documentation:** Included standard code descriptions and comments across all page files.
- **Denser Content Blocks:** Expanded text details and product descriptions.
- **Detailed Timeline:** Outlined a day-by-day project roadmap.

#### Changed
- Centralized all layout variables into css/style.css, removing inline styling.
- Configured media queries at 768px and 480px for mobile responsiveness.
- Formatted academic reference entries into Harvard referencing style.

### [Build 1.0.0] - 2026-08-31 (Part 1 Baseline)
#### Added
- Established file architecture and IMAGES resource folder.
- Created core HTML templates (index.html, products.html, about.html, enquiry.html, contact.html).

## Academic References Matrix
- MDN Web Docs. 2026. Client-side form validation. [Online]. Available at: https://mozilla.org [Accessed: October 2026].
- Pinterest. 2026. Artisanal candle aesthetic and packaging layout references. [Online]. Available at: https://pinterest.com [Accessed: 31 August 2026].
- The Independent Institute of Education (Pty) Ltd. 2026. Web Development (Introduction) WEDE5020 Portfolio of Evidence Instructions. Sandton: The Independent Institute of Education.
- Wix. 2026. Ecom natural candle boutique (earthy template) style guide mapping. [Online]. Available at: https://wix.com [Accessed: 31 August 2026].
