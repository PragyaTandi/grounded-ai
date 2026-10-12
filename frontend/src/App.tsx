import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Footprints,
  Heart,
  Leaf,
  Map,
  Menu,
  PartyPopper,
  Search,
  Sparkles,
  Sun,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { AdventureCard } from './components/AdventureCard'
import {
  adventures,
  categories,
  categoryPath,
  getAdventure,
  getCategory,
} from './data/adventures'
import { GroundedContext, useGrounded } from './state/GroundedContext'
import { useGroundedPreferences } from './state/useGroundedPreferences'
import { useGroundedState } from './state/useGroundedState'
import './App.css'

const inspiration = [
  'Somewhere, the sky is doing something beautiful.',
  'Your camera roll deserves a new chapter.',
  'Take the long way home today.',
  'There’s a tiny adventure within reach.',
]

const moodChoices = [
  { label: 'I need fresh air', emoji: '🌿', category: 'nature-reset' },
  { label: 'I want something beautiful', emoji: '✨', category: 'golden-hour-chaser' },
  { label: 'I’m feeling social', emoji: '🧑‍🤝‍🧑', category: 'better-together' },
  { label: 'I need some quiet', emoji: '☁️', category: 'slow-afternoon' },
  { label: 'Let’s get curious', emoji: '🔎', category: 'little-things-hunter' },
]

const inspirationForCategory = (slug: string | undefined) =>
  categories.find((category) => category.slug === slug)

function App() {
  const progress = useGroundedState()
  const { preferences, updatePreferences } = useGroundedPreferences()
  const [toast, setToast] = useState('')
  const value = {
    ...progress,
    notify: setToast,
    preferences,
    updatePreferences,
  }

  return (
    <GroundedContext.Provider value={value}>
      <div className="app-shell">
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="discover" element={<DiscoveryPage />} />
            <Route path="discover/:category" element={<CategoryPage />} />
            <Route path="adventure/:id" element={<AdventureDetailPage />} />
            <Route path="plan" element={<PlannerPage />} />
            <Route path="saved" element={<SavedPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="rewards" element={<RewardsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast"
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <span className="toast-check"><Check size={14} /></span>
              {toast}
              <button aria-label="Dismiss notification" onClick={() => setToast('')}>
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GroundedContext.Provider>
  )
}

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { savedIds, xp } = useGrounded()

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark"><Leaf size={21} strokeWidth={2.2} /></span>
          <span>grounded<span className="brand-period">.</span></span>
        </Link>
        <p className="sidebar-label">A LITTLE ROOM TO WANDER</p>
        <nav className="primary-nav" aria-label="Main navigation">
          <NavLink className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`} to="/" end onClick={closeMenu}>
            <Compass size={19} /><span>Home</span>
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`} to="/discover" onClick={closeMenu}>
            <Map size={19} /><span>Discover</span>
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`} to="/saved" onClick={closeMenu}>
            <Bookmark size={19} /><span>Saved adventures</span>
            {savedIds.length > 0 && <span className="nav-count">{savedIds.length}</span>}
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`} to="/community" onClick={closeMenu}>
            <Users size={19} /><span>Better together</span>
          </NavLink>
          <NavLink className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`} to="/rewards" onClick={closeMenu}>
            <Sparkles size={19} /><span>Your little wins</span>
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <Link className="weekly-card" to="/rewards" onClick={closeMenu}>
            <span className="weekly-top">
              <span className="weekly-icon"><Footprints size={16} /></span>
              <span className="weekly-caption">YOUR OUTSIDE XP</span>
            </span>
            <strong>{xp} little points earned</strong>
            <span className="progress-track"><span style={{ width: `${Math.min(xp % 250 / 250 * 100, 100)}%` }} /></span>
            <span className="weekly-note">Every step out counts. See your wins →</span>
          </Link>
          <div className="sidebar-note"><span>🌱</span> Start wherever you are.</div>
        </div>
      </aside>
      {menuOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={closeMenu} />}

      <main className="main-panel">
        <header className="topbar">
          <Link className="location-label" to="/discover">
            <Map size={16} /><span>Explore from anywhere</span><ChevronDown size={14} />
          </Link>
          <div className="topbar-actions">
            <Link className="topbar-invite" to="/plan"><Sparkles size={15} /> Find me a little adventure</Link>
            <button className="mobile-menu-button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <Menu size={21} />
            </button>
            <Link className="xp-pill" to="/rewards"><Sparkles size={14} /> {xp} XP</Link>
          </div>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const { notify, preferences, updatePreferences } = useGrounded()
  const { mood, minutes: time, budget } = preferences
  const [tinyIndex, setTinyIndex] = useState(0)
  const [quote] = useState(() => inspiration[Math.floor(Math.random() * inspiration.length)])
  const tinyAdventures = adventures.filter((adventure) => adventure.duration <= 20 && adventure.cost === 0)
  const currentTiny = tinyAdventures[tinyIndex % tinyAdventures.length]

  const matches = useMemo(() => adventures.filter((adventure) => {
    const matchesMood = !mood || adventure.categories.includes(mood)
    return matchesMood && adventure.duration <= time && adventure.cost <= budget
  }), [budget, mood, time])

  const findSurprise = () => {
    const options = matches.length > 0 ? matches : adventures.filter((adventure) =>
      (!mood || adventure.categories.includes(mood)) &&
      adventure.duration <= time,
    )
    const pick = options[Math.floor(Math.random() * options.length)]
    if (!pick) {
      notify('Try a little more time or a few more rupees — a tiny adventure will be waiting.')
      return
    }
    navigate(`/adventure/${pick.id}`)
  }

  return (
    <div className="home-page">
      <section className="welcome-strip">
        <span className="welcome-sun">☀️</span>
        <span>However today feels, you’re right on time for a little fresh air.</span>
        <span className="welcome-leaf">✳</span>
      </section>

      <section className="welcome-hero">
        <div className="hero-backdrop" />
        <div className="hero-wash" />
        <div className="hero-copy">
          <p className="hero-overline"><span /> YOUR INVITATION TO STEP OUTSIDE</p>
          <h1>Your next favorite<br />memory is <span>out there.</span></h1>
          <p className="hero-description">One little adventure can change the shape of your day. Let’s find yours.</p>
          <div className="hero-actions">
            <Link className="hero-primary" to="/plan">Find my little adventure <ArrowRight size={17} /></Link>
            <button className="hero-surprise" onClick={findSurprise}><Sparkles size={16} /> Surprise me</button>
          </div>
          <div className="hero-quote"><span>✳</span> {quote}</div>
        </div>
        <div className="hero-sticker"><span>the outside<br />is closer<br />than you think</span><Leaf size={18} /></div>
        <span className="hero-caption"><Sun size={13} /> No big plans. Just a little more world.</span>
      </section>

      <section className="quick-find" aria-labelledby="quick-find-heading">
        <div className="quick-find-intro">
          <span className="quick-find-icon"><Sparkles size={18} /></span>
          <div>
            <p className="section-kicker">A GOOD PLACE TO START</p>
            <h2 id="quick-find-heading">What would feel nice right now?</h2>
          </div>
        </div>
        <div className="mood-chips">
          {moodChoices.map((choice) => (
            <button
              key={choice.category}
              className={`mood-chip ${mood === choice.category ? 'mood-chip-active' : ''}`}
              aria-pressed={mood === choice.category}
              onClick={() => updatePreferences({ mood: mood === choice.category ? '' : choice.category })}
            >
              <span>{choice.emoji}</span>{choice.label}
            </button>
          ))}
        </div>
        <div className="quick-filters">
          <label><Clock3 size={15} /><span>I have</span>
            <select aria-label="Available time" value={time} onChange={(event) => updatePreferences({ minutes: Number(event.target.value) })}>
              <option value={10}>10 minutes</option><option value={20}>20 minutes</option><option value={30}>30 minutes</option><option value={60}>an hour</option>
            </select>
          </label>
          <span className="filter-divider" />
          <label><Wallet size={15} /><span>I’d like to spend</span>
            <select aria-label="Adventure budget" value={budget} onChange={(event) => updatePreferences({ budget: Number(event.target.value) })}>
              <option value={0}>nothing</option><option value={100}>up to ₹100</option><option value={300}>up to ₹300</option>
            </select>
          </label>
          <span className="match-count" aria-live="polite">{matches.length} lovely {matches.length === 1 ? 'idea' : 'ideas'} fit</span>
        </div>
        {mood && (
          <div className="mood-response" role="status">
            <span>🌱</span> A little {inspirationForCategory(mood)?.name.toLowerCase()} sounds just right.
            <Link to={categoryPath(mood)}>See your ideas <ArrowRight size={14} /></Link>
          </div>
        )}
      </section>

      <section className="mood-section">
        <div className="section-title-row">
          <div><p className="section-kicker">FOLLOW A LITTLE CURIOSITY</p><h2>What kind of outside are you craving?</h2></div>
          <Link className="quiet-link" to="/discover">See everything <ArrowRight size={15} /></Link>
        </div>
        <div className="mood-grid">
          {categories.map((category, index) => (
            <Link
              className={`mood-card mood-card-${category.tint}`}
              to={categoryPath(category.slug)}
              key={category.slug}
            >
              <img src={category.image} alt="" loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = adventures[0].image }} />
              <span className="mood-card-wash" />
              <span className="mood-card-content">
                <span className="mood-card-emoji">{category.emoji}</span>
                <strong>{category.name}</strong>
                <span className="mood-card-description">{category.description}</span>
                <span className="mood-card-arrow"><ArrowUpRight size={16} /></span>
              </span>
              <span className="mood-card-number">0{index + 1}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="tiny-feature">
        <div className="tiny-photo">
          <img src={currentTiny.image} alt={currentTiny.imageAlt} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = adventures[1].image }} />
          <span className="tiny-photo-label"><Sparkles size={13} /> YOUR TEN-MINUTE STORY</span>
          <button className="tiny-another" onClick={() => setTinyIndex((index) => (index + 1) % tinyAdventures.length)}><Sparkles size={14} /> Another little idea</button>
        </div>
        <div className="tiny-copy">
          <p className="section-kicker">A TINY ADVENTURE FOR TODAY</p>
          <h2>{currentTiny.title}</h2>
          <p>{currentTiny.description}</p>
          <div className="tiny-meta">
            <span><Clock3 size={15} /> {currentTiny.duration} minutes</span>
            <span><Wallet size={15} /> Completely free</span>
          </div>
          <p className="tiny-prep"><Check size={14} /> {currentTiny.preparation}</p>
          <Link className="tiny-do-it" to={`/adventure/${currentTiny.id}`}>Let’s do this <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="nearby-section">
        <div className="section-title-row">
          <div><p className="section-kicker">JUST AROUND YOUR KIND OF CORNER</p><h2>You don’t have to go far.</h2><p className="section-subtitle">Small adventures that fit into the day you already have.</p></div>
          <Link className="quiet-link" to="/discover">All adventures <ArrowRight size={15} /></Link>
        </div>
        {matches.length > 0 ? (
          <div className="adventure-grid">
            {matches.slice(0, 3).map((adventure, index) => <AdventureCard adventure={adventure} index={index} key={adventure.id} />)}
          </div>
        ) : (
          <div className="empty-state small-empty">
            <span>🌼</span><strong>A little more time or budget opens up new possibilities.</strong>
            <button onClick={() => updatePreferences({ minutes: 60, budget: 300, mood: '' })}>Give me more ideas <ArrowRight size={14} /></button>
          </div>
        )}
        <p className="sample-note"><Map size={14} /> These are general adventure ideas, not verified local listings. Choose a nearby place that feels safe and comfortable for you.</p>
      </section>
    </div>
  )
}

function DiscoveryPage() {
  const [search, setSearch] = useState('')
  const [maxTime, setMaxTime] = useState(60)
  const [maxCost, setMaxCost] = useState(300)
  const filtered = adventures.filter((adventure) =>
    adventure.duration <= maxTime &&
    adventure.cost <= maxCost &&
    `${adventure.title} ${adventure.category} ${adventure.description}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <section className="content-page">
      <PageIntro kicker="A WHOLE WORLD, ONE SMALL STEP AT A TIME" title="Find your kind of outside." description="No perfect plans needed. Follow what catches your eye." />
      <DiscoveryFilters search={search} setSearch={setSearch} maxTime={maxTime} setMaxTime={setMaxTime} maxCost={maxCost} setMaxCost={setMaxCost} />
      <ResultHeading text={`${filtered.length} little ${filtered.length === 1 ? 'adventure' : 'adventures'} to try`} />
      {filtered.length > 0 ? <div className="adventure-grid discovery-grid">{filtered.map((adventure, index) => <AdventureCard key={adventure.id} adventure={adventure} index={index} />)}</div> : <EmptyIdeas />}
      <p className="sample-note"><Map size={14} /> Sample ideas, not verified places. Nothing uses your location unless you choose to add one in the planner.</p>
      <CategoryDirectory />
    </section>
  )
}

function CategoryPage() {
  const { category: slug } = useParams()
  const category = getCategory(slug)
  const [search, setSearch] = useState('')
  const [maxTime, setMaxTime] = useState(60)
  const [maxCost, setMaxCost] = useState(300)
  const filtered = adventures.filter((adventure) =>
    Boolean(category && adventure.categories.includes(category.slug)) &&
    adventure.duration <= maxTime &&
    adventure.cost <= maxCost &&
    `${adventure.title} ${adventure.description}`.toLowerCase().includes(search.toLowerCase()),
  )

  if (!category) {
    return (
      <section className="content-page">
        <div className="empty-state page-empty"><span>🧭</span><h1>That kind of outside is still undiscovered.</h1><p>Try one of these little corners instead.</p><Link to="/discover">Browse every adventure <ArrowRight size={15} /></Link></div>
        <CategoryDirectory />
      </section>
    )
  }

  return (
    <section className="content-page">
      <Link className="back-link" to="/discover"><ArrowLeft size={15} /> All adventures</Link>
      <div className={`category-hero category-hero-${category.tint}`}>
        <img src={category.image} alt="" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = adventures[0].image }} />
        <span className="category-hero-wash" />
        <div><span className="category-emoji">{category.emoji}</span><p className="hero-overline">YOUR LITTLE CORNER OF THE WORLD</p><h1>{category.name}</h1><p>{category.description}</p></div>
      </div>
      <DiscoveryFilters search={search} setSearch={setSearch} maxTime={maxTime} setMaxTime={setMaxTime} maxCost={maxCost} setMaxCost={setMaxCost} />
      <ResultHeading text={`A few ${category.name.toLowerCase()} ideas`} />
      {filtered.length > 0 ? <div className="adventure-grid discovery-grid">{filtered.map((adventure, index) => <AdventureCard key={adventure.id} adventure={adventure} index={index} />)}</div> : <EmptyIdeas />}
      <CategoryDirectory exclude={category.slug} />
    </section>
  )
}

function DiscoveryFilters({
  search, setSearch, maxTime, setMaxTime, maxCost, setMaxCost,
}: {
  search: string
  setSearch: (value: string) => void
  maxTime: number
  setMaxTime: (value: number) => void
  maxCost: number
  setMaxCost: (value: number) => void
}) {
  return (
    <div className="discovery-controls">
      <label className="search-box"><Search size={16} /><input aria-label="Search adventures" placeholder="Find a little something…" value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}</label>
      <label className="select-filter"><Clock3 size={15} /><span>Time</span><select aria-label="Maximum duration" value={maxTime} onChange={(event) => setMaxTime(Number(event.target.value))}><option value={10}>10 min</option><option value={20}>20 min</option><option value={30}>30 min</option><option value={60}>1 hour</option></select></label>
      <label className="select-filter"><Wallet size={15} /><span>Budget</span><select aria-label="Maximum budget" value={maxCost} onChange={(event) => setMaxCost(Number(event.target.value))}><option value={0}>Free</option><option value={100}>Up to ₹100</option><option value={300}>Up to ₹300</option></select></label>
    </div>
  )
}

function ResultHeading({ text }: { text: string }) {
  return <div className="result-heading"><h2>{text}</h2><span>Choose what feels good today</span></div>
}

function EmptyIdeas() {
  return <div className="empty-state page-empty"><span>🍃</span><h2>No matches just yet.</h2><p>Try a little more time or a looser budget. Your kind of outside is still out there.</p><Link to="/discover">See all little adventures <ArrowRight size={15} /></Link></div>
}

function CategoryDirectory({ exclude }: { exclude?: string }) {
  return (
    <div className="category-directory">
      <div className="section-title-row"><div><p className="section-kicker">FOLLOW ANOTHER FEELING</p><h2>A different kind of outside?</h2></div></div>
      <div className="category-link-list">
        {categories.filter((category) => category.slug !== exclude).map((category) => <Link to={categoryPath(category.slug)} key={category.slug}><span>{category.emoji}</span>{category.name}<ArrowRight size={14} /></Link>)}
      </div>
    </div>
  )
}

function AdventureDetailPage() {
  const { id } = useParams()
  const adventure = getAdventure(id)
  const { savedIds, startedIds, completedIds, toggleSaved, startAdventure, completeAdventure, notify } = useGrounded()
  const [celebrate, setCelebrate] = useState(false)

  if (!adventure) {
    return <section className="content-page"><div className="empty-state page-empty"><span>🧭</span><h1>We haven’t found that little adventure.</h1><p>It may have wandered off. There are plenty more where it came from.</p><Link to="/discover">Back to discovering <ArrowRight size={15} /></Link></div></section>
  }

  const saved = savedIds.includes(adventure.id)
  const started = startedIds.includes(adventure.id)
  const completed = completedIds.includes(adventure.id)
  const related = adventures.filter((item) => item.id !== adventure.id && item.categories.some((slug) => adventure.categories.includes(slug))).slice(0, 3)

  const markComplete = () => {
    const newlyCompleted = completeAdventure(adventure.id)
    if (newlyCompleted) {
      setCelebrate(true)
      notify('You did it! +50 XP for making a little room for the world. 🌱')
      window.setTimeout(() => setCelebrate(false), 1800)
    } else {
      notify('This little adventure is already in your wins. Take it again anytime.')
    }
  }

  return (
    <section className="content-page detail-page">
      <Link className="back-link" to={categoryPath(adventure.categories[0])}><ArrowLeft size={15} /> More {getCategory(adventure.categories[0])?.name.toLowerCase()} ideas</Link>
      <div className="detail-hero">
        <img src={adventure.image} alt={adventure.imageAlt} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = adventures[0].image }} />
        <span className="detail-image-wash" />
        <div className="detail-hero-copy"><span className="detail-tag">{adventure.category}</span><h1>{adventure.title}</h1><p>A small, real-world idea. Make it yours, and make it as easy as you need.</p></div>
        <button className={`detail-save ${saved ? 'is-saved' : ''}`} aria-label={saved ? 'Remove from saved adventures' : 'Save this adventure'} aria-pressed={saved} onClick={() => { toggleSaved(adventure.id); notify(saved ? 'Removed from your saved adventures.' : 'Tucked away for whenever you feel ready.') }}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save for later'}</button>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <p className="detail-intro">{adventure.description}</p>
          <div className="detail-facts">
            <span><Clock3 size={17} /><strong>{adventure.duration} minutes</strong><small>Go at your own pace</small></span>
            <span><Wallet size={17} /><strong>{adventure.cost === 0 ? 'Free' : `Up to ₹${adventure.cost}`}</strong><small>Choose what works for you</small></span>
            <span><Heart size={17} /><strong>No pressure</strong><small>Turn around whenever you like</small></span>
          </div>
          <h2>Your tiny little plan</h2>
          <ol className="detail-steps">{adventure.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
          <div className="preparation-note"><Sparkles size={17} /><span><strong>Bring along</strong>{adventure.preparation}</span></div>
          <p className="sample-note detail-sample"><Map size={14} /> A general activity idea, not a verified local place or safety recommendation. Choose a route and setting that feel right for you.</p>
        </div>
        <aside className="detail-action-card">
          <span className="action-card-emoji">🌿</span><p className="section-kicker">YOUR DAY, YOUR WAY</p>
          <h2>Ready when you are.</h2><p>No sign-up. No finish line. Just you and a little more outside.</p>
          {completed ? <div className="completed-badge"><PartyPopper size={18} /> Already in your little wins · +50 XP</div> : (
            <button className="detail-primary" onClick={() => { startAdventure(adventure.id); notify('You’re all set. Step out whenever you feel ready. 🌱') }}>{started ? 'I’m on my way' : 'I’m going to do this'} <ArrowRight size={16} /></button>
          )}
          {!completed && started && <button className="detail-complete" onClick={markComplete}><Check size={15} /> I did it — celebrate with me!</button>}
          <Link className="detail-save-link" to="/saved"><Bookmark size={14} /> Your saved adventures</Link>
          <AnimatePresence>{celebrate && <motion.div className="celebration" aria-label="Adventure completed" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>✨ 🌱 🎉</motion.div>}</AnimatePresence>
        </aside>
      </div>
      {related.length > 0 && <section className="related-section"><div className="section-title-row"><div><p className="section-kicker">IF YOU LIKED THAT LITTLE FEELING</p><h2>Try another small wonder.</h2></div></div><div className="adventure-grid">{related.map((item, index) => <AdventureCard adventure={item} index={index} key={item.id} compact />)}</div></section>}
    </section>
  )
}

function PlannerPage() {
  const navigate = useNavigate()
  const { notify, preferences, updatePreferences } = useGrounded()
  const { mood, minutes, budget, location } = preferences
  const results = adventures.filter((adventure) =>
    adventure.duration <= minutes &&
    adventure.cost <= budget &&
    (!mood || adventure.categories.includes(mood)),
  )

  const surprise = () => {
    const adventure = results[Math.floor(Math.random() * results.length)]
    if (!adventure) {
      notify('Try a little more time or a few more rupees.')
      return
    }
    navigate(`/adventure/${adventure.id}`)
  }

  return (
    <section className="content-page planner-page">
      <PageIntro kicker="NO LONG QUESTIONNAIRE, PROMISE" title="Let’s find your little adventure." description="Tell us what sounds good. We’ll find a simple idea you can make your own." />
      <div className="planner-layout">
        <div className="planner-form">
          <h2>What kind of outside feels right?</h2>
          <div className="planner-moods">
            {categories.map((category) => <button className={`planner-mood ${mood === category.slug ? 'planner-mood-active' : ''}`} aria-pressed={mood === category.slug} key={category.slug} onClick={() => updatePreferences({ mood: mood === category.slug ? '' : category.slug })}><span>{category.emoji}</span>{category.name}</button>)}
            <button className={`planner-mood ${mood === '' ? 'planner-mood-active' : ''}`} aria-pressed={mood === ''} onClick={() => updatePreferences({ mood: '' })}><span>🌈</span>Surprise my mood</button>
          </div>
          <div className="planner-selects">
            <label><span><Clock3 size={15} /> How much time have you got?</span><select value={minutes} onChange={(event) => updatePreferences({ minutes: Number(event.target.value) })}><option value={10}>Just 10 minutes</option><option value={20}>About 20 minutes</option><option value={30}>Up to 30 minutes</option><option value={60}>I have an hour</option></select></label>
            <label><span><Wallet size={15} /> What feels good to spend?</span><select value={budget} onChange={(event) => updatePreferences({ budget: Number(event.target.value) })}><option value={0}>Keep it free</option><option value={100}>Up to ₹100</option><option value={300}>Up to ₹300</option></select></label>
            <label><span><Map size={15} /> Where would you like to explore? <small>(optional)</small></span><input value={location} onChange={(event) => updatePreferences({ location: event.target.value })} placeholder="A neighborhood, or leave it blank" /></label>
          </div>
          <button className="planner-submit" onClick={surprise}><Sparkles size={17} /> Find my little adventure <ArrowRight size={17} /></button>
          <p className="sample-note"><Map size={14} /> {location ? `“${location}” is saved for this plan, but suggestions are general activity ideas — not verified local results.` : 'Your location is never needed. Suggestions are general ideas you can adapt anywhere.'}</p>
        </div>
        <aside className="planner-aside"><span>🌤️</span><h2>Small is a lovely place to start.</h2><p>A few minutes outside counts. A free plan counts. Staying close to home counts.</p><div className="planner-aside-note">Your pace is the right pace. <Leaf size={15} /></div></aside>
      </div>
      <div className="planner-results"><ResultHeading text={`${results.length} little ${results.length === 1 ? 'idea' : 'ideas'} for you`} />{results.length > 0 ? <div className="adventure-grid">{results.slice(0, 3).map((adventure, index) => <AdventureCard key={adventure.id} adventure={adventure} index={index} />)}</div> : <EmptyIdeas />}</div>
    </section>
  )
}

function SavedPage() {
  const { savedIds } = useGrounded()
  const savedAdventures = adventures.filter((adventure) => savedIds.includes(adventure.id))
  return (
    <section className="content-page">
      <PageIntro kicker="A LITTLE SOMETHING FOR LATER" title="Saved for a someday." description="No hurry. Your little ideas are right here whenever you feel like stepping out." />
      {savedAdventures.length ? <div className="adventure-grid discovery-grid">{savedAdventures.map((adventure, index) => <AdventureCard adventure={adventure} index={index} key={adventure.id} />)}</div> : <div className="empty-state page-empty"><span>🧺</span><h2>Nothing tucked away just yet.</h2><p>Save an adventure for whenever you are ready. There is no rush at all.</p><Link to="/discover">Find one to keep <ArrowRight size={15} /></Link></div>}
    </section>
  )
}

function CommunityPage() {
  return (
    <section className="content-page">
      <PageIntro kicker="GOOD COMPANY, NO BIG PLANS" title="A little better together." description="Easy ways to share some outside time. Invite someone you like, or enjoy a solo wander instead." />
      <div className="community-callout"><span>💌</span><div><strong>No accounts, no awkward group chats.</strong><p>These are simple ideas you can share with a friend yourself. We don’t create events or imply anyone else has signed up.</p></div></div>
      <div className="community-grid">
        <Link to="/adventure/friendly-loop" className="community-card"><span className="community-emoji">🚶‍♀️</span><p className="section-kicker">THE EASY ONE</p><h2>A walk, and see what comes up.</h2><p>Invite one kind person. Leave the route and the conversation open.</p><span className="community-action">See this little idea <ArrowRight size={15} /></span></Link>
        <Link to="/discover/better-together" className="community-card"><span className="community-emoji">🧺</span><p className="section-kicker">BRING A LITTLE SOMETHING</p><h2>Make a tiny picnic of it.</h2><p>Something from home, a patch of green, and no occasion needed.</p><span className="community-action">Find a shared adventure <ArrowRight size={15} /></span></Link>
        <Link to="/adventure/sky-sounds" className="community-card"><span className="community-emoji">🌳</span><p className="section-kicker">OR KEEP IT QUIET</p><h2>Go outside on your own terms.</h2><p>Shared experiences are lovely. A peaceful solo moment counts just as much.</p><span className="community-action">Try a quiet reset <ArrowRight size={15} /></span></Link>
      </div>
    </section>
  )
}

function RewardsPage() {
  const { xp, completedIds, startedIds } = useGrounded()
  const completed = adventures.filter((adventure) => completedIds.includes(adventure.id))
  const started = adventures.filter((adventure) => startedIds.includes(adventure.id))
  return (
    <section className="content-page">
      <PageIntro kicker="YOUR OUTSIDE COUNTS" title="Look at you, making room." description="Little wins, collected at your pace. Every completed adventure is worth 50 XP, just once." />
      <div className="rewards-summary">
        <div className="xp-total"><span>🌱</span><p className="section-kicker">YOUR LITTLE POINTS</p><strong>{xp} <small>XP</small></strong><span>That’s {completed.length} adventures you made time for.</span></div>
        <div className="reward-next"><Sparkles size={23} /><p className="section-kicker">NEXT LITTLE MILESTONE</p><h2>{completed.length >= 5 ? 'You’re an outside regular!' : `${5 - completed.length} more ${5 - completed.length === 1 ? 'adventure' : 'adventures'} to your first badge`}</h2><div className="milestone-track"><span style={{ width: `${Math.min(completed.length / 5 * 100, 100)}%` }} /></div><small>{Math.min(completed.length, 5)} of 5 adventures · One step is still a step.</small></div>
      </div>
      <h2 className="rewards-section-heading">Little badges, honestly earned</h2>
      <div className="badge-grid">
        <div className={`badge-card ${completed.length >= 1 ? 'badge-earned' : ''}`}><span>{completed.length >= 1 ? '🌱' : '🌰'}</span><strong>First little step</strong><small>{completed.length >= 1 ? 'A new story started.' : 'Complete your first adventure.'}</small></div>
        <div className={`badge-card ${completed.length >= 3 ? 'badge-earned' : ''}`}><span>{completed.length >= 3 ? '🦋' : '🐛'}</span><strong>Outside, your way</strong><small>{completed.length >= 3 ? 'Three little adventures, lovely.' : 'Complete three little adventures.'}</small></div>
        <div className={`badge-card ${completed.length >= 5 ? 'badge-earned' : ''}`}><span>{completed.length >= 5 ? '🏕️' : '🌳'}</span><strong>A familiar fresh air</strong><small>{completed.length >= 5 ? 'Five adventures on your own terms.' : 'Complete five little adventures.'}</small></div>
      </div>
      <h2 className="rewards-section-heading">Your little stories</h2>
      {completed.length > 0 ? <div className="adventure-grid">{completed.map((adventure, index) => <AdventureCard adventure={adventure} index={index} key={adventure.id} />)}</div> : <div className="empty-state page-empty"><span>✨</span><h2>Your first little win is waiting.</h2><p>Start any adventure and mark it done whenever you are ready. No rush, no streak to keep up with.</p><Link to="/discover">Find a little adventure <ArrowRight size={15} /></Link></div>}
      {started.length > 0 && <p className="rewards-in-progress">Currently making time for: {started.map((adventure) => adventure.title).join(', ')}.</p>}
    </section>
  )
}

function PageIntro({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return <div className="page-intro"><p className="section-kicker">{kicker}</p><h1>{title}</h1><p>{description}</p></div>
}

function NotFoundPage() {
  return <section className="content-page"><div className="empty-state page-empty"><span>🧭</span><h1>This page took the scenic route.</h1><p>Nothing here just yet, but there is still a whole world to discover.</p><Link to="/">Take me back outside <ArrowRight size={15} /></Link></div><CategoryDirectory /></section>
}

export default App
