import { useEffect, useState } from 'react'
import { adventures } from '../data/adventures'

const adventureIds = new Set(adventures.map((adventure) => adventure.id))

function readIdList(key: string): string[] {
  try {
    const storedValue: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
    if (!Array.isArray(storedValue)) return []
    return [...new Set(storedValue.filter(
      (id): id is string => typeof id === 'string' && adventureIds.has(id),
    ))]
  } catch (error) {
    console.error(`Could not read Grounded progress from "${key}".`, error)
    return []
  }
}

function useStoredIdList(key: string) {
  const [ids, setIds] = useState<string[]>(() => readIdList(key))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(ids))
    } catch (error) {
      console.error(`Could not save Grounded progress to "${key}".`, error)
    }
  }, [ids, key])

  return [ids, setIds] as const
}

export function useGroundedState() {
  const [savedIds, setSavedIds] = useStoredIdList('grounded:saved')
  const [startedIds, setStartedIds] = useStoredIdList('grounded:started')
  const [completedIds, setCompletedIds] = useStoredIdList('grounded:completed')

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    )
  }

  const startAdventure = (id: string) => {
    setStartedIds((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }

  const completeAdventure = (id: string) => {
    if (completedIds.includes(id)) return false
    setCompletedIds((current) => [...current, id])
    setStartedIds((current) => current.filter((startedId) => startedId !== id))
    return true
  }

  return {
    savedIds,
    startedIds,
    completedIds,
    xp: completedIds.length * 50,
    toggleSaved,
    startAdventure,
    completeAdventure,
  }
}
