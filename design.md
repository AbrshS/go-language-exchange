# GOLanguageExchange — UI Design System
**Version 2.0 · June 2026 · Internal**

---

## Design direction

GLE is a platform about human connection across language and geography.
The visual language should feel: **warm, precise, global, and calm**.

Not sterile (this is not a SaaS tool).
Not playful (this is not a learning game).
Something between a well-designed airline app and a thoughtful cultural magazine — structured enough to trust, warm enough to come back to.

---

## Typography

```
Font family: "Inter", system-ui, -apple-system, sans-serif
```

Inter is the choice because GLE serves users reading in English, Spanish, Japanese, Arabic, Korean, Hindi — Inter has the widest reliable coverage and renders cleanly at every weight on every OS.

### Type scale

| Token         | Size  | Weight | Line height | Letter spacing | Use                          |
|---------------|-------|--------|-------------|----------------|------------------------------|
| `display`     | 52px  | 600    | 1.05        | -0.025em       | Hero headlines only          |
| `heading-1`   | 36px  | 600    | 1.15        | -0.02em        | Page titles                  |
| `heading-2`   | 24px  | 600    | 1.25        | -0.015em       | Section headers              |
| `heading-3`   | 18px  | 500    | 1.35        | -0.01em        | Card titles, modal headers   |
| `body-lg`     | 16px  | 400    | 1.65        | 0              | Primary reading text         |
| `body`        | 15px  | 400    | 1.6         | 0              | Default body                 |
| `label`       | 13px  | 500    | 1.4         | 0.01em         | UI labels, nav, buttons      |
| `caption`     | 12px  | 400    | 1.5         | 0.015em        | Metadata, timestamps, hints  |

### Typography rules

- **Weights used: 400, 500, 600 only.** Never 300 (too fragile on low-DPI), never 700+ (too aggressive).
- Sentence case everywhere. No all-caps. No title case.
- Body text maximum line length: **68 characters**. Beyond that, reading breaks down.
- Headings never wrap past two lines. If they do, the heading is too long.
- Numeric data (session durations, word counts, scores) uses `font-variant-numeric: tabular-nums` so columns align.

---

## Spacing

```
Base unit: 4px

--space-1:    4px
--space-2:    8px
--space-3:    12px
--space-4:    16px
--space-5:    20px
--space-6:    24px
--space-7:    32px
--space-8:    48px
--space-9:    64px
--space-10:   96px
--space-11:   128px
```

### Spacing rules

- Every margin, padding, and gap is a multiple of 4px. No exceptions.
- Section separation: `--space-10` (96px) between major page sections.
- Card padding: `--space-6` (24px) standard, `--space-4` (16px) compact.
- Inline element gaps: `--space-2` (8px) between icon and label, `--space-3` (12px) between sibling controls.
- The more whitespace between two things, the more unrelated they are. Use this deliberately.

---

## Layout

```
Max content width:    1120px
Column count:         12
Gutter:               24px
Page side padding:    64px desktop / 24px tablet / 16px mobile
```

### Layout rules

- All content is centered within the max-width container.
- No full-bleed sections except the world map canvas — that one earns it.
- Sidebar width when used: 260px fixed. Content area takes the rest.
- Mobile breakpoint: 768px. At mobile, columns collapse to 4-column.
- Never nest grid systems. One grid per layout level.

---

## Elevation & Borders

No shadows. Surfaces are separated by **background color contrast and borders**, never by drop shadow.

```
--border-width:   1px
--border-color:   var(--color-border)

--radius-xs:      4px    /* tags, badges, small chips */
--radius-sm:      6px    /* inputs, small buttons */
--radius-md:      10px   /* standard buttons, dropdowns */
--radius-lg:      14px   /* cards, panels, modals */
--radius-xl:      20px   /* bottom sheets, large overlays */
```

### Border & radius rules

- Every card and panel uses `--radius-lg` (14px).
- Every input and button uses `--radius-md` (10px).
- Never mix radius values within the same component family.
- Use `--color-bg-elevated` + a `1px var(--color-border)` border as the card baseline — this is the only elevation signal.
- The world map area: no border, no radius — it's a full canvas.

---

## Components

### Buttons

**Primary** — the main call to action. Used once per view.
```
background:    var(--color-primary)
color:         #FFFFFF
font:          label (13px / 500)
padding:       0 20px
height:        42px
radius:        --radius-md
```

**Secondary** — supporting action.
```
background:    transparent
border:        1px solid var(--color-border)
color:         var(--color-text-primary)
```

**Accent** — highest-priority action (enter queue, start session).
```
background:    var(--color-accent)
color:         var(--color-primary)
font-weight:   600
```

**Ghost** — low-emphasis, destructive, or cancel.
```
background:    transparent
color:         var(--color-text-secondary)
no border
```

- Hover on all buttons: `opacity: 0.8`, `transition: opacity 120ms`.
- Disabled: `opacity: 0.4`, `cursor: not-allowed`.
- Loading: replace label with a 16px spinner. Keep button width stable.
- No icon-only buttons on primary actions.

### Inputs

```
height:          44px
padding:         0 14px
border:          1px solid var(--color-border)
radius:          --radius-md
font:            body (15px / 400)
placeholder:     color var(--color-text-muted)
focus:           border-color var(--color-primary), outline: none
error:           border-color var(--color-error)
```

- Labels always sit **above** the input field. Never inside (placeholder ≠ label).
- Error messages: 12px, `--color-error`, appear below the field.
- Never use floating label animations.
- Input group (icon + field): icon is `--color-text-muted`, 16px, left-padded inside the input.

### Cards

```
background:      var(--color-bg-elevated)
border:          1px solid var(--color-border)
border-radius:   --radius-lg
padding:         24px
```

- Cards do not hover unless the entire card is a link.
- Linked card hover: `border-color: var(--color-primary)`, `transition: border-color 150ms`.
- Never nest a card inside a card.
- Summary cards (post-call) get a subtle left border: `border-left: 3px solid var(--color-accent)`.

### Navigation

```
Height:             56px
Background:         var(--color-bg)
Border-bottom:      1px solid var(--color-border)
Nav item font:      label (13px / 500)
Active item color:  var(--color-accent)
Active indicator:   2px bottom border, color var(--color-accent)
```

- Navigation is always fixed to the top on desktop, bottom on mobile.
- Mobile bottom nav: max 5 items. Beyond that, add a "more" item.
- Active state uses the accent color — this is one of its two sanctioned uses.

### Badges & Tags

```
height:          22px
padding:         0 8px
font:            caption (12px / 500)
radius:          --radius-xs
```

- Language tags: `background var(--color-bg-subtle)`, `color var(--color-text-secondary)`.
- Status badges (online, matched): use semantic colors — success green for online, accent for active.
- Proficiency level: always displayed as a tag, never as plain text inline.

### Modals & Overlays

```
Overlay:         rgba(0D1F3C, 0.45)
Modal panel:     background var(--color-bg), radius --radius-xl, padding 32px
Max width:       480px
```

- Modals animate in with `transform: translateY(8px) → translateY(0)` + `opacity 0 → 1` over 200ms.
- Always include a close button top-right, and close on overlay click.
- Never use a modal for a success confirmation — use a toast.

### Toasts

```
Position:        bottom-center
Width:           max 360px
Padding:         14px 16px
Radius:          --radius-md
Font:            label (13px / 500)
Auto-dismiss:    4000ms
```

- Success toast: left border `3px solid var(--color-success)`.
- Error toast: left border `3px solid var(--color-error)`.
- No icons in toasts — the border color communicates the type.

---

## Icons

Library: **Phosphor Icons — Regular weight**

```
Inline icon:      16px
Standalone icon:  20px
Feature icon:     24px
```

- Regular weight only — matches the body text weight.
- Always paired with a visible label or a `title` attribute for accessibility.
- `aria-hidden="true"` on all decorative icons.
- Never mix Phosphor with any other icon set.

---

## Motion

```
--duration-instant:   80ms    /* state toggle, checkbox */
--duration-fast:      150ms   /* hover, focus */
--duration-base:      220ms   /* panel open, card appear */
--duration-slow:      350ms   /* page transition, modal */
--easing-standard:    cubic-bezier(0.2, 0, 0, 1)
--easing-enter:       cubic-bezier(0, 0, 0.2, 1)
--easing-exit:        cubic-bezier(0.4, 0, 1, 1)
```

- Transitions apply to: `opacity`, `transform`, `border-color`, `background-color`. Nothing else.
- No bounce, spring, or elastic easing in UI chrome. (Solar Session is a product feature and has its own rules.)
- Page transitions: `opacity` fade only.
- All motion respects `@media (prefers-reduced-motion: reduce)` — disable or reduce to instant.
- Never animate `width`, `height`, or `max-height` directly — use `transform: scaleY()` or opacity instead.

---

## The world map

The map is the emotional center of the product. It has its own rules.

- It takes 100% of the viewport on the discovery screen — no competing chrome.
- Illuminated city dots: `var(--color-accent)`, 8px diameter, `opacity: 0.9`.
- Dim city dots (no partners): `var(--color-text-muted)`, 4px diameter.
- Hover on city: scale to 12px, show a tooltip with city name + partner count.
- Map background: dark navy `#08111F` — intentionally darker than `--color-bg` to feel like looking at a globe at night.
- The world map is the one screen where dark styling applies regardless of the user's color mode preference.

---

## Accessibility baseline

- Color contrast: minimum **4.5:1** for body text, **3:1** for large text and UI components.
- Every interactive element is reachable by keyboard, in logical tab order.
- Focus ring: `outline: 2px solid var(--color-accent); outline-offset: 3px`. Never `outline: none` without a replacement.
- Touch targets: minimum **44×44px**.
- All images carry `alt` text. All icons carry `aria-label` or `aria-hidden`.
- The Solar audio layer must respect `prefers-reduced-motion` — disable the frequency sweep if set.

---

## Do not

| Rule | Reason |
|------|--------|
| No box shadows | Surfaces separate with color and border — no elevation faking |
| No more than 2 typeface families | Inter only; never add a display face without a design review |
| No weight below 400 | Fragile on non-retina screens and non-Latin scripts |
| No weight above 600 | Out of register with the calm, global tone |
| No decorative gradients | Accent color does the warmth; gradients are reserved for the Solar arc product layer |
| No color outside the token set | Every hex on screen must map to a token |
| No all-caps text | Every language deserves typographic respect |
| No tooltips on touch-only interactions | Inaccessible; use labels or bottom sheets |
| No cards nested inside cards | Creates hierarchy confusion |
| No more than one accent-colored element per screen | Dilutes the signal |

---

## Pre-ship checklist

- [ ] Every color is a defined token
- [ ] No box shadow anywhere
- [ ] All weights are 400, 500, or 600
- [ ] All text is sentence case
- [ ] Every spacing value is a multiple of 4px
- [ ] Primary CTA uses accent color — appears only once per view
- [ ] All interactive elements have visible focus states
- [ ] All touch targets are at least 44×44px
- [ ] Empty states have one line of copy and one action
- [ ] Screen renders correctly at 375px mobile width
- [ ] `prefers-reduced-motion` is respected

---

*GOLanguageExchange Design System · Fanaye Technologies · v2.0*