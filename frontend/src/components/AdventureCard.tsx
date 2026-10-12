import { motion } from 'framer-motion'
import { ArrowUpRight, Bookmark, Clock3, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Adventure } from '../data/adventures'
import { useGrounded } from '../state/GroundedContext'

type AdventureCardProps = {
  adventure: Adventure
  index?: number
  compact?: boolean
}

const fallbackImage =
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80'

export function AdventureCard({
  adventure,
  index = 0,
  compact = false,
}: AdventureCardProps) {
  const { savedIds, toggleSaved, notify } = useGrounded()
  const isSaved = savedIds.includes(adventure.id)

  return (
    <motion.article
      className={`adventure-card ${compact ? 'adventure-card-compact' : ''}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.035 }}
    >
      <Link
        className="adventure-card-link"
        to={`/adventure/${adventure.id}`}
        aria-label={`Explore ${adventure.title}`}
      >
        <span className="adventure-image-wrap">
          <img
            className="adventure-image"
            src={adventure.image}
            alt={adventure.imageAlt}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = fallbackImage
            }}
          />
          <span className="card-category">{adventure.category}</span>
        </span>
        <span className="adventure-info">
          <span className="adventure-title">{adventure.title}</span>
          <span className="adventure-description">{adventure.description}</span>
          <span className="adventure-meta">
            <span><Clock3 size={14} /> {adventure.duration} min</span>
            <span><Wallet size={14} /> {adventure.cost === 0 ? 'Free' : `Up to ₹${adventure.cost}`}</span>
          </span>
          <span className="card-footer">
            <span className="price-label">A general adventure idea</span>
            <span className="card-arrow"><ArrowUpRight size={17} /></span>
          </span>
        </span>
      </Link>
      <button
        className={`card-save ${isSaved ? 'is-saved' : ''}`}
        aria-label={isSaved ? `Remove ${adventure.title} from saved` : `Save ${adventure.title}`}
        aria-pressed={isSaved}
        onClick={() => {
          toggleSaved(adventure.id)
          notify(isSaved ? 'Removed from your saved adventures.' : 'Saved for a day that feels right.')
        }}
      >
        <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
      </button>
    </motion.article>
  )
}
