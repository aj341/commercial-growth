# Commercial Growth -- Design Brainstorm

## Brief Summary
Dark mode, motion-rich landing page for Australian growth consulting brand. Brand colours: #1F344F (bg), #7BB9F1 (sky blue accent), #8FC0D3 (light blue), #96989D (grey), #FFFFFF (white). Font: Poppins. Reference: framer.com, raycast.com, spline.design.

---

<response>
<text>
## Idea 1: "Deep Ocean Command Centre"

**Design Movement:** Dark Brutalism meets Glassmorphism -- precision instruments under pressure

**Core Principles:**
1. Everything is a data instrument -- every section feels like a dashboard panel or readout
2. Asymmetric tension -- headlines bleed left, content anchors right, creating diagonal visual energy
3. Controlled chaos -- animated particles and gradient orbs exist within strict typographic grids
4. Depth layering -- foreground glass cards, midground grid lines, background gradient nebula

**Color Philosophy:**
The #1F344F base reads as deep ocean or midnight command centre. Sky blue (#7BB9F1) is the sonar ping -- it pulses, glows, and marks active states. The palette communicates precision and trust without corporate coldness.

**Layout Paradigm:**
Asymmetric split-column layout where text anchors left at 55% width and decorative animated elements occupy the right 45%. On scroll, sections alternate between left-dominant and right-dominant compositions. No centered hero text -- the headline bleeds from left edge.

**Signature Elements:**
- Animated SVG grid with subtle pulse on the background (5% opacity)
- Glowing "data orbs" -- floating gradient spheres in sky blue/light blue that slowly drift
- Thin horizontal rule lines with gradient fade that separate sections

**Interaction Philosophy:**
Cards tilt slightly on mouse movement (CSS perspective transform). Hover reveals a secondary line of text. Buttons pulse their glow on hover. The Blueprint stepper has a glowing progress bar that fills with a liquid animation.

**Animation:**
- Hero: Slowly drifting gradient mesh + floating orbs with sinusoidal motion paths
- Scroll reveals: Staggered fade-up with 60ms delays between items
- Stats: Counter animation with cubic-bezier easing (fast start, slow finish)
- Cards: 3D tilt on mouse move using CSS perspective

**Typography System:**
- Poppins 700 (72px desktop, 48px mobile) for hero headline -- tight letter-spacing (-0.02em)
- Poppins 400 (18px) for body -- generous line-height (1.7)
- Poppins 600 (13px, 0.15em letter-spacing, uppercase) for section labels/eyebrows
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Idea 2: "Precision Signal" -- SELECTED

**Design Movement:** Neo-brutalist dark UI meets premium SaaS product design (Raycast/Linear aesthetic)

**Core Principles:**
1. Signal over noise -- every element earns its place; nothing decorative without purpose
2. Typographic dominance -- massive headline type creates the primary visual impact
3. Layered depth -- background grid texture, midground glass cards, foreground glowing accents create three distinct planes
4. Motion as meaning -- animations reveal information hierarchy, not just decoration

**Color Philosophy:**
#1F344F as the deep, authoritative base -- not black, but a sophisticated navy that reads as "serious but not corporate." #7BB9F1 is the electric signal -- used sparingly as the single accent that draws the eye to what matters. The restraint of the palette makes every sky blue element feel significant.

**Layout Paradigm:**
Full-bleed sections with generous vertical rhythm. Hero uses a left-aligned typographic anchor with animated elements occupying the right half. Subsequent sections use alternating asymmetric layouts. The Blueprint stepper breaks the grid intentionally as the centrepiece. Horizontal scrolling card rows on mobile.

**Signature Elements:**
- Subtle dot-grid or line-grid background pattern at 6% opacity across entire page
- Glowing blue gradient orbs that slowly drift in the hero and CTA sections
- Thin accent lines (1px, sky blue, 40% opacity) used as section dividers and card borders

**Interaction Philosophy:**
Every interactive element has a clear hover state with sky blue glow (box-shadow with blur). Cards lift slightly on hover (translateY -4px). The Blueprint stepper uses smooth slide transitions. Buttons scale to 1.02x on hover. Mouse parallax on hero floating elements.

**Animation:**
- Hero: Animated gradient mesh background (CSS keyframes shifting hue/position) + 3-4 floating geometric shapes with slow orbital motion
- Scroll reveals: IntersectionObserver-triggered fade-up animations, 80ms stagger
- Stats: Number counting animation with ease-out cubic-bezier
- Blueprint: Smooth CSS slide transition between phases with opacity crossfade

**Typography System:**
- Poppins 800 (80px desktop / 52px mobile) for hero -- tracking -0.03em
- Poppins 600 (40px) for section headlines
- Poppins 400 (16-17px) for body -- line-height 1.75
- Poppins 500 (12px, uppercase, 0.12em tracking) for eyebrow labels
</text>
<probability>0.09</probability>
</response>

<response>
<text>
## Idea 3: "Blueprint Architecture"

**Design Movement:** Technical drawing meets premium dark product -- the aesthetic of engineering documentation elevated to luxury

**Core Principles:**
1. Architectural precision -- thin lines, measured spacing, technical grid references
2. Blueprint metaphor -- the three-phase framework IS the visual language of the entire page
3. Monochromatic depth -- variations of the dark blue create section separation without colour changes
4. Emergent complexity -- simple geometric elements combine to suggest sophisticated systems

**Color Philosophy:**
The brand palette maps perfectly to blueprint aesthetics: dark navy is the paper, sky blue is the ink, light blue is the secondary notation. White is used only for critical measurements and primary labels. The result feels like a technical document that has come alive.

**Layout Paradigm:**
Grid-based with visible structural lines. Sections are delineated by thin horizontal rules. Content sits within implied "frames" -- rectangular regions defined by corner accents rather than full borders. The hero uses a large typographic grid reference number (01, 02, 03) as section markers.

**Signature Elements:**
- Corner bracket accents on cards (instead of full borders)
- Section numbers in large, low-opacity Poppins 800 as background watermarks
- Thin animated connecting lines between the Blueprint phases

**Interaction Philosophy:**
Hover states reveal additional "technical" information -- a secondary descriptor appears. The Blueprint stepper shows connecting lines that animate when transitioning. Cards have corner bracket highlights that glow on hover.

**Animation:**
- Hero: Slowly drawing blueprint lines that form geometric shapes
- Scroll: Elements "draft in" from the left like being drawn
- Stats: Numbers count up with a typewriter-style reveal
- Blueprint: Lines connect between phases with a drawing animation

**Typography System:**
- Poppins 700 for headlines with monospace numbers for stats
- Poppins 300 for body -- the lightness contrasts with bold headlines
- Technical notation style for labels: ALL CAPS, wide tracking
</text>
<probability>0.07</probability>
</response>

---

## SELECTED: Idea 2 -- "Precision Signal"

**Rationale:** Best matches the brief's reference sites (Raycast, Framer) and delivers the premium SaaS product feel requested. The asymmetric layout with typographic dominance avoids the "AI slop" centered layout trap. The signal/noise philosophy aligns with the brand's data-led positioning.
