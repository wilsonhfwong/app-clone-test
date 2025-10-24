'use client';

import { ArrowPathIcon, DocumentDuplicateIcon, PhotoIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useStoryboardStore } from '@/lib/store/storyboard-store';

interface IterationControlsProps {
  onOpenDetails: () => void;
}

export default function IterationControls({ onOpenDetails }: IterationControlsProps) {
  const {
    activeSceneId,
    activeFrameId,
    regenerateFrame,
    addFrame,
    undo,
    redo,
    isGenerating
  } = useStoryboardStore((state) => ({
    activeSceneId: state.activeSceneId,
    activeFrameId: state.activeFrameId,
    regenerateFrame: state.regenerateFrame,
    addFrame: state.addFrame,
    undo: state.undo,
    redo: state.redo,
    isGenerating: state.isGenerating
  }));

  const hasSelection = Boolean(activeSceneId && activeFrameId);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-900/70 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => hasSelection && regenerateFrame(activeSceneId!, activeFrameId!)}
          disabled={!hasSelection || isGenerating}
          className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Regenerate
        </button>
        <button
          type="button"
          onClick={() => hasSelection && onOpenDetails()}
          disabled={!hasSelection}
          className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <DocumentDuplicateIcon className="h-4 w-4" />
          Tweak prompt
        </button>
        <button
          type="button"
          onClick={() => activeSceneId && addFrame(activeSceneId)}
          className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
        >
          <PhotoIcon className="h-4 w-4" />
          New frame
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={undo}
          className="rounded-md border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
        >
          Undo ⌘Z
        </button>
        <button
          type="button"
          onClick={redo}
          className="rounded-md border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
        >
          Redo ⇧⌘Z
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-400"
        >
          <ShareIcon className="h-4 w-4" />
          Export / Share
        </button>
      </div>
    </div>
  );
}
