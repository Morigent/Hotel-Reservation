---
name: Grand Reserve Logic
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#44474d'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1d'
  on-tertiary-container: '#828485'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered to evoke the atmosphere of a five-star concierge service: prestigious, reliable, and welcoming. It targets luxury hospitality professionals who require high-density functional data presented through an interface of quiet elegance. 

The aesthetic direction is **Corporate / Modern** with a **Minimalist** foundation, elevated by classical editorial touches. It prioritizes clarity and order to reduce cognitive load during high-stakes guest interactions. Visual weight is managed through precise line work and deliberate whitespace, ensuring the interface feels "expensive" but remains a highly efficient tool for daily operations.

## Colors

The palette is anchored by **Deep Navy** (#0A192F), representing authority and professional stability. This serves as the primary color for navigation, critical typography, and structural elements. 

**Gold Accents** (#C5A059) are used sparingly for call-to-actions, status indicators for VIP guests, and premium highlights, adding a layer of sophisticated luxury. The background uses **Clean Whites** and very light cool greys to maintain a high-contrast, airy feel. Functional states (Success, Warning, Error) should be desaturated to align with the refined color story, avoiding neon or overly vibrant tones.

## Typography

This design system utilizes a high-contrast typographic pairing to balance heritage with modern utility. **Libre Caslon Text** is used for primary headings and hero numbers (like room counts or daily revenue), providing a literary, authoritative character. 

For the functional interface, **Inter** is employed for its exceptional legibility in data-heavy environments. Labels should use uppercase styling with increased letter spacing to denote secondary information hierarchy. Line heights are generous to ensure readability during fast-paced management tasks.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop dashboards to maintain a sense of structured permanence, transitioning to a fluid model for tablets and mobile devices. 

- **Desktop:** 12-column grid with a max-width of 1440px. 24px gutters provide ample breathing room between functional modules.
- **Internal Spacing:** Use a strict 8px baseline grid. Content containers should utilize 32px or 40px internal padding to maintain the "luxury of space" hallmark of the brand.
- **Alignment:** All elements must align to the grid edges; floating or center-heavy layouts should be avoided in favor of organized, left-aligned information architecture.

## Elevation & Depth

To maintain a clean and professional appearance, this design system avoids heavy shadows. Depth is primarily communicated through **Low-contrast outlines** and **Tonal layers**.

1.  **Level 0 (Base):** The primary background color (White).
2.  **Level 1 (Cards/Sections):** Subtle 1px borders in a light grey (#E2E8F0) distinguish content areas.
3.  **Level 2 (Hover/Active):** A very soft, highly diffused ambient shadow (0px 4px 20px rgba(10, 25, 47, 0.05)) is used only for interactive elements like cards or dropdown menus to suggest lift without breaking the flat, editorial aesthetic.
4.  **Overlays:** Modals and drawers use a Backdrop Blur (8px) with a semi-transparent Navy overlay to maintain focus while keeping the underlying context visible.

## Shapes

The shape language is **Soft** (roundedness 1), utilizing a 4px corner radius as the standard. This subtle rounding removes the clinical harshness of sharp corners while remaining more professional and "architectural" than fully rounded or pill-shaped elements. 

- **Buttons & Inputs:** 4px radius.
- **Cards & Modals:** 8px (rounded-lg) to provide a gentle container for large content blocks.
- **Status Badges:** 2px or square to maintain a disciplined, data-driven look.

## Components

### Buttons
Primary buttons use the Deep Navy background with white text. Secondary buttons use a Gold border with Gold text. Action icons within buttons should be thin-stroke (1.5pt) to match the refined aesthetic.

### Input Fields
Fields are defined by a bottom-border only or a very light 4-sided stroke. Focus states are indicated by the Gold accent color. Labels always sit above the field in the `label-md` uppercase style.

### Cards
Cards are the primary container. They feature no fill (white background) and a subtle 1px border. Header sections within cards should be separated by a thin horizontal rule.

### Chips & Status
Used for "Room Status" or "Booking Type." These should use a light tint of the status color (e.g., light gold for VIP, light navy for Occupied) with high-contrast text. Avoid "traffic light" colors; prefer a sophisticated palette of Sage, Slate, and Gold.

### Lists & Tables
Tables are the heart of the system. They use minimal borders—only horizontal dividers. Row heights should be generous (min 56px) with text centered vertically to maintain the premium feel.

### Additional Components
- **Date Range Picker:** A custom-styled calendar using the Navy/Gold palette for booking management.
- **Concierge Quick-Action Bar:** A persistent, slim utility bar at the bottom for global actions like "Create Reservation" or "Guest Search."