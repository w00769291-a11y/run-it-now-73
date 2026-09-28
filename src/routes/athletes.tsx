import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { people } from "@/lib/data";

export const Route = createFileRoute("/athletes")({
  head: () => ({
    meta: [
      { title: "Community: athletes, artists & clubs — SAC COMMUNITY" },
      { name: "description", content: "Meet the athletes, artists, teams, clubs and colleges of SAC COMMUNITY." },
      { property: "og:title", content: "Athletes, artists & clubs — SAC COMMUNITY" },
      { property: "og:description", content: "The people behind India's moments." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Athletes · Artists · Clubs · Colleges" title="Community" text="The people behind the moments." />
      <div className="mx-auto max-w-[1480px] px-5 py-16 md:px-8">
        {people.map((p) => (
          <div key={p.name} className="grid items-center gap-6 border-b py-8 md:grid-cols-[200px_1fr_1fr_1fr]">
            <div className="relative aspect-[3/4] w-40 overflow-hidden bg-muted md:w-full">
              <img src={p.img} alt={p.name} width={p.w} height={p.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <p className="flex items-center gap-2 font-display text-4xl">{p.name} <BadgeCheck className="h-5 w-5 text-primary" /></p>
            <p className="font-semibold">{p.discipline}<span className="block text-sm font-normal text-muted-foreground">{p.city}</span></p>
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-primary">{p.upcoming}</p>
          </div>
        ))}
      </div>
    </>
  ),
});
