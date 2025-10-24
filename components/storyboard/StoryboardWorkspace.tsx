'use client';

import PromptScriptPanel from './PromptScriptPanel';
import SceneTimeline from './SceneTimeline';
import FrameGrid from './FrameGrid';
import KeyboardShortcuts from './KeyboardShortcuts';

export default function StoryboardWorkspace() {
  return (
    <div className="space-y-6">
      <KeyboardShortcuts />
      <SceneTimeline />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <FrameGrid />
        <PromptScriptPanel />
      </div>
    </div>
  );
}
