'use client';

import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Frame, FrameStatus, Scene, StoryboardStateSnapshot } from '@/lib/types/storyboard';

type HistoryStack = StoryboardStateSnapshot[];

interface StoryboardStore {
  scenes: Scene[];
  activeSceneId: string | null;
  activeFrameId: string | null;
  isGenerating: boolean;
  undoStack: HistoryStack;
  redoStack: HistoryStack;
  setScenes: (scenes: Scene[]) => void;
  setActiveScene: (sceneId: string) => void;
  setActiveFrame: (frameId: string | null) => void;
  updateScenePrompt: (sceneId: string, prompt: string) => void;
  updateSceneScript: (sceneId: string, script: string) => void;
  updateFrame: (sceneId: string, frameId: string, updater: (frame: Frame) => Frame) => void;
  addFrame: (sceneId: string) => void;
  regenerateFrame: (sceneId: string, frameId: string) => void;
  setFrameStatus: (sceneId: string, frameId: string, status: FrameStatus) => void;
  toggleGenerating: (state: boolean) => void;
  undo: () => void;
  redo: () => void;
  captureSnapshot: () => void;
}

const DEFAULT_FRAME: Frame = {
  id: 'frame-initial',
  prompt: 'Wide establishing shot of the scene.',
  notes: 'Set the mood and setting for the storyboard.',
  status: 'idle'
};

const DEFAULT_SCENE: Scene = {
  id: 'scene-1',
  title: 'Opening Scene',
  description: 'Introduce characters and establish the world.',
  prompt: 'Describe the opening scene with mood and lighting cues.',
  script: 'INT. STUDIO - DAY',
  frames: [DEFAULT_FRAME]
};

function cloneSnapshot(state: StoryboardStore): StoryboardStateSnapshot {
  return {
    scenes: state.scenes.map((scene) => ({
      ...scene,
      frames: scene.frames.map((frame) => ({ ...frame }))
    })),
    activeSceneId: state.activeSceneId,
    activeFrameId: state.activeFrameId,
    isGenerating: state.isGenerating
  };
}

export const useStoryboardStore = create<StoryboardStore>()(
  devtools((set, get) => ({
    scenes: [DEFAULT_SCENE],
    activeSceneId: DEFAULT_SCENE.id,
    activeFrameId: DEFAULT_FRAME.id,
    isGenerating: false,
    undoStack: [],
    redoStack: [],
    setScenes: (scenes) =>
      set((state) => ({
        scenes,
        activeSceneId: scenes[0]?.id ?? null,
        activeFrameId: scenes[0]?.frames[0]?.id ?? null,
        undoStack: [...state.undoStack, cloneSnapshot(state)],
        redoStack: []
      })),
    setActiveScene: (sceneId) =>
      set((state) => {
        const scene = state.scenes.find((item) => item.id === sceneId);
        return {
          activeSceneId: sceneId,
          activeFrameId: scene?.frames[0]?.id ?? null
        };
      }),
    setActiveFrame: (frameId) => set({ activeFrameId: frameId }),
    updateScenePrompt: (sceneId, prompt) =>
      set((state) => ({
        scenes: state.scenes.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                prompt
              }
            : scene
        )
      })),
    updateSceneScript: (sceneId, script) =>
      set((state) => ({
        scenes: state.scenes.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                script
              }
            : scene
        )
      })),
    updateFrame: (sceneId, frameId, updater) =>
      set((state) => ({
        scenes: state.scenes.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                frames: scene.frames.map((frame) =>
                  frame.id === frameId ? updater(frame) : frame
                )
              }
            : scene
        )
      })),
    addFrame: (sceneId) => {
      get().captureSnapshot();
      set((state) => ({
        scenes: state.scenes.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                frames: [
                  ...scene.frames,
                  {
                    id: nanoid(),
                    prompt: scene.prompt,
                    notes: 'New frame iteration',
                    status: 'idle'
                  }
                ]
              }
            : scene
        )
      }));
    },
    regenerateFrame: (sceneId, frameId) => {
      get().captureSnapshot();
      const { updateFrame, toggleGenerating } = get();
      toggleGenerating(true);
      updateFrame(sceneId, frameId, (frame) => ({
        ...frame,
        status: 'generating'
      }));
      setTimeout(() => {
        toggleGenerating(false);
        updateFrame(sceneId, frameId, (frame) => ({
          ...frame,
          status: 'completed'
        }));
      }, 800);
    },
    setFrameStatus: (sceneId, frameId, status) =>
      set((state) => ({
        scenes: state.scenes.map((scene) =>
          scene.id === sceneId
            ? {
                ...scene,
                frames: scene.frames.map((frame) =>
                  frame.id === frameId
                    ? {
                        ...frame,
                        status
                      }
                    : frame
                )
              }
            : scene
        )
      })),
    toggleGenerating: (stateFlag) => set({ isGenerating: stateFlag }),
    undo: () =>
      set((state) => {
        const previous = state.undoStack.at(-1);
        if (!previous) {
          return state;
        }
        const newUndo = state.undoStack.slice(0, -1);
        return {
          ...previous,
          undoStack: newUndo,
          redoStack: [cloneSnapshot(state), ...state.redoStack]
        };
      }),
    redo: () =>
      set((state) => {
        const next = state.redoStack.at(0);
        if (!next) {
          return state;
        }
        const newRedo = state.redoStack.slice(1);
        return {
          ...next,
          undoStack: [...state.undoStack, cloneSnapshot(state)],
          redoStack: newRedo
        };
      }),
    captureSnapshot: () =>
      set((state) => ({
        undoStack: [...state.undoStack, cloneSnapshot(state)],
        redoStack: []
      }))
  }))
);
