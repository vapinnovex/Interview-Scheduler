import { create } from 'zustand'

interface InterviewStore {
  interviewId: string | null
  status: 'idle' | 'in_progress' | 'completed'
  setInterviewId: (id: string) => void
  setStatus: (status: 'idle' | 'in_progress' | 'completed') => void
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  interviewId: null,
  status: 'idle',
  setInterviewId: (id) => set({ interviewId: id }),
  setStatus: (status) => set({ status }),
}))
