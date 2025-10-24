'use client';

import { useStoryboardStore } from '@/lib/store/storyboard-store';

export default function SceneTimeline() {
  const { scenes, activeSceneId, setActiveScene } = useStoryboardStore((state) => ({
    scenes: state.scenes,
    activeSceneId: state.activeSceneId,
    setActiveScene: state.setActiveScene
  }));

  return (
    <nav className="flex items-center gap-3 overflow-x-auto rounded-lg border border-slate-700 bg-slate-900/70 p-3">
      {scenes.map((scene, index) => {
        const isActive = scene.id === activeSceneId;
        return (
          <button
            key={scene.id}
            type="button"
            onClick={() => setActiveScene(scene.id)}
            className={`flex flex-col rounded-md px-4 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              isActive ? 'bg-sky-500 text-white shadow' : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span className="text-xs uppercase tracking-wide text-slate-300/80">Scene {index + 1}</span>
            <span className="text-sm font-semibold">{scene.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
