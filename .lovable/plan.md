

# Dual-Mode Portfolio: Terminal Hacker Mode + Normal Mode

## Overview

Build a dual-experience system where the default landing is a fully simulated terminal/hacker interface, with a floating button to switch to the existing clean portfolio. Mode preference persists via localStorage.

---

## Architecture

```text
App.tsx
 └─ ModeProvider (React Context + localStorage)
     ├─ HackerMode (terminal simulation)  ← default on first visit
     └─ NormalMode (existing portfolio)    ← current Index page
     └─ FloatingModeSwitch (always visible)
```

---

## Files to Create

### 1. `src/context/ModeContext.tsx`
- React Context with `mode: 'hacker' | 'normal'`, `toggleMode()`
- Reads/writes `localStorage.getItem('portfolio-mode')`
- Default: `'hacker'` on first visit

### 2. `src/components/terminal/TerminalBoot.tsx`
- Full-screen boot sequence on `#000000` background
- Lines appear one-by-one with per-character typing (20-60ms random delay)
- Progress bars update in-place (overwrite same line)
- Sequence: kernel init → security protocols → progress bar → encrypted connection → auth → "Access granted"
- On complete, hands off to the interactive terminal

### 3. `src/components/terminal/TerminalEngine.tsx`
- Main terminal component after boot completes
- Implements the typing queue system (commands wait for previous to finish)
- Blinking cursor (blinks when idle, stops during typing)
- Auto-scroll behavior
- Input locked during output rendering
- Command history via arrow keys (↑ ↓)
- Prompt: `rohit@portfolio:~$`

### 4. `src/components/terminal/commands.ts`
- Command registry with handlers:
  - `help` → list all commands
  - `whoami` → "Rohit Sen | Developer | Ethical Hacker | Creator"
  - `about` → `cat about.txt` style output with name, location, focus, passion
  - `projects` → `ls projects/` style listing
  - `skills` → structured skill list (text only)
  - `contact` → email, GitHub, LinkedIn as text
  - `clear` → clears terminal buffer
  - `exit` → triggers mode switch to Normal Mode
  - Unknown command → `"command not found"` error in red (#FF0033)
- Each command returns an array of output lines with optional delays

### 5. `src/components/terminal/HackerMode.tsx`
- Wrapper: full viewport, `#000000` bg, monospace font
- Renders TerminalBoot first, then TerminalEngine
- CSS: scanline overlay (repeating-linear-gradient, very low opacity), subtle flicker keyframe
- No images, icons, SVGs, cards — pure text

### 6. `src/components/FloatingModeSwitch.tsx`
- Fixed position, right side, vertically centered
- Pill-shaped button
- In hacker mode: green glow, label "Exit Terminal"
- In normal mode: subtle style, label "Enter Terminal"
- Click triggers smooth fade transition then mode switch

---

## Files to Modify

### 7. `src/App.tsx`
- Wrap app in `ModeProvider`
- Conditionally render `HackerMode` or existing `Index` based on mode
- Render `FloatingModeSwitch` always

### 8. `src/index.css`
- Add monospace font import (JetBrains Mono from Google Fonts)
- Add terminal-specific utility classes: scanline overlay, flicker animation, cursor blink
- Keep all existing styles untouched

### 9. `index.html`
- Add JetBrains Mono font preconnect/link

---

## Technical Details

**Typing Engine**: A queue-based system using `setTimeout` chains. Each character rendered individually with random 20-60ms delay. Lines queued with 150-500ms gap. Progress bars use a single DOM element whose text content updates in place.

**Scanline Effect**: CSS `::after` pseudo-element with `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)` at low opacity.

**Mode Transition**: On switch, apply a CSS `opacity: 0` transition (300ms), swap components, then fade in.

**Performance**: No heavy libraries. Pure DOM manipulation for terminal output using refs. Terminal lines stored in a state array; only new lines trigger minimal re-renders.

**Responsiveness**: Terminal font drops to 12-13px on mobile, padding reduced to 12px. All text wraps naturally with `word-break: break-word`.

**State**: localStorage key `portfolio-mode` stores `'hacker'` or `'normal'`. Read on mount, written on toggle.

