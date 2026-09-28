import { Link, useNavigate } from "@tanstack/react-router";
import { Search, MapPin, Building2, CalendarDays } from "lucide-react";
import { useState } from "react";
import { cities } from "@/lib/data";

export function SearchBar() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  return (
    <div className="max-w-[1100px] text-foreground">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/events", search: { q: q || undefined, city: city || undefined } });
        }}
        className="grid grid-cols-2 bg-background shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] md:grid-cols-[1.8fr_1fr_1fr_1fr_auto]"
      >
        <label className="col-span-2 flex items-center gap-3 border-b px-4 py-4 md:col-span-1 md:border-b-0 md:border-r">
          <Search className="h-4 w-4 shrink-0 text-primary" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events, artists, sports..." className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground" />
        </label>
        <div className="flex items-center gap-2 border-b border-r px-4 py-4 text-sm font-semibold md:border-b-0">
          <MapPin className="h-4 w-4 text-muted-foreground" /> All India
        </div>
        <label className="flex items-center gap-2 border-b px-4 py-4 md:border-b-0 md:border-r">
          <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent text-sm font-semibold outline-none">
            <option value="">Select city</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="col-span-2 flex items-center gap-2 px-4 py-4 md:col-span-1 md:border-r">
          <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input type="date" aria-label="Date" className="w-full bg-transparent text-sm font-semibold outline-none" />
        </label>
        <button type="submit" className="col-span-2 bg-primary px-6 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-primary-foreground md:col-span-1">
          Search
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link to="/events" className="bg-ink-foreground px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">Explore events</Link>
        <a href="#now" className="border border-ink-border px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-foreground">
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary align-middle" />What's happening now
        </a>
      </div>
    </div>
  );
}
