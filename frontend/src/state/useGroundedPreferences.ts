import { useEffect, useState } from 'react'
import { categories } from '../data/adventures'
import type { AdventurePreferences } from './GroundedContext'

const storageKey = 'grounded:preferences'
const categorySlugs = new Set(categories.map((category) => category.slug))

const defaults: AdventurePreferences = {
  mood: '',
  minutes: 30,
  budget: 0,
  location: '',
}

function loadPreferences(): AdventurePreferences {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (typeof value !== 'object' || value === null) return defaults
    const stored = value as Partial<AdventurePreferences>
    return {
      mood: typeof stored.mood === 'string' && categorySlugs.has(stored.mood) ? stored.mood : '',
      minutes: typeof stored.minutes === 'number' && [10, 20, 30, 60].includes(stored.minutes) ? stored.minutes : defaults.minutes,
      budget: typeof stored.budget === 'number' && [0, 100, 300].includes(stored.budget) ? stored.budget : defaults.budget,
      location: typeof stored.location === 'string' ? stored.location : '',
    }
  } catch (error) {
    console.error('Could not read Grounded preferences.', error)
    return defaults
  }
}

export function useGroundedPreferences() {
  const [preferences, setPreferences] = useState(loadPreferences)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences))
    } catch (error) {
      console.error('Could not save Grounded preferences.', error)
    }
  }, [preferences])

  const updatePreferences = (patch: Partial<AdventurePreferences>) => {
    setPreferences((current) => ({ ...current, ...patch }))
  }

  return { preferences, updatePreferences }
}
