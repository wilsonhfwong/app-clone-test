# Storyboard Studio

A Next.js 14 application that experiments with AI-assisted storyboard authoring inspired by Boords.

## Features

- Storyboard workspace featuring a scene timeline, prompt/script editing panel, frame grid, and detailed frame dialog controls.
- Global storyboard state managed with Zustand, including generation status, undo/redo, and keyboard shortcuts.
- Iteration tooling for regenerating frames, tweaking prompts, and sharing/export placeholders.

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the development server

   ```bash
   npm run dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000) to explore the storyboard demo at `/storyboards/demo`.

> **Note**: The storyboard UI ships with mocked generation flows. Integrate your own image service to replace placeholders.
