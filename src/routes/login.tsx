import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — SAC COMMUNITY" },
      { name: "description", content: "Log in to see your tickets, bookings and saved events." },
      { property: "og:title", content: "Log in — SAC COMMUNITY" },
      { property: "og:description", content: "Your tickets, bookings and saved events." },
    ],
  }),
  component: () => (
    <div className="grid min-h-[100svh] place-items-center bg-ink px-5 pt-20 text-ink-foreground">
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md bg-background p-8 text-foreground">
        <h1 className="font-display text-5xl">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Tickets, bookings and saved events — all in one place.</p>
        <input type="email" placeholder="Email" className="mt-8 w-full border-b-2 border-foreground bg-transparent py-3 outline-none" />
        <input type="password" placeholder="Password" className="mt-4 w-full border-b-2 border-foreground bg-transparent py-3 outline-none" />
        <button className="mt-8 w-full bg-primary py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-primary-foreground">Log in</button>
        <p className="mt-4 text-center text-xs text-muted-foreground">Accounts are coming soon.</p>
      </form>
    </div>
  ),
});
