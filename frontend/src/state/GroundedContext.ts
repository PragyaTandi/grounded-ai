import { createContext, useContext } from 'react'

export type GroundedContextValue = {
  savedIds: string[]
  startedIds: string[]
  completedIds: string[]
  xp: number
  toggleSaved: (id: string) => void
  startAdventure: (id: string) => void
  completeAdventure: (id: string) => boolean
  notify: (message: string) => void
  preferences: AdventurePreferences
  updatePreferences: (patch: Partial<AdventurePreferences>) => void
}

export type AdventurePreferences = {
  mood: string
  minutes: number
  budget: number
  location: string
}

export const GroundedContext = createContext<GroundedContextValue | null>(null)

export function useGrounded() {
  const context = useContext(GroundedContext)
  if (!context) throw new Error('Grounded pages must be inside the app provider.')
  return context
}
