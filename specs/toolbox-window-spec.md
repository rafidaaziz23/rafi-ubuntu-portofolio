# Specification: High-Density System Toolbox Window

## Context & Visual Reference
- Reference Image: public/specs/toolbox-screen.png
- Data Source: src/data/skills.ts
- Theme: Ubuntu GNOME Dark OS (Aubergine #2C001E, Dark Slate #1E1E1E, Ubuntu Orange #E95420)

## Component Requirements
1. File: `src/components/windows/ToolboxWindow.tsx`
2. Header Bar:
   - Traffic light window controls (Red close, Orange minimize, Green expand).
   - Title: `system-monitor — ~/Toolbox/System-Specs & Capabilities`.
3. Tab Filter Bar:
   - Filter options: [All Systems], [Backend & Services], [Data & Streams], [Frontend & Mobile], [Languages], [DevOps & AI].
   - Active state styled with Ubuntu orange border/badge.
4. Grid Container:
   - Responsive multi-column grid (1 col on mobile, 2 on tablet, 3 on desktop).
   - High density cards with subtle borders (`border-white/10`) and hover glow.
   - Each card displays skill name, category tag, and "Applied in:" project pills.