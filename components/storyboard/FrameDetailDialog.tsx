'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import { useStoryboardStore } from '@/lib/store/storyboard-store';

interface FrameDetailDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function FrameDetailDialog({ open, onClose }: FrameDetailDialogProps) {
  const {
    scenes,
    activeSceneId,
    activeFrameId,
    updateFrame,
    captureSnapshot
  } = useStoryboardStore((state) => ({
    scenes: state.scenes,
    activeSceneId: state.activeSceneId,
    activeFrameId: state.activeFrameId,
    updateFrame: state.updateFrame,
    captureSnapshot: state.captureSnapshot
  }));

  const scene = useMemo(() => scenes.find((s) => s.id === activeSceneId), [scenes, activeSceneId]);
  const frame = scene?.frames.find((f) => f.id === activeFrameId);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/90 shadow-2xl">
                {frame ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[4/3] bg-slate-950">
                      {frame.thumbnail ? (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${frame.thumbnail})` }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-500">No frame preview</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-4 p-6">
                      <Dialog.Title className="text-lg font-semibold text-white">Frame details</Dialog.Title>
                      <label className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-wide text-slate-400">Prompt</span>
                        <textarea
                          className="h-28 resize-none rounded-md border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
                          value={frame.prompt}
                          onChange={(event) => {
                            captureSnapshot();
                            updateFrame(scene!.id, frame.id, (current) => ({
                              ...current,
                              prompt: event.target.value
                            }));
                          }}
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-wide text-slate-400">Notes</span>
                        <textarea
                          className="h-24 resize-none rounded-md border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
                          value={frame.notes}
                          onChange={(event) => {
                            captureSnapshot();
                            updateFrame(scene!.id, frame.id, (current) => ({
                              ...current,
                              notes: event.target.value
                            }));
                          }}
                        />
                      </label>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span>Status:</span>
                        <span className="rounded-full bg-slate-800 px-3 py-1 font-semibold uppercase tracking-wide text-slate-200">
                          {frame.status}
                        </span>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button
                          type="button"
                          onClick={onClose}
                          className="rounded-md border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-400"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-400">Select a frame to see its details.</div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
