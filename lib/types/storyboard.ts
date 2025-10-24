export type FrameStatus = 'idle' | 'generating' | 'completed' | 'error';

export interface Frame {
  id: string;
  thumbnail?: string;
  prompt: string;
  notes: string;
  status: FrameStatus;
  seed?: string;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  prompt: string;
  script: string;
  frames: Frame[];
}

export interface StoryboardStateSnapshot {
  scenes: Scene[];
  activeSceneId: string | null;
  activeFrameId: string | null;
  isGenerating: boolean;
}
