"use client"

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GamesInPlay {
  games: Record<string, string[]>[];
  setGames: (games: Record<string, string[]>[]) => void;
}

const useGamesInPlay = create<GamesInPlay>()(
  persist(
    (set) => ({
      games: [],
      setGames: (games) => set({ games }),
    }),
    { name: "games-in-play", storage: createJSONStorage(() => localStorage) }
  )
);

export default useGamesInPlay;


