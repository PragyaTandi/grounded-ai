import type { LucideIcon } from 'lucide-react'
import {
  Camera,
  Coffee,
  Compass,
  Leaf,
  Palette,
  Sun,
  Users,
} from 'lucide-react'

export type AdventureCategory = {
  slug: string
  name: string
  emoji: string
  icon: LucideIcon
  description: string
  image: string
  tint: string
}

export type Adventure = {
  id: string
  title: string
  category: string
  categories: string[]
  description: string
  duration: number
  cost: number
  preparation: string
  image: string
  imageAlt: string
  steps: string[]
}

export const categories: AdventureCategory[] = [
  {
    slug: 'nature-reset',
    name: 'Nature Reset',
    emoji: '🌳',
    icon: Leaf,
    description: 'Let a little green give your thoughts some room.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=85',
    tint: 'sage',
  },
  {
    slug: 'little-things-hunter',
    name: 'Little Things Hunter',
    emoji: '📸',
    icon: Camera,
    description: 'Spot tiny wonders hiding in an ordinary street.',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',
    tint: 'sky',
  },
  {
    slug: 'slow-afternoon',
    name: 'Slow Afternoon',
    emoji: '☕',
    icon: Coffee,
    description: 'Make time for a good cup and an even slower walk.',
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=85',
    tint: 'peach',
  },
  {
    slug: 'curious-explorer',
    name: 'Curious Explorer',
    emoji: '🗺️',
    icon: Compass,
    description: 'Take one turn you have never taken before.',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=85',
    tint: 'lavender',
  },
  {
    slug: 'better-together',
    name: 'Better Together',
    emoji: '🧑‍🤝‍🧑',
    icon: Users,
    description: 'Share a small plan and let the conversation wander.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85',
    tint: 'rose',
  },
  {
    slug: 'golden-hour-chaser',
    name: 'Golden Hour Chaser',
    emoji: '🌅',
    icon: Sun,
    description: 'Find a patch of sky and watch the light turn honey.',
    image:
      'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=900&q=85',
    tint: 'gold',
  },
  {
    slug: 'creative-wanderer',
    name: 'Creative Wanderer',
    emoji: '🎨',
    icon: Palette,
    description: 'Bring a notebook. Come back with something you made.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85',
    tint: 'lilac',
  },
]

export const adventures: Adventure[] = [
  {
    id: 'three-street-colors',
    title: 'Find three colors on your street',
    category: 'A tiny adventure',
    categories: ['little-things-hunter', 'curious-explorer'],
    description:
      'Step outside with no destination. Find three colors you would never have thought to put together. A painted gate, a stubborn flower, the evening light on a wall — your ordinary block has more to say than you think.',
    duration: 10,
    cost: 0,
    preparation: 'Just bring yourself. Your camera is optional.',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A sunlit city street lined with colorful buildings',
    steps: [
      'Pick a direction and step out for ten unhurried minutes.',
      'Notice three colors that make you stop, even for a second.',
      'Snap a photo or just keep the colors in your pocket.',
    ],
  },
  {
    id: 'quiet-green-pause',
    title: 'Borrow ten minutes from a tree',
    category: 'Nature Reset',
    categories: ['nature-reset'],
    description:
      'Find a tree, a garden edge, or the tiniest patch of green. Sit nearby and listen. No step count, no productivity target — just a little time borrowed from the rush.',
    duration: 10,
    cost: 0,
    preparation: 'A comfortable place to pause.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Warm afternoon light falling across a quiet green forest',
    steps: [
      'Walk to the nearest patch of green, however small.',
      'Settle in and listen for five different sounds.',
      'Take one slow breath before heading back.',
    ],
  },
  {
    id: 'tiny-planet-photo',
    title: 'Photograph a tiny planet',
    category: 'Little Things Hunter',
    categories: ['little-things-hunter', 'creative-wanderer'],
    description:
      'Look for a detail so small it belongs to its own world: rain on a leaf, a curled-up sign, the pattern in a drain cover. Get close. See what the everyday looks like when you give it a starring role.',
    duration: 20,
    cost: 0,
    preparation: 'A phone camera is plenty.',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A close view of tiny droplets resting on a bright green leaf',
    steps: [
      'Take a short walk and keep your eyes near ground level.',
      'Find one small detail you have never noticed before.',
      'Frame it in a photo, or simply give it a moment of attention.',
    ],
  },
  {
    id: 'no-usual-turn',
    title: 'Take the turn you always pass',
    category: 'Curious Explorer',
    categories: ['curious-explorer', 'little-things-hunter'],
    description:
      'That lane you always walk past is a whole little world you have not met yet. Take it, stay somewhere familiar and safe, and let curiosity set the pace.',
    duration: 20,
    cost: 0,
    preparation: 'Comfortable shoes and a route you feel good about.',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A leafy neighborhood street disappearing into the distance',
    steps: [
      'Choose a nearby turn you have never taken.',
      'Walk it without rushing; notice doors, trees, and signs.',
      'Turn back whenever you like — curiosity has no mileage minimum.',
    ],
  },
  {
    id: 'sky-sounds',
    title: 'Listen for five little sounds',
    category: 'Nature Reset',
    categories: ['nature-reset', 'golden-hour-chaser'],
    description:
      'Find a calm spot outside and let the world come to you. A bird, a breeze, someone laughing down the block. The soundtrack was here before you noticed.',
    duration: 10,
    cost: 0,
    preparation: 'Nothing at all.',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Quiet open countryside in the soft light of early morning',
    steps: [
      'Find a safe, comfortable spot outdoors.',
      'Close your eyes if you like and listen for five different sounds.',
      'Open your eyes and notice what feels different.',
    ],
  },
  {
    id: 'sky-color-watch',
    title: 'Watch the sky change its mind',
    category: 'Golden Hour Chaser',
    categories: ['golden-hour-chaser', 'nature-reset'],
    description:
      'Pick a safe place with a view of the sky and watch the light shift for ten minutes. Sunset not required. Clouds are excellent company too.',
    duration: 20,
    cost: 0,
    preparation: 'Check the sky from your doorstep before you set out.',
    image:
      'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A soft orange sunset sinking behind a distant horizon',
    steps: [
      'Find a nearby open view or a spot where the sky peeks through.',
      'Notice the colors and shapes for ten quiet minutes.',
      'Take a picture, or let the moment be only yours.',
    ],
  },
  {
    id: 'cup-and-chapter',
    title: 'A cup of something, somewhere new',
    category: 'Slow Afternoon',
    categories: ['slow-afternoon', 'curious-explorer'],
    description:
      'Bring a drink from home or choose a little local treat within your budget. Find a sunny bench, window seat, or library corner and enjoy one chapter with nowhere else to be.',
    duration: 30,
    cost: 200,
    preparation: 'A drink you already love, or a small treat within your budget.',
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A warm cup of coffee on a cafe table beside a bright window',
    steps: [
      'Bring your favorite drink or pick up something small.',
      'Choose a different bench, quiet corner, or cafe window.',
      'Read, people-watch, or let your mind wander for a little while.',
    ],
  },
  {
    id: 'friendly-loop',
    title: 'A no-plan walk with someone you like',
    category: 'Better Together',
    categories: ['better-together', 'nature-reset'],
    description:
      'Text a friend, sibling, or neighbor and suggest one easy loop near home. There is no route to optimize and no conversation to prepare — just see where you end up together.',
    duration: 30,
    cost: 0,
    preparation: 'An invite to someone whose company feels easy.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Friends walking together outside in the soft afternoon light',
    steps: [
      'Invite someone for a short walk, with no big plan.',
      'Pick a familiar, comfortable loop together.',
      'Leave your phones in your pockets and see what comes up.',
    ],
  },
  {
    id: 'pocket-sketch',
    title: 'Sketch the shape of a quiet corner',
    category: 'Creative Wanderer',
    categories: ['creative-wanderer', 'slow-afternoon'],
    description:
      'Find a spot where you can sit for a little while. Draw one thing you can see — a window, a plant, a crooked lamppost. This is for noticing, not for getting it right.',
    duration: 30,
    cost: 0,
    preparation: 'Any scrap of paper and a pen or pencil.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A colorful artist sketchbook open beside paints and pencils',
    steps: [
      'Find a safe place to sit with something interesting in view.',
      'Spend ten minutes sketching its shape or a small detail.',
      'Sign your masterpiece, even if it is wonderfully wobbly.',
    ],
  },
  {
    id: 'chandaka-greenway',
    title: 'Find your quiet under the trees',
    category: 'Nature Reset',
    categories: ['nature-reset', 'golden-hour-chaser'],
    description:
      'A longer, gentle wander among trees. This is a general adventure idea, not a verified local trail recommendation — pick a nearby green space you know is open and welcoming.',
    duration: 60,
    cost: 0,
    preparation: 'Comfortable shoes, water, and a park or greenway you know.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A green woodland footpath dappled with afternoon sunshine',
    steps: [
      'Choose a park or greenway you know is open and safe.',
      'Walk at the pace that feels right; pause when something catches your eye.',
      'Head home whenever you have had enough fresh air.',
    ],
  },
]

export const getAdventure = (id: string | undefined) =>
  adventures.find((adventure) => adventure.id === id)

export const getCategory = (slug: string | undefined) =>
  categories.find((category) => category.slug === slug)

export const categoryPath = (slug: string) => `/discover/${slug}`
