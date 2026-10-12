# Grounded

Grounded is a small-step adventure discovery app: find an outdoor idea that fits
your mood, available time, and budget, then save it or make it your next story.
The sample adventures are general activity ideas, not verified local listings.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` to lint the
frontend.

## Pages

- `/` — welcoming home, mood picker, quick filters, and a rotating tiny adventure
- `/discover` — searchable adventures with time and budget filters
- `/discover/:category` — shareable pages for the seven exploration moods
- `/adventure/:id` — activity details, save, start, and completion actions
- `/plan` — a quick personalized adventure finder
- `/saved` — locally saved adventures
- `/community` — low-pressure ideas to share with someone
- `/rewards` — completed adventures, XP, and earned badges

Saved adventures, planning preferences, started activities, and completions are
stored in this browser. Each completed adventure awards 50 XP once.
