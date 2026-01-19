import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GrowthMetrics, EngagementMission } from '../data/mockData';
import { INITIAL_METRICS, ENGAGEMENT_MISSIONS } from '../data/mockData';

interface UserProgress {
  currentStage: number;
  selectedTracks: string[];
  completedMissions: string[];
  savedThreads: string[];
}

interface AppState {
  metrics: GrowthMetrics;
  progress: UserProgress;
  missions: EngagementMission[];
  updateMetrics: (metrics: Partial<GrowthMetrics>) => void;
  setStage: (stage: number) => void;
  addTrack: (trackId: string) => void;
  removeTrack: (trackId: string) => void;
  completeMission: (missionId: string) => void;
  saveThread: (threadId: string) => void;
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  currentStage: 1,
  selectedTracks: [],
  completedMissions: [],
  savedThreads: [],
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      metrics: INITIAL_METRICS,
      progress: initialProgress,
      missions: ENGAGEMENT_MISSIONS,
      
      updateMetrics: (newMetrics) =>
        set((state) => ({
          metrics: { ...state.metrics, ...newMetrics },
        })),
      
      setStage: (stage) =>
        set((state) => ({
          progress: { ...state.progress, currentStage: stage },
        })),
      
      addTrack: (trackId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            selectedTracks: [...state.progress.selectedTracks, trackId],
          },
        })),
      
      removeTrack: (trackId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            selectedTracks: state.progress.selectedTracks.filter((id) => id !== trackId),
          },
        })),
      
      completeMission: (missionId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            completedMissions: [...state.progress.completedMissions, missionId],
          },
          missions: state.missions.map((m) =>
            m.id === missionId ? { ...m, completed: true } : m
          ),
        })),
      
      saveThread: (threadId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            savedThreads: [...state.progress.savedThreads, threadId],
          },
        })),
      
      resetProgress: () =>
        set({
          progress: initialProgress,
          metrics: INITIAL_METRICS,
          missions: ENGAGEMENT_MISSIONS,
        }),
    }),
    {
      name: 'xkol-storage',
    }
  )
);
