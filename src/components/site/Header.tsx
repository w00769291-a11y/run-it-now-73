import { Link, useRouterState } from "@tanstack/react-router";
import { Search, MapPin, User, Menu, X, Home, Compass, Ticket, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Events", to: "/events" },
  { label: "News", to: "/news" },
  { label: "Sports", to: "/sports" },
  { label: "Arts", to: "/arts" },
  { label: "Gaming", to: "/gaming" },
  { label: "Community", to: "/athletes" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !onHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,height,box-shadow,color] duration-500 ease-out",
          solid
            ? "h-14 bg-background/95 text-foreground shadow-[0_1px_0_var(--color-border)] backdrop-blur-md"
            : "h-20 bg-transparent text-ink-foreground",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1480px] items-center gap-6 px-5 md:px-8">
          <Link to="/" className="font-display text-xl tracking-wide md:text-2xl">
            SAC <span className="text-primary">COMMUNITY</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-6 text-[13px] font-semibold uppercase tracking-[0.12em] lg:flex">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} className="group relative py-1 opacity-85 transition-opacity hover:opacity-100">
                {n.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-primary transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1 md:gap-3">
            <Link to="/events" aria-label="Search" className="grid h-10 w-10 place-items-center opacity-85 hover:opacity-100">
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <button aria-label="Location" className="flex h-10 items-center gap-1.5 px-2 text-[13px] font-semibold opacity-85 hover:opacity-100">
              <MapPin className="h-[18px] w-[18px]" />
              <span className="hidden md:inline">All India</span>
            </button>
            <Link to="/login" aria-label="Login" className="hidden h-10 items-center gap-1.5 px-2 text-[13px] font-semibold opacity-85 hover:opacity-100 md:flex">
              <User className="h-[18px] w-[18px]" /> Login
            </Link>
            <Link
              to="/organizers"
              className="hidden bg-primary px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-block"
            >
              List an event
            </Link>
            <button aria-label="Menu" onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink text-ink-foreground transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-6">
          {nav.map((n, i) => (
            <Link key={n.label} to={n.to} className="font-display text-5xl" style={{ transitionDelay: `${i * 30}ms` }}>
              {n.label}
            </Link>
          ))}
          <Link to="/organizers" className="mt-8 self-start bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground">
            List an event
          </Link>
        </nav>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        {[
          { l: "Home", to: "/", I: Home },
          { l: "Explore", to: "/events", I: Compass },
          { l: "Tickets", to: "/login", I: Ticket },
          { l: "Saved", to: "/login", I: Bookmark },
          { l: "Profile", to: "/login", I: User },
        ].map(({ l, to, I }) => (
          <Link key={l} to={to} className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
            <I className="h-5 w-5" />
            {l}
          </Link>
        ))}
      </nav>
    </>
  );
}
