# Storyboard Studio

A Next.js 14 application that experiments with AI-assisted storyboard authoring inspired by Boords.

## Features

- Google authentication powered by NextAuth with middleware-protected storyboard routes.
- Storyboard workspace featuring a scene timeline, prompt/script editing panel, frame grid, and detailed frame dialog controls.
- Global storyboard state managed with Zustand, including generation status, undo/redo, and keyboard shortcuts.
- Iteration tooling for regenerating frames, tweaking prompts, and sharing/export placeholders.

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables in `.env.local`

   ```bash
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   NEXTAUTH_SECRET=generate-a-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Visit [http://localhost:3000](http://localhost:3000) to sign in with Google and access `/storyboards/demo`.

> **Note**: The storyboard UI ships with mocked generation flows. Integrate your own image service to replace placeholders.
