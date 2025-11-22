# Marine Refuge Landing Page - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Sunergy template's clean, environmental aesthetic with smooth scrolling sections, generous whitespace, and impact-driven layout. The design emphasizes Marine Refuge's climate-resilient amphibious housing mission through modern, professional presentation with environmental consciousness.

## Typography System

**Font Family**: DM Sans (via Google Fonts CDN)
- Headings: DM Sans, weights 500-700
- Body: DM Sans, weight 400
- All caps for section labels/overlines

**Hierarchy**:
- H1 (Hero): 70px desktop / 48px mobile, weight 700
- H2 (Section headings): 50px desktop / 36px mobile, weight 700
- H3 (Card titles): 24px, weight 600
- Body: 16px, weight 400, line-height 1.6
- Overlines/labels: 12px uppercase, weight 600, letter-spacing 2px

## Layout & Spacing

**Container System**:
- Max-width: 1280px for main content areas
- Full-width sections with internal max-width containers
- Padding: px-6 mobile, px-8 tablet, px-12 desktop

**Spacing Scale** (Tailwind units):
- Primary rhythm: 16, 20, 24, 32 (section spacing)
- Component spacing: 4, 8, 12, 16
- Section vertical padding: py-20 desktop / py-12 mobile

## Section Specifications

### 1. Hero Section
- **Layout**: Full viewport height (min-h-screen), centered content
- **Image**: Large environmental hero image (ocean/coastal resilience theme) with subtle overlay
- **Content**: Centered heading "Protecting Communities Through Innovative Amphibious Housing" + subtitle + CTA button
- **CTA Button**: Blurred background (backdrop-blur-md), white text, rounded-none, px-8 py-4
- **Navbar**: Sticky top-0, backdrop-blur-lg, white/80 background, shadow-sm on scroll

### 2. About Us Section
- **Layout**: Two-column on desktop (text left, supporting image right), single column mobile
- **Spacing**: py-20 desktop / py-12 mobile
- **Content**: "About Us" overline + H2 heading + 2-3 paragraph description
- **Visual**: Include image of amphibious housing or coastal community

### 3. What We Do Section
- **Layout**: 3-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Cards**: Icon/image top, title, description, white background with subtle border
- **Spacing**: gap-8, card padding p-8
- **Icons**: Use Heroicons (outline style) or simple environmental graphics

### 4. SDG Section
- **Layout**: "Aligned with UN Sustainable Development Goals" heading + 3-column icon display
- **Icons**: Display SDG 9, 11, 13 with equal sizing (200px width)
- **Spacing**: gap-12 between icons, py-16 section padding
- **Background**: Light mint/sage tint background for visual separation

### 5. Affiliated Companies Slider
- **Heading**: "Affiliated With" centered, H3 size
- **Slider**: Auto-scrolling horizontal carousel, seamless loop
- **Logos**: Grayscale with hover color transition, max-height 60px
- **Spacing**: gap-16 between logos, py-12 section padding

### 6. Awards Section
- **Layout**: 2-column grid (grid-cols-1 md:grid-cols-2), gap-8
- **Cards**: Image containers with aspect-ratio-[4/3]
- **Hover Effect**: Bottom gradient overlay (from transparent to black/60) + "Learn More →" text bottom-right
- **Transition**: All transitions duration-300
- **Images**: FICS'24 and HULT Prize award ceremony photos

### 7. Learn More Page
- **Layout**: Hero section + detailed explanation with diagrams/images
- **Content**: Technical explanation of amphibious housing with visual aids
- **Structure**: Title + intro + benefits grid + technical specs + FAQ section

## Component Library

**Buttons**:
- Primary: #A6FF79 background, black text, px-8 py-4, border-radius: 0
- Text buttons: Underline on hover, #1D3D3E color
- Hero CTAs: Backdrop-blur with white text

**Cards**:
- White background, subtle border (border-gray-200)
- Padding: p-8
- Shadow: none default, shadow-lg on hover (duration-300)
- Border-radius: 0 (sharp corners per branding)

**Navbar**:
- Sticky positioning, logo left, nav links right
- Smooth scroll behavior to sections
- Backdrop-blur-lg on scroll with shadow

## Images Required

1. **Hero Background**: Coastal/ocean environment showing climate resilience (full-width, 1920x1080)
2. **About Section**: Amphibious house or coastal community (800x600)
3. **What We Do Icons**: 3 environmental/housing icons from Heroicons
4. **SDG Icons**: Provided (SDG 9, 11, 13)
5. **Awards**: 2 ceremony/achievement photos (1200x900 each)
6. **Learn More**: Technical diagrams and housing visuals

## Interactions & Animations

- **Smooth scroll**: CSS scroll-behavior: smooth for navbar links
- **Hover states**: Scale transforms (scale-105) on cards, duration-300
- **Awards gradient**: Opacity 0 to 1 on hover with bottom positioning
- **Slider**: CSS animation for infinite auto-scroll
- **Minimal motion**: Respect prefers-reduced-motion

## Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation for all sections
- Alt text for all images
- Focus indicators with #009A95 outline
- Minimum contrast ratios WCAG AA compliant