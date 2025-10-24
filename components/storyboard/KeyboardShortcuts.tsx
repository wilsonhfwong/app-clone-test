'use client';

import { useEffect } from 'react';
import { useStoryboardStore } from '@/lib/store/storyboard-store';

export default function KeyboardShortcuts() {
  const { undo, redo, activeFrameId, activeSceneId, regenerateFrame } = useStoryboardStore((state) => ({
    undo: state.undo,
    redo: state.redo,
    activeFrameId: state.activeFrameId,
    activeSceneId: state.activeSceneId,
    regenerateFrame: state.regenerateFrame
  }));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isMeta = event.metaKey || event.ctrlKey;
      if (isMeta && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }

      if (event.key.toLowerCase() === 'r' && activeFrameId && activeSceneId) {
        event.preventDefault();
        regenerateFrame(activeSceneId, activeFrameId);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [undo, redo, regenerateFrame, activeFrameId, activeSceneId]);

  return null;
}
