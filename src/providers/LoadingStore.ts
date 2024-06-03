"use client";
import { create } from "zustand";

type State = {
  pauseOtherAnimations: boolean;
  playAnimation: () => void;
  pauseAnimation: () => void;
};

const LoadingStore = create<State>((set) => ({
  pauseOtherAnimations: true,
  playAnimation: () => set(() => ({ pauseOtherAnimations: false })),
  pauseAnimation: () => set(() => ({ pauseOtherAnimations: true })),
}));

export default LoadingStore;
