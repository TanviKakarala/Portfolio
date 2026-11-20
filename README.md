# Tanvi Kakarala — Dual-Core Portfolio Website

> **"Where Data Engineering Rigor Meets Creative Digital Magic"**  
> Designed for Tanvi Kakarala — Enterprise Data Engineer at TEKsystems, 4× Academic Gold Medalist, and Independent Digital Solutions Freelancer.

---

## 🌟 Concept & Interactive Architecture

This portfolio implements an interactive **Dual-Brain Stage Architecture** synchronized with the provided cosmic nebula background (`assets/hero-bg.png`):

### 1. Dual-Brain Interactive Hero Stage
- **Responsive 2D Wave-Equation Ripple Engine (`#water` canvas):**
  - Physical discrete Laplacian wave simulation using typed Float32Array grids (`CELL = 5`).
  - Luminous rose/pink highlights on wave crests (`[255, 190, 210]`) and deep velvety burgundy shadows in wave troughs (`[50, 6, 30]`).
  - CSS gradient mask (`linear-gradient(90deg, transparent 36%, #000 62%)`) smoothly isolates water physics to the creative hemisphere.
  - Interactive velocity excitation on cursor drag and touch swipe, click/tap drops, and periodic ambient raindrops across the nebula.
- **Electric Lightning Bolt Engine (`#bolt` canvas):**
  - 35 anatomical edge coordinate points tracing the left cerebral hemisphere contour.
  - Recursive midpoint displacement lightning generator (`jag()`) arcing to the cursor when hovering on the logical half.
  - Ambient high-voltage discharges and dual-layer glow with electric cyan outer aura and intense white core.
- **Swaying Neural Conduit Wires & Glowing Filament Bulbs (`#wires` canvas):**
  - 30 multi-strand organic bezier wire tendrils growing out behind the brain.
  - 12 incandescent filament bulbs swaying gently and pulsating with warm golden-amber light gradients.
- **High-Resolution Split Dual Brain (`.bb#bb`):**
  - Left hemisphere: `assets/images/brain-left.webp` (800×1600 cybernetic circuits in cyan & deep blue).
  - Right hemisphere: `assets/images/brain-right.webp` (800×1600 organic watercolor gyri in pink & burgundy) with 16 twinkling star glitters (`#gl`).
- **Dynamic Dual-State Cursor (`.cur`):**
  - Left hemisphere: Electric cyan directional pointer.
  - Right hemisphere: Tilted artist's paintbrush (`assets/images/brush-cursor.webp`) with paint drop tip.
- **Performance Suspension:**
  - Rendering automatically pauses when scrolled past the hero section (`scrollY > H * 1.05`) to conserve 100% of GPU/CPU resources.

---

## 💼 Core Portfolio Sections

1. **The Dual Desks (`#desks`):** Interactive split rooms for "The Engineer" (Enterprise Data) and "The Creator" (Digital Solutions) with smooth hover expansion.
2. **Selected Live Projects (`#projects` / `#work`):**
   - **OPULENCE (Live):** Luxury international export and commodity trading platform deployed on Netlify.
   - **Aastha Enterprises (In Progress):** Smart vending machines & beverage premixes website with AI product animation.
   - **TEKsystems Enterprise Platform:** Microsoft Fabric lakehouse, PySpark validation, SSRS-to-Power BI migration, and Agentic AI data migration.
3. **Freelance Digital Services (`#services`):** Filterable 7-pillar matrix spanning Web Development, UI/UX, AI Advertising, Business Automation, BI Dashboards, and Cloud Data Solutions.
4. **About Tanvi (`#about`):** Portrait arch featuring Tanvi's photo (`assets/images/tanvi-portrait.webp`), career timeline at TEKsystems, and academic milestones.
5. **Academic Excellence & 4× Gold Medals (`#academics`):** Highlighting college topper rank across all 4 years at CMR Engineering College (93% aggregate) and 98% Intermediate at Vignan Junior College with interactive dropping medals animation.
6. **Swecha Community Leadership & Public Impact (`#impact`):** Core volunteer & GLUG leader; infinite animated marquee of premier university keynote sessions (**IARE, MLRIT, CBIT, MRIT, CMR, Anurag University**) and social service computing classes for government schools.
7. **Complete Technical Arsenal (`#arsenal`):** Categorized interactive badges covering Python, SQL, PySpark, Fabric, Power BI, Angular, Julius AI, and Agentic AI workflows.
8. **Project Brief Builder & WhatsApp Generator (`#contact`):** Interactive requirement selector, timeline picker, and instant WhatsApp link generator with prefilled message to `+917569844574`, alongside direct email client dispatch.

---

## 🚀 How to Run Locally

Built with pure modern HTML5, CSS3, and Vanilla JavaScript with **zero build tools or dependencies required**:

### Option 1: Direct File Opening
Double-click `index.html` in Windows Explorer to open in any web browser.

### Option 2: Local Python Server
Open PowerShell in this directory and execute:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🌐 Deploying to Netlify (Free & Live in 30 Seconds)

1. Log in to [Netlify.com](https://www.netlify.com).
2. Go to **Sites** → **Add new site** → **Deploy manually**.
3. Drag and drop the `My_Portfolio` folder into the Netlify window.
4. The portfolio will be immediately live on a global CDN with SSL and HTTPS!
