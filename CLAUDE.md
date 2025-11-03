# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Reviewer3** is an AI-assisted manuscript preparation tool developed for the KIDS24 biohackathon. It helps researchers prepare scientific manuscripts by providing AI-powered review feedback on various sections (introduction, discussion, connectivity analysis).

**Tech Stack:**
- Frontend: Vue 3 + TypeScript + Vite
- LLM Integration: Ollama (Llama 3.1 model)
- State: Pinia with localStorage persistence
- Editor: TipTap rich text editor
- UI: Bootstrap 5

## Development Commands

### Frontend Development (run from `/frontend` directory)

```bash
# Setup and development
npm install                    # Install dependencies (Node.js v18+ required)
npm run dev                   # Start Vite dev server (http://localhost:5173)

# Building
npm run build                 # Type-check + build for production
npm run build-only           # Build without type-checking
npm run type-check           # Vue TypeScript type checking only
npm run preview              # Preview production build

# Code quality
npm run lint                 # ESLint with auto-fix
npm run format              # Prettier formatting for src/
```

### LLM Server Setup (Required for functionality)

```bash
# Install and run Ollama
ollama pull llama3.1         # Download model
ollama serve                 # Start server on localhost:11434
```

**Configuration:** Edit `frontend/src/lib/ollama-client.js` to change IP/port:
```javascript
const PORT = 11434
const IP = 'localhost'        # Currently localhost, was '40.124.104.197' for remote
const MODEL = 'llama3.1'
```

### Python Utilities (in `/utils` directory)

```bash
python manuscript_check.py              # Query Ollama API with prompts
python section_titles_check.py          # Validate manuscript sections
python introduction_paragraph_score.py  # Score introduction paragraphs
```

## Architecture Overview

### Frontend Structure (`frontend/src/`)

```
├── main.ts                   # App entry point
├── App.vue                   # Root component with global loading
├── router/index.ts           # 5-step navigation routing
├── stores/manuscript.ts      # Pinia store (persisted to localStorage)
├── views/
│   ├── HomeView.vue         # Landing page
│   ├── SubmitManuscript.vue # Multi-step wrapper
│   └── steps/               # 5-step workflow
├── lib/
│   ├── ollama-client.js     # LLM API integration
│   ├── ollama-embeddings.js # Embedding utilities
│   └── prompts.js           # AI prompt templates
└── components/              # Reusable UI components
```

### 5-Step Manuscript Review Workflow

1. **Step 1 (submit):** Paste manuscript using TipTap editor
2. **Step 2 (outline):** Extract and validate manuscript structure
3. **Step 3 (intro):** Review introduction paragraphs with AI scoring (1-5 stars)
4. **Step 4 (discussion):** Analyze discussion section quality
5. **Step 5 (connectivity):** Evaluate paragraph flow and connectivity

### State Management Pattern

**Pinia Store (`useManuscriptStore`):**
- **Persisted State:** `hierarchy` (auto-saved to localStorage as `manuscript-hierarchy`)
- **Structure:** Array of sections with headings, paragraphs, and AI feedback
- **Key Actions:**
  - `updateHierarchy()` - Set manuscript structure
  - `updateSectionSuggestions()` - Store section-level feedback
  - `updateParagraphSuggestions()` - Store paragraph-level feedback
  - `updateSectionConnectivity()` - Store connectivity analysis

### LLM Integration Pattern

**Event-Driven Loading:**
- `window.dispatchEvent(llmLoading)` - Show loading spinner
- `window.dispatchEvent(llmLoaded)` - Hide loading spinner
- Counter prevents premature hiding during multiple concurrent requests

**Data Flow:**
1. User input (TipTap) → HTML → Markdown (via Marked.js)
2. Parse into section hierarchy → Store in Pinia
3. Submit sections to Ollama with specific prompts
4. Display AI feedback as stars + comments
5. Auto-persist to localStorage

### Component Patterns

**All components use Vue 3 Composition API:**
```typescript
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useManuscriptStore } from '@/stores/manuscript'

const router = useRouter()
const store = useManuscriptStore()
```

**TipTap Editor Integration:**
- StarterKit extensions (headings, paragraphs, lists)
- Minimum height: 400px
- HTML → Markdown conversion for processing

## Development Requirements

### Prerequisites
- **Node.js v18+** (specified in frontend/README.md)
- **Ollama server** running locally for LLM functionality
- **Modern browser** (ES2020+ support, no IE11)

### Windows Development
- **WSL2 recommended** (as noted in frontend/README.md)

### Configuration Files
- `package.json` - Uses Yarn as package manager (`yarn@1.22.22`)
- `vite.config.ts` - Vite bundler with Vue plugin
- `tsconfig.json` - TypeScript ES2020 target, bundler moduleResolution
- `.eslintrc.cjs` - Vue3-essential + TypeScript + Prettier rules
- `.prettierrc.json` - 2-space tabs, single quotes, 100 char width, no semicolons

## Key Technical Patterns

### Manuscript Processing Pipeline
1. **Input:** Rich text via TipTap editor
2. **Convert:** HTML → Markdown tokens (Marked.js)
3. **Parse:** Extract hierarchical sections
4. **Store:** Pinia with localStorage persistence
5. **Analyze:** Submit to Ollama with structured prompts
6. **Display:** Star ratings + textual feedback

### Error Handling
- No dedicated error boundaries found
- LLM failures handled via loading events
- State persistence prevents data loss on refresh

### Testing
- **Current:** No test files present
- **Framework:** Would use Vitest (Vite-native)
- **Focus areas:** Component tests for step views, store mutations, LLM integration

## Important Development Notes

1. **LLM Dependency:** App requires Ollama server running - core functionality fails without it
2. **Local-First:** All data stays in browser localStorage, no backend API required
3. **Markdown-Centric:** Internal processing uses Markdown, display uses HTML
4. **Bootstrap UI:** Uses Bootstrap 5 utility classes, assumes CDN or package availability
5. **Modern-Only:** ES modules, no CommonJS compatibility
6. **Hot Reload:** Changes auto-refresh during `npm run dev`

## License and Team

- **License:** MIT (Copyright 2024 St. Jude Children's Research Hospital BioHackathon)
- **Team:** Jaimin Patel, Aman Patel, Balint Meszaros, Suhani Sharma, Devansh Shah, Tasleem Shaik, Sruti Iyengar

## Common Development Tasks

Before starting development:
```bash
cd frontend
npm install
npm run dev  # Terminal 1: Frontend server

# Terminal 2: LLM server
ollama pull llama3.1
ollama serve
```

For production deployment:
```bash
npm run build  # Outputs to frontend/dist/
```

Quality checks before committing:
```bash
npm run lint && npm run format && npm run type-check
```