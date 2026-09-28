import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/arts")({
  head: () => ({
    meta: [
      { title: "Arts — SAC COMMUNITY" },
      { name: "description", content: "Performances, exhibitions, gigs and workshops across India." },
      { property: "og:title", content: "Arts — SAC COMMUNITY" },
      { property: "og:description", content: "Performances, exhibitions, gigs and workshops across India." },
    ],
  }),
  component: () => <CategoryPage cat={["Arts", "Music"]} title="Arts" text="Performances, exhibitions, gigs and workshops across India." />,
});
