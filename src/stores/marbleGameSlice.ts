import { StateCreator } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware'

export enum GamePhase {
  "READY" = 'ready',
  "ENDED" = 'ended',
  "PLAYING" = 'playing'
}
export interface MarbleGameSlice {
  /**
   * 障碍关卡数量
   */
  blocksCount: number,
  blocksSeed: number,
  /**
   * Time
   */
  startTime: number;
  endTime: number;
  /**
   * Phases
   */
  phase: GamePhase;
  start: () => void;
  restart: () => void;
  end: () => void;
}

const CreateMarbleGameSlice: StateCreator<
  MarbleGameSlice,
  [["zustand/subscribeWithSelector", never]],
  [],
  MarbleGameSlice
> = (set) => ({
  blocksCount: 10,
  blocksSeed: 0,
  startTime: 0,
  endTime: 0,
  phase: GamePhase.READY,

  start: () => {
    set((state) => {
      if (state.phase === GamePhase.READY) {
        return { phase: GamePhase.PLAYING, startTime: Date.now() };
      }

      return {};
    });
  },

  restart: () => {
    set((state) => {
      if (state.phase === GamePhase.PLAYING || state.phase === "ended") {
        return { phase: GamePhase.READY, blocksSeed: Math.random() };
      }

      return {};
    });
  },

  end: () => {
    set((state) => {
      if (state.phase === GamePhase.PLAYING) {
        return { phase: GamePhase.ENDED, endTime: Date.now() };
      }

      return {};
    });
  },
})

export default CreateMarbleGameSlice