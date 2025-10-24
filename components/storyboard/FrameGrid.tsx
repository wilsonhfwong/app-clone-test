'use client';

import { useState } from 'react';
import { useStoryboardStore } from '@/lib/store/storyboard-store';
import FrameDetailDialog from './FrameDetailDialog';
import IterationControls from './IterationControls';

export default function FrameGrid() {
  const { scenes, activeSceneId, activeFrameId, setActiveFrame } = useStoryboardStore((state) => ({
    scenes: state.scenes,
    activeSceneId: state.activeSceneId,
    activeFrameId: state.activeFrameId,
    setActiveFrame: state.setActiveFrame
  }));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const scene = scenes.find((s) => s.id === activeSceneId) ?? scenes[0];
  const frames = scene?.frames ?? [];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {frames.map((frame) => {
          const isActive = frame.id === activeFrameId;
          return (
            <button
              key={frame.id}
              type="button"
              onClick={() => {
                setActiveFrame(frame.id);
                setIsDialogOpen(true);
              }}
              className={`group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                isActive ? 'border-sky-400 shadow-lg' : 'border-slate-700 hover:border-sky-500/60'
              }`}
            >
              {frame.thumbnail ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${frame.thumbnail})` }}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-900/80 text-slate-400">
                  <span className="text-xs uppercase tracking-wide">{frame.status === 'generating' ? 'Generating…' : 'No image yet'}</span>
                  <span className="text-sm font-medium text-slate-200">{frame.prompt}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-slate-950/90 to-transparent p-2 text-left text-xs text-slate-200 opacity-0 transition group-hover:opacity-100">
                <span>{frame.notes}</span>
                <span className="font-semibold uppercase tracking-wide">{frame.status}</span>
              </div>
            </button>
          );
        })}
      </div>
      <IterationControls onOpenDetails={() => setIsDialogOpen(true)} />
      <FrameDetailDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </section>
  );
}
