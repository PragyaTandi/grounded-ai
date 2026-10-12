import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Compass,
  Clock3,
  Footprints,
  Heart,
  Leaf,
  Map,
  MapPin,
  Menu,
  Plus,
  Search,
  Sparkles,
  Sun,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'

type Adventure = {
  id: number
  title: string
  category: string
  duration: string
  distance: string
  price: string
  image: string
  color: string
  icon: typeof Leaf
}

const adventures: Adventure[] = [
  {
    id: 1,
    title: 'Find your quiet at Dhauli',
    category: 'Outdoors',
    duration: '2–3 hours',
    distance: '6.2 km away',
    price: 'Free',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85',
    color: 'sage',
    icon: Sun,
  },
  {
    id: 2,
    title: 'A slow morning at Ekamra Haat',
    category: 'Food & drink',
    duration: '1–2 hours',
    distance: '3.1 km away',
    price: '₹200',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85',
    color: 'peach',
    icon: Heart,
  },
  {
    id: 3,
    title: 'Wander the old city, slowly',
    category: 'Slow living',
    duration: '1–2 hours',
    distance: '1.8 km away',
    price: 'Free',
    image:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    color: 'lavender',
    icon: Footprints,
  },
]

const categories = ['For you', 'Outdoors', 'Food & drink', 'Slow living']

const navItems = [
  { name: 'Discover', icon: Compass },
  { name: 'My adventures', icon: Map },
  { name: 'Saved places', icon: Bookmark },
]

function App() {
  const [activeNav, setActiveNav] = useState('Discover')
  const [category, setCategory] = useState('For you')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<number[]>([])
  const [showPlanner, setShowPlanner] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [toast, setToast] = useState('')
  const [planMood, setPlanMood] = useState('A little adventure')

  const visibleAdventures = useMemo(() => {
    return adventures.filter((adventure) => {
      const matchesCategory =
        category === 'For you' || adventure.category === category
      const matchesSearch = `${adventure.title} ${adventure.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesSaved =
        activeNav !== 'Saved places' || saved.includes(adventure.id)
      return matchesCategory && matchesSearch && matchesSaved
    })
  }, [activeNav, category, saved, search])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const toggleSaved = (id: number, title: string) => {
    const isSaved = saved.includes(id)
    setSaved((current) =>
      isSaved ? current.filter((savedId) => savedId !== id) : [...current, id],
    )
    notify(isSaved ? 'Removed from your saved places' : `${title} saved for later`)
  }

  const navigateTo = (name: string) => {
    setActiveNav(name)
    setShowMobileMenu(false)
    if (name !== 'Discover') setCategory('For you')
  }

  const startAdventure = (name: string) => {
    setShowPlanner(false)
    notify(`Your ${name.toLowerCase()} is ready when you are 🌿`)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${showMobileMenu ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#home" onClick={() => navigateTo('Discover')}>
          <span className="brand-mark">
            <Leaf size={21} strokeWidth={2.2} />
          </span>
          <span>grounded<span className="brand-period">.</span></span>
        </a>

        <div className="sidebar-label">YOUR LITTLE ESCAPE</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map(({ name, icon: Icon }) => (
            <button
              className={`nav-item ${activeNav === name ? 'nav-item-active' : ''}`}
              key={name}
              onClick={() => navigateTo(name)}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{name}</span>
              {name === 'Saved places' && saved.length > 0 && (
                <span className="nav-count">{saved.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="weekly-card">
            <div className="weekly-top">
              <span className="weekly-icon"><Footprints size={16} /></span>
              <span className="weekly-caption">YOUR WEEKLY GOAL</span>
            </div>
            <strong>2 of 3 days outside</strong>
            <div className="progress-track"><span /></div>
            <span className="weekly-note">One more little adventure to go!</span>
          </div>
          <button className="profile-button" onClick={() => notify('Profile settings coming soon')}>
            <span className="avatar">A</span>
            <span className="profile-copy"><strong>Alex Morgan</strong><small>Trail seeker · Level 4</small></span>
            <ChevronDown size={16} className="profile-chevron" />
          </button>
        </div>
      </aside>

      {showMobileMenu && (
        <button
          className="mobile-scrim"
          aria-label="Close navigation"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <main className="main-panel" id="home">
        <header className="topbar">
          <div className="location-label">
            <MapPin size={16} />
            <span>Bhubaneswar, India</span>
            <ChevronDown size={14} />
          </div>
          <div className="topbar-actions">
            <span className="weather-pill"><Sun size={15} /> 29° <span>Sunny skies</span></span>
            <button className="mobile-menu-button" aria-label="Open navigation" onClick={() => setShowMobileMenu(true)}>
              <Menu size={21} />
            </button>
            <button className="avatar topbar-avatar" aria-label="Your profile" onClick={() => notify('You’re doing lovely, Alex 🌱')}>A</button>
          </div>
        </header>

        <div className="page-content">
          <section className="greeting-row">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> MONDAY, OCTOBER 12</p>
              <h1>A little fresh air, <span>Alex?</span></h1>
              <p className="greeting-subtitle">Your next good day is closer than you think.</p>
            </div>
            <button className="outline-button planner-trigger" onClick={() => setShowPlanner(true)}>
              <Sparkles size={16} /> Plan something
            </button>
          </section>

          <section className="feature-card" aria-label="Featured adventure">
            <div className="feature-image" />
            <div className="feature-shade" />
            <div className="feature-topline">
              <span className="feature-tag"><Sparkles size={13} /> PICKED FOR YOUR PACE</span>
              <button
                className={`feature-save ${saved.includes(4) ? 'is-saved' : ''}`}
                aria-label={saved.includes(4) ? 'Remove featured adventure from saved' : 'Save featured adventure'}
                onClick={() => toggleSaved(4, 'Chandaka forest escape')}
              >
                <Bookmark size={17} fill={saved.includes(4) ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="feature-content">
              <div className="feature-kicker">TODAY’S LITTLE ESCAPE</div>
              <h2>Lose the noise.<br />Find the green.</h2>
              <p>A forest-side reset at Chandaka, with room to wander and absolutely nowhere else to be.</p>
              <div className="feature-meta">
                <span><Clock3 size={15} /> 2–3 hours</span>
                <span><MapPin size={15} /> 8 km away</span>
                <span><Wallet size={15} /> Easy on the wallet</span>
              </div>
              <button className="feature-button" onClick={() => startAdventure('Chandaka forest escape')}>
                Take me there <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="feature-footnote"><span className="tiny-sun"><Sun size={13} /></span> A good day to go slow</div>
          </section>

          <section className="discover-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow section-eyebrow">MADE FOR YOUR MOOD</p>
                <h2>{activeNav === 'Saved places' ? 'Little places to remember' : activeNav === 'My adventures' ? 'Your next good story' : 'A few nearby wonders'}</h2>
              </div>
              <div className="section-tools">
                <label className="search-box">
                  <Search size={16} />
                  <input
                    aria-label="Search adventures"
                    placeholder="Find your thing"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  {search && <button aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}
                </label>
              </div>
            </div>

            <div className="discovery-toolbar">
              <div className="category-tabs" role="tablist" aria-label="Adventure categories">
                {categories.map((item) => (
                  <button
                    className={`category-tab ${category === item ? 'category-tab-active' : ''}`}
                    key={item}
                    role="tab"
                    aria-selected={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button className="all-nearby" onClick={() => notify('Showing adventures around Bhubaneswar')}>
                All nearby <ArrowRight size={15} />
              </button>
            </div>

            {visibleAdventures.length > 0 ? (
              <div className="adventure-grid">
                <AnimatePresence mode="popLayout">
                  {visibleAdventures.map((adventure, index) => {
                    const Icon = adventure.icon
                    const isSaved = saved.includes(adventure.id)
                    return (
                      <motion.article
                        className="adventure-card"
                        key={adventure.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.22, delay: index * 0.035 }}
                      >
                        <div className="adventure-image-wrap">
                          <img className="adventure-image" src={adventure.image} alt="" />
                          <span className={`card-category ${adventure.color}`}><Icon size={13} /> {adventure.category}</span>
                          <button
                            className={`card-save ${isSaved ? 'is-saved' : ''}`}
                            aria-label={isSaved ? `Remove ${adventure.title} from saved` : `Save ${adventure.title}`}
                            onClick={() => toggleSaved(adventure.id, adventure.title)}
                          >
                            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                        <div className="adventure-info">
                          <h3>{adventure.title}</h3>
                          <div className="adventure-meta">
                            <span><Clock3 size={13} />{adventure.duration}</span>
                            <span><MapPin size={13} />{adventure.distance}</span>
                          </div>
                          <div className="card-footer">
                            <span className="price-label">{adventure.price}</span>
                            <button className="card-arrow" aria-label={`Plan ${adventure.title}`} onClick={() => startAdventure(adventure.title)}>
                              <ArrowUpRight size={17} />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
                <button className="more-card" onClick={() => setShowPlanner(true)}>
                  <span className="more-icon"><Plus size={19} /></span>
                  <strong>Make your own<br />kind of day</strong>
                  <span>Build a little adventure that feels like you <ArrowDownRight size={14} /></span>
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-icon"><Leaf size={21} /></span>
                <h3>{activeNav === 'Saved places' ? 'A fresh page, for now.' : 'No little wonders found.'}</h3>
                <p>{activeNav === 'Saved places' ? 'Save a place you love and it’ll be waiting right here.' : 'Try another search or mood. There’s always somewhere new.'}</p>
                <button onClick={() => { setActiveNav('Discover'); setCategory('For you'); setSearch('') }}>Back to discovering <ArrowRight size={15} /></button>
              </div>
            )}
          </section>

          <section className="bottom-note">
            <span className="note-icon"><Leaf size={15} /></span>
            <span>Small steps count. <strong>Getting outside is the whole point.</strong></span>
            <span className="note-divider" />
            <span className="streak-label"><span>🔥</span> 4-day outside streak</span>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {showPlanner && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => { if (event.target === event.currentTarget) setShowPlanner(false) }}
          >
            <motion.section
              className="planner-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="planner-title"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button className="modal-close" aria-label="Close planner" onClick={() => setShowPlanner(false)}><X size={19} /></button>
              <span className="modal-sparkle"><Sparkles size={20} /></span>
              <p className="eyebrow section-eyebrow">A LITTLE HELP FROM GROUNDED</p>
              <h2 id="planner-title">What sounds good today?</h2>
              <p className="modal-description">We’ll find you something lovely nearby. No big plans needed.</p>
              <div className="mood-options" role="group" aria-label="Choose your adventure mood">
                {['A little adventure', 'Slow & easy', 'Something social'].map((mood, index) => {
                  const MoodIcon = [Compass, Sun, Users][index]
                  return (
                    <button
                      className={`mood-option ${planMood === mood ? 'mood-option-active' : ''}`}
                      key={mood}
                      onClick={() => setPlanMood(mood)}
                    >
                      <MoodIcon size={17} />
                      <span>{mood}</span>
                      {planMood === mood && <Check size={16} className="mood-check" />}
                    </button>
                  )
                })}
              </div>
              <div className="planner-context"><MapPin size={15} /> Bhubaneswar <span /> <Clock3 size={15} /> Today, your pace</div>
              <button className="planner-submit" onClick={() => startAdventure(planMood)}>
                Find my little escape <ArrowRight size={17} />
              </button>
              <p className="modal-footnote">Thoughtfully picked for the real world, not the scroll.</p>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <span className="toast-check"><Check size={14} /></span>{toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
