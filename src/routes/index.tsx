import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { useScrollMotion } from "@/components/site/motion";
import { categories, events, live, stories, people, cities, whatsNext, news, upcoming, formatPrice } from "@/lib/data";
import indiaMap from "@/assets/india-map.jpg";
import secSports from "@/assets/sec-sports.jpg";
import secArts from "@/assets/sec-arts.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAC COMMUNITY — One platform. Every event. Across India." },
      { name: "description", content: "Discover sports, arts, culture, gaming, festivals and live events across India on SAC COMMUNITY." },
      { property: "og:title", content: "SAC COMMUNITY — One platform. Every event. Across India." },
      { property: "og:description", content: "Discover sports, arts, culture, gaming, festivals and live events across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Lines({ text, className = "" }: { text: string[]; className?: string }) {
  return (
    <h2 data-lines className={`font-display ${className}`}>
      {text.map((t, i) => (
        <span key={i} className="block overflow-hidden pb-[0.04em]">
          <span data-l className="block">{t}</span>
        </span>
      ))}
    </h2>
  );
}

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] ${dark ? "text-gold" : "text-muted-foreground"}`}>
      <span className="h-px w-8 bg-primary" />
      {children}
    </p>
  );
}

function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollMotion(ref);
  const featured = events.slice(0, 5);
  const lead = stories[0]!;

  return (
    <div ref={ref}>
      <Hero />

      {/* marquee strip */}
      <div className="overflow-hidden border-y bg-background py-4">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 whitespace-nowrap font-display text-2xl motion-reduce:animate-none">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Sports", "Music", "Culture", "Gaming", "Arts", "Festivals", "Across India"].map((w) => (
              <span key={w + k} className="flex items-center gap-10">
                {w} <span className="text-primary">✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* NEWS */}
      <section className="mx-auto max-w-[1480px] px-5 py-12 md:px-8 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4 border-b-2 border-foreground pb-5">
          <div>
            <Eyebrow>The latest from the scene</Eyebrow>
            <Lines text={["News"]} className="text-[10vw] md:text-[3.2vw] xl:text-[48px]" />
          </div>
          <Link to="/news" className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-primary pb-1 text-[12px] font-bold uppercase tracking-[0.16em]">
            More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {news.map((s, i) => (
            <Link key={s.slug} to="/news" data-reveal className={`group block ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={s.img} alt={s.title} width={s.w} height={s.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{s.category} · {s.date}</p>
              <h3 className="mt-1.5 text-sm font-bold leading-snug group-hover:text-primary md:text-base">{s.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT'S NEXT */}
      <section className="border-t bg-card py-12 md:py-16">
        <div className="mx-auto max-w-[1480px] px-5 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-4 border-b-2 border-foreground pb-5">
            <div>
              <Eyebrow>On the horizon</Eyebrow>
              <Lines text={["What's next"]} className="text-[10vw] md:text-[3.2vw] xl:text-[48px]" />
            </div>
            <Link to="/events" className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-primary pb-1 text-[12px] font-bold uppercase tracking-[0.16em]">
              More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
            {whatsNext.map(({ label, event, meta }, i) => (
              <Link key={event.slug} to="/event/$slug" params={{ slug: event.slug }} data-reveal className={`group block ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img src={event.img} alt={event.name} width={event.w} height={event.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-background px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]">{label}</span>
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{event.category} · {meta}</p>
                <h3 className="mt-1 font-display text-base leading-snug md:text-lg">{event.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{event.venue}, {event.city}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS (top) */}
      <section className="border-t py-12 md:py-16">
        <div className="mx-auto max-w-[1480px] px-5 md:px-8">
          <div className="mb-8 flex items-end justify-between gap-4 border-b-2 border-foreground pb-5">
            <div>
              <Eyebrow>Mark the calendar</Eyebrow>
              <Lines text={["Upcoming events"]} className="text-[10vw] md:text-[3.2vw] xl:text-[48px]" />
            </div>
            <Link to="/events" className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-primary pb-1 text-[12px] font-bold uppercase tracking-[0.16em]">
              More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
            {upcoming.map((e, i) => (
              <Link key={e.slug} to="/event/$slug" params={{ slug: e.slug }} data-reveal className={`group block ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img src={e.img} alt={e.name} width={e.w} height={e.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-background px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]">{e.category}</span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3 border-t border-foreground pt-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-base leading-snug md:text-lg">{e.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" /> {e.city} · {e.date}
                    </p>
                  </div>
                  <p className="shrink-0 font-display text-base text-primary">{formatPrice(e.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1480px] px-5 py-6 md:px-8 md:py-10">
        <div className="mb-5 grid gap-4 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Eyebrow>Six worlds. One platform.</Eyebrow>
            <Lines text={["Sports · Music · Culture", "Gaming · Arts · Festivals"]} className="text-[6vw] md:text-[2.3vw] xl:text-[34px]" />
          </div>
          <p data-reveal className="max-w-sm text-[11px] text-muted-foreground md:justify-self-end md:text-xs">
            Every scene in the country, organised in one place. Pick a world and see what's on this week — in your city or across India.
          </p>
        </div>
        <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-2 md:grid-cols-12 md:gap-2.5">
          {categories.map((c, i) => {
            const layout = [
              "col-span-2 md:col-span-5 md:row-span-2 aspect-[4/5]",
              "md:col-span-7 aspect-[4/3] md:aspect-[16/9]",
              "md:col-span-3 aspect-[3/4]",
              "md:col-span-4 aspect-[4/3] md:aspect-auto",
              "md:col-span-4 aspect-[3/4] md:aspect-[4/5]",
              "col-span-2 md:col-span-8 aspect-[16/9] md:aspect-auto",
            ][i];
            return (
              <Link key={c.name} to="/events" search={{ category: c.name }} data-reveal className={`group relative overflow-hidden bg-ink ${layout}`}>
                <img src={c.img} alt={c.name} width={c.w} height={c.h} loading="lazy" data-zoom className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-2.5 text-ink-foreground md:p-3">
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-gold">{c.count} events</p>
                    <p className="font-display text-base md:text-lg">{c.name}</p>
                    <p className="mt-0.5 hidden text-[10px] text-ink-muted md:block">{c.blurb}</p>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="border-t bg-card py-12 md:py-20">
        <div className="mx-auto max-w-[1480px] px-5 md:px-8">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow>Handpicked this month</Eyebrow>
              <Lines text={["UPCOMEING EVENTS"]} className="text-[9vw] md:text-[4.4vw] xl:text-[64px]" />
              <p data-reveal className="mt-2 text-sm text-muted-foreground md:text-base">Experiences worth showing up for.</p>
            </div>
            <Link to="/events" className="group inline-flex items-center gap-2 self-start border-b-2 border-primary pb-1 text-[12px] font-bold uppercase tracking-[0.16em] md:self-auto">
              View all events <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mx-auto grid max-w-[890px] gap-x-5 gap-y-8 md:grid-cols-12">
            {featured.map((e, i) => {
              const span = ["md:col-span-5", "md:col-span-4 md:mt-14", "md:col-span-4", "md:col-span-4 md:mt-10", "md:col-span-4 md:-mt-6"][i];
              const ratio = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[4/5]", "aspect-square", "aspect-[4/5]"][i];
              return (
                <Link key={e.slug} to="/event/$slug" params={{ slug: e.slug }} data-reveal className={`group block ${span}`}>
                  <div className={`relative overflow-hidden bg-muted ${ratio}`}>
                    <img src={e.img} alt={e.name} width={e.w} height={e.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                    <span className="absolute left-3 top-3 bg-background px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]">{e.category}</span>
                    <span className="absolute right-3 top-2 font-display text-2xl text-ink-foreground/90">0{i + 1}</span>
                  </div>
                  <div className="mt-3.5 flex items-start justify-between gap-3 border-t border-foreground pt-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg md:text-xl">{e.name}</h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" /> {e.city} · {e.date}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">From</p>
                      <p className="font-display text-lg text-primary">{formatPrice(e.price)}</p>
                    </div>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors group-hover:text-primary">
                    Get tickets <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S HAPPENING NOW */}
      <section id="now" className="grain relative overflow-hidden bg-ink text-ink-foreground">
        <div className="lg:flex lg:h-screen lg:flex-col lg:justify-center">
          <div className="mx-auto w-full max-w-[1480px] px-5 pt-24 md:px-8 lg:pt-20">
            <Eyebrow dark>Right now across India</Eyebrow>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <Lines text={["What's happening", "now"]} className="text-[13vw] md:text-[6.4vw] xl:text-[100px]" />
              <p className="max-w-xs text-sm text-ink-muted">Live scores, tonight's line-ups and the events everyone's talking about.</p>
            </div>
          </div>
          <div className="mt-10 overflow-x-auto pb-20 no-scrollbar lg:overflow-hidden lg:pb-0">
            <div data-htrack className="flex w-max snap-x snap-mandatory gap-5 px-5 md:px-8 lg:pl-[max(2rem,calc((100vw-1480px)/2+2rem))] lg:pr-[20vw]">
              {live.map(({ label, event, meta }) => (
                <Link key={label} to="/event/$slug" params={{ slug: event.slug }} className="group relative block w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:w-[30vw]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={event.img} alt={event.name} width={event.w} height={event.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    <span className={`absolute left-4 top-4 flex items-center gap-2 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] ${label === "LIVE" ? "bg-primary text-primary-foreground" : label === "TRENDING" ? "bg-gold text-ink" : "bg-ink-foreground text-ink"}`}>
                      {label === "LIVE" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" />}
                      {label}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">{event.category} · {meta}</p>
                      <p className="mt-2 font-display text-3xl">{event.name}</p>
                      <p className="mt-1 text-sm text-ink-muted">{event.venue}, {event.city}</p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link to="/events" className="flex w-[78vw] shrink-0 snap-start flex-col justify-end border border-ink-border p-6 sm:w-[46vw] lg:w-[30vw]">
                <p className="font-display text-4xl">See everything on today</p>
                <ArrowRight className="mt-4 h-8 w-8 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVER INDIA */}
      <section className="relative overflow-hidden bg-ink-soft text-ink-foreground">
        <div className="mx-auto grid max-w-[1480px] items-center gap-10 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div className="relative z-10">
            <Eyebrow dark>28 states · 700+ cities</Eyebrow>
            <Lines text={["Discover", "India"]} className="text-[20vw] md:text-[10vw] xl:text-[160px]" />
            <p data-reveal className="mt-6 max-w-md text-lg text-ink-muted">
              From Bengaluru to Kochi. Mumbai to Hyderabad. Find what's happening across the country.
            </p>
            <ul data-reveal className="mt-10 grid grid-cols-2 border-t border-ink-border sm:grid-cols-3">
              {cities.map((c) => (
                <li key={c} className="border-b border-ink-border">
                  <Link to="/events" search={{ city: c }} className="group flex items-center justify-between py-3.5 pr-4 text-sm font-semibold uppercase tracking-[0.14em] hover:text-primary">
                    {c} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/events" className="mt-10 inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
              Explore events near you <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-[560px]">
            <img src={indiaMap} alt="India illuminated by points of light representing events" width={1024} height={1152} loading="lazy" data-parallax="6" className="h-auto w-full mix-blend-screen" />
          </div>
        </div>
      </section>

      {/* LATEST STORIES */}
      <section className="mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-36">
        <div className="mb-12 flex items-end justify-between border-b-2 border-foreground pb-6">
          <Lines text={["Latest stories"]} className="text-[12vw] md:text-[6vw] xl:text-[96px]" />
          <Link to="/news" className="hidden items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] md:inline-flex">All news <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-10 md:grid-cols-12">
          <Link to="/news" data-reveal className="group md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <img src={lead.img} alt={lead.title} width={lead.w} height={lead.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{lead.category} · {lead.date}</p>
            <h3 className="mt-3 max-w-2xl font-display text-4xl md:text-6xl">{lead.title}</h3>
          </Link>
          <div className="md:col-span-5 md:border-l md:pl-10">
            {stories.slice(1).map((s) => (
              <Link key={s.slug} to="/news" data-reveal className="group grid grid-cols-[120px_1fr] gap-5 border-b py-6 first:pt-0 md:grid-cols-[150px_1fr]">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={s.img} alt={s.title} width={s.w} height={s.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{s.category} · {s.date}</p>
                  <h4 className="mt-2 text-lg font-bold leading-snug group-hover:text-primary">{s.title}</h4>
                  <ArrowRight className="mt-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
            <div data-reveal className="mt-6 bg-muted p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Announcement</p>
              <p className="mt-2 text-sm font-semibold">Hyderabad Esports Open registrations close 30 Oct. Open qualifiers begin online this weekend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPORTS */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden md:h-[88vh]">
          <img src={secSports} alt="Wrestlers in a traditional mud akhada" width={1600} height={896} loading="lazy" data-zoom className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1480px] px-5 pb-12 md:px-8 md:pb-20">
            <Eyebrow dark>Championships · Leagues · Trials</Eyebrow>
            <Lines text={["Every game.", "Every ground."]} className="text-[14vw] md:text-[8vw] xl:text-[128px]" />
          </div>
        </div>
        <div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-16 md:grid-cols-[1fr_1.4fr] md:px-8 md:py-24">
          <div data-reveal>
            <p className="max-w-sm text-ink-muted">From akhadas to astro-turf. Follow fixtures, results and registrations for competitions at every level — school, state and national.</p>
            <Link to="/sports" className="mt-8 inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
              Explore sports <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal className="border-t border-ink-border">
            <p className="py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Fixtures & results</p>
            {[
              ["Football", "Mohun Bagan", "2 – 1", "East Bengal", "FT"],
              ["Kabaddi", "Puneri Paltan", "38 – 34", "Bengal Warriors", "FT"],
              ["Hockey", "Odisha", "vs", "Punjab", "Sat 6PM"],
              ["Cricket", "Karnataka", "vs", "Mumbai", "Sun 9AM"],
            ].map(([sport, a, s, b, st]) => (
              <div key={a} className="grid grid-cols-[80px_1fr_auto_1fr_60px] items-center gap-3 border-b border-ink-border py-4 text-sm md:grid-cols-[110px_1fr_auto_1fr_80px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">{sport}</span>
                <span className="text-right font-semibold">{a}</span>
                <span className="font-display text-xl text-primary">{s}</span>
                <span className="font-semibold">{b}</span>
                <span className="text-right text-[11px] text-ink-muted">{st}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTS & CULTURE */}
      <section className="mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-36">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Arts & culture</Eyebrow>
            <Lines text={["Made by hand.", "Felt by", "heart."]} className="text-[15vw] md:text-[7vw] xl:text-[110px]" />
            <p data-reveal className="mt-6 max-w-sm text-muted-foreground">Performances, exhibitions, workshops and the artists keeping India's crafts alive. Sit in, sign up, make something.</p>
            <ul data-reveal className="mt-8 flex flex-wrap gap-2">
              {["Performances", "Festivals", "Exhibitions", "Cultural events", "Artists", "Workshops"].map((t) => (
                <li key={t} className="border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">{t}</li>
              ))}
            </ul>
            <Link to="/arts" className="mt-8 inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-[12px] font-bold uppercase tracking-[0.16em]">Explore arts <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative md:col-span-7">
            <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden bg-muted">
              <img src={secArts} alt="Potter shaping clay on a wheel" width={1024} height={1280} loading="lazy" data-parallax="8" className="absolute inset-[-10%_0] h-[120%] w-full object-cover" />
            </div>
            <div data-reveal className="absolute bottom-10 left-0 max-w-[260px] bg-background p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Workshop · Khurja</p>
              <p className="mt-2 font-display text-2xl">Clay & Wheel Weekend</p>
              <p className="mt-1 text-sm text-muted-foreground">Sat–Sun · From ₹650</p>
            </div>
          </div>
        </div>
      </section>

      {/* ATHLETES & ARTISTS */}
      <section className="border-t bg-card py-24 md:py-32">
        <div className="mx-auto max-w-[1480px] px-5 md:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>The people behind the moments</Eyebrow>
              <Lines text={["Athletes & artists"]} className="text-[12vw] md:text-[6vw] xl:text-[96px]" />
            </div>
            <Link to="/athletes" className="inline-flex items-center gap-2 self-start bg-foreground px-5 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-background md:self-auto">
              Explore community <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {people.map((p, i) => (
              <Link key={p.name} to="/athletes" data-reveal className={`group block ${i === 1 ? "md:mt-24" : ""}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name} width={p.w} height={p.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                  <span className="absolute left-4 top-4 bg-background px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">{p.type}</span>
                </div>
                <div className="mt-5 border-t border-foreground pt-4">
                  <p className="flex items-center gap-2 font-display text-3xl">{p.name} <BadgeCheck className="h-5 w-5 text-primary" /></p>
                  <p className="mt-1 text-sm font-semibold">{p.discipline}</p>
                  <p className="text-sm text-muted-foreground">{p.city}</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Next: {p.upcoming}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIZER CTA */}
      <section className="grain relative overflow-hidden bg-ink text-ink-foreground">
        <div aria-hidden className="absolute -right-[10vw] top-1/2 h-[60vw] w-[60vw] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-25" />
        <div className="relative mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-36">
          <Lines text={["Have an event?", "Put it on the map."]} className="text-[13vw] md:text-[8vw] xl:text-[132px] [&_span:last-child_span]:text-primary" />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p data-reveal className="max-w-md text-lg text-ink-muted">Publish your event, reach your audience, manage registrations and grow your community.</p>
            <div data-reveal className="flex flex-wrap gap-3">
              <Link to="/organizers" className="bg-primary px-6 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-primary-foreground">List an event</Link>
              <Link to="/organizers" className="border border-ink-border px-6 py-4 text-[12px] font-bold uppercase tracking-[0.16em] hover:border-ink-foreground">For organizers</Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-[1480px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Lines text={["Stay in the loop"]} className="text-[12vw] md:text-[5.4vw] xl:text-[84px]" />
            <p className="mt-3 text-muted-foreground">Get the latest events, stories and experiences from across India.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("input") as HTMLInputElement).value = ""; alert("You're subscribed. See you in your inbox."); }} className="flex border-b-2 border-foreground">
            <input type="email" required placeholder="Your email address" className="w-full bg-transparent py-4 text-lg outline-none placeholder:text-muted-foreground" />
            <button className="shrink-0 px-2 text-[12px] font-bold uppercase tracking-[0.16em] text-primary">Subscribe →</button>
          </form>
        </div>
      </section>
    </div>
  );
}
