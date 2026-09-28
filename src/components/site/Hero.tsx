import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroSports from "@/assets/hero-sports.png";
import heroArts from "@/assets/hero-arts.png";
import heroCulture from "@/assets/hero-culture.png";

const slides = [
  { kicker: "Sports × Gaming", lines: ["Find your next", "challenge."], tag: "Where every move matters.", text: "From stadiums to gaming arenas, discover competitions, tournaments and experiences across India.", cta: "Explore sports", to: "/sports", img: heroSports, alt: "Indian sprinter in red India kit in a full running stride" },
  { kicker: "Arts × Events", lines: ["Find your next", "experience."], tag: "Where ideas become experiences.", text: "Discover performances, artists, live events and experiences happening across India.", cta: "Explore events", to: "/events", img: heroArts, alt: "Dancer mid-leap in flowing red fabric holding a microphone" },
  { kicker: "Culture × Festivals", lines: ["Experience", "India."], tag: "Discover the stories that bring India to life.", text: "Discover festivals, traditions, cultural experiences and unforgettable moments near you.", cta: "Discover culture", to: "/culture", img: heroCulture, alt: "Kathakali performer in red and gold costume" },
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const imgs = useRef<(HTMLDivElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const cur = useRef(0);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const lock = useRef(false);
  const reduced = useRef(false);
  const [idx, setIdx] = useState(0);

  const animateTo = (next: number) => {
    if (next === cur.current) return;
    const prev = cur.current;
    cur.current = next;
    setIdx(next);
    tl.current?.progress(1).kill();
    const outImg = imgs.current[prev]!;
    const inImg = imgs.current[next]!;
    const outT = texts.current[prev]!;
    const inT = texts.current[next]!;

    if (reduced.current) {
      gsap.set([outImg, outT], { autoAlpha: 0 });
      gsap.set([inImg, inT], { autoAlpha: 1, x: 0, y: 0 });
      gsap.set(inT.querySelectorAll("[data-line],[data-fade]"), { yPercent: 0, y: 0, autoAlpha: 1 });
      return;
    }

    const mobile = window.innerWidth < 768;
    const R = mobile ? window.innerWidth * 0.95 : Math.min(window.innerWidth * 0.5, 820);
    const D = window.innerHeight * (mobile ? 0.7 : 0.95);
    const o = { p: 0 };
    const n = { p: 0 };
    const placeIn = () => {
      const a = (1 - n.p) * (Math.PI / 2);
      gsap.set(inImg, { x: R * Math.sin(a), y: -D * 0.3 * (1 - Math.cos(a)), scale: 0.9 + 0.1 * n.p, autoAlpha: Math.min(1, n.p * 2.2) });
    };
    const placeOut = () => {
      const a = o.p * (Math.PI / 2);
      gsap.set(outImg, { x: -R * 0.42 * (1 - Math.cos(a)), y: D * Math.sin(a), scale: 1 - 0.1 * o.p, autoAlpha: 1 - Math.max(0, (o.p - 0.55) / 0.45) });
    };
    placeIn();

    const t = gsap.timeline();
    t.to(outT.querySelectorAll("[data-line]"), { yPercent: -110, duration: 0.45, stagger: 0.05, ease: "power3.in" }, 0)
      .to(outT.querySelectorAll("[data-fade]"), { autoAlpha: 0, y: -14, duration: 0.35, stagger: 0.03, ease: "power2.in" }, 0)
      .set(outT, { autoAlpha: 0 }, 0.6)
      .to(o, { p: 1, duration: 1.1, ease: "power2.inOut", onUpdate: placeOut }, 0.1)
      .to(n, { p: 1, duration: 1.25, ease: "power3.out", onUpdate: placeIn }, 0.38)
      .set(inT, { autoAlpha: 1 }, 0.6)
      .fromTo(inT.querySelectorAll("[data-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.85, stagger: 0.08, ease: "power4.out" }, 0.72)
      .fromTo(inT.querySelectorAll("[data-fade]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" }, 0.95);
    tl.current = t;
  };

  const go = (dir: number) => {
    const next = (cur.current + dir + slides.length) % slides.length;
    const s = st.current;
    if (s) {
      lock.current = true;
      const y = s.start + ((next + 0.5) / slides.length) * (s.end - s.start);
      window.scrollTo({ top: y, behavior: "smooth" });
      window.setTimeout(() => (lock.current = false), 1100);
    }
    animateTo(next);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      imgs.current.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, x: 0, y: 0 }));
      texts.current.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
      if (!reduced.current) {
        // intro
        gsap.from(texts.current[0]!.querySelectorAll("[data-line]"), { yPercent: 110, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.15 });
        gsap.from(texts.current[0]!.querySelectorAll("[data-fade]"), { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.06, delay: 0.45 });
        gsap.from(imgs.current[0]!, { x: 160, y: -60, autoAlpha: 0, duration: 1.3, ease: "power3.out" });
        st.current = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (lock.current) return;
            const i = Math.min(slides.length - 1, Math.floor(self.progress * slides.length * 0.9999));
            if (i !== cur.current) animateTo(i);
          },
        });
      }
    }, root);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section ref={root} className="grain relative h-[100svh] min-h-[620px] overflow-hidden bg-hero text-ink-foreground">
        {/* ambient */}
        <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[12%] h-[70vmin] w-[70vmin] rounded-full border border-ink-border md:right-[4%]" />
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-[22%] h-2 w-2 rounded-full bg-gold shadow-[0_0_24px_var(--color-gold)] md:right-[34%]" />
        <p aria-hidden className="pointer-events-none absolute -bottom-[4vw] left-[-1vw] select-none font-display text-[34vw] leading-none text-ink-foreground/[0.035]">
          0{idx + 1}
        </p>

        {/* images */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.kicker}
              ref={(el) => {
                imgs.current[i] = el;
              }}
              className="absolute bottom-0 right-[-14%] h-[54svh] will-change-transform sm:right-[-4%] md:right-[2%] md:h-[88svh] lg:right-[6%]"
              style={{ visibility: i === 0 ? "visible" : "hidden" }}
            >
              <img
                src={s.img}
                alt={s.alt}
                width={896}
                height={1152}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="h-full w-auto max-w-none object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
            </div>
          ))}
        </div>

        {/* text */}
        <div className="relative mx-auto flex h-full max-w-[1480px] flex-col px-5 pt-24 md:px-8 md:pt-32">
          <div className="relative min-h-[360px] sm:min-h-[390px] md:min-h-[410px] xl:min-h-[440px]">
            {slides.map((s, i) => (
              <div
                key={s.kicker}
                ref={(el) => {
                  texts.current[i] = el;
                }}
                className="absolute inset-x-0 top-0 max-w-[860px]"
                style={{ visibility: i === 0 ? "visible" : "hidden" }}
                aria-hidden={i !== idx}
              >
                <p data-fade className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                  <span className="h-px w-8 bg-primary" /> {s.kicker}
                </p>
                <h1 className="font-display text-[15vw] sm:text-[12vw] md:text-[6.6vw] xl:text-[108px]">
                  {s.lines.map((l, j) => (
                    <span key={l} className="block overflow-hidden pb-[0.04em]">
                      <span data-line className={`block ${j === s.lines.length - 1 ? "text-primary" : ""}`}>{l}</span>
                    </span>
                  ))}
                </h1>
                <p data-fade className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-ink-foreground/80">
                  “{s.tag}”
                </p>
                <p data-fade className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-ink-muted md:text-base">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          {/* controls */}
          <div className="relative z-10 -mt-16 flex items-center gap-3 md:-mt-12">
            <button onClick={() => go(-1)} aria-label="Previous slide" className="grid h-10 w-10 place-items-center border border-ink-border bg-ink-foreground/5 transition-colors hover:border-primary hover:bg-primary">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <p className="px-1 font-display text-xl tabular-nums text-ink-foreground">
              0{idx + 1} <span className="text-ink-muted">/ 03</span>
            </p>
            <button onClick={() => go(1)} aria-label="Next slide" className="grid h-10 w-10 place-items-center border border-ink-border bg-ink-foreground/5 transition-colors hover:border-primary hover:bg-primary">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* fixed CTAs */}
          <div className="relative z-10 mt-5 flex flex-wrap items-center gap-3">
            <Link to="/events" className="group inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
              Explore events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#now" className="group inline-flex items-center gap-3 border border-ink-border px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:border-primary">
              What's happening now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>


        </div>
      </section>
    </>
  );
}
