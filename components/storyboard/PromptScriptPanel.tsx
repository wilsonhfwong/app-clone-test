'use client';

import { useMemo } from 'react';
import { useStoryboardStore } from '@/lib/store/storyboard-store';

export default function PromptScriptPanel() {
  const {
    scenes,
    activeSceneId,
    updateScenePrompt,
    updateSceneScript,
    captureSnapshot
  } = useStoryboardStore((state) => ({
    scenes: state.scenes,
    activeSceneId: state.activeSceneId,
    updateScenePrompt: state.updateScenePrompt,
    updateSceneScript: state.updateSceneScript,
    captureSnapshot: state.captureSnapshot
  }));

  const scene = useMemo(() => scenes.find((s) => s.id === activeSceneId) ?? scenes[0], [
    scenes,
    activeSceneId
  ]);

  if (!scene) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900/70 p-4 shadow">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">Scene prompt</h2>
          <p className="text-xs text-slate-400">Craft the narrative and direction for this scene.</p>
        </div>
      </header>
      <div className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-400">Prompt</span>
          <textarea
            className="h-28 resize-none rounded-md border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            value={scene.prompt}
            onChange={(event) => {
              captureSnapshot();
              updateScenePrompt(scene.id, event.target.value);
            }}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-400">Script</span>
          <textarea
            className="h-40 resize-none rounded-md border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            value={scene.script}
            onChange={(event) => {
              captureSnapshot();
              updateSceneScript(scene.id, event.target.value);
            }}
          />
        </label>
      </div>
    </section>
  );
}
