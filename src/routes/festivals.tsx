import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/festivals")({
  head: () => ({
    meta: [
      { title: "Festivals — SAC COMMUNITY" },
      { name: "description", content: "From Holi to Hornbill — India's biggest celebrations in one place." },
      { property: "og:title", content: "Festivals — SAC COMMUNITY" },
      { property: "og:description", content: "From Holi to Hornbill — India's biggest celebrations in one place." },
    ],
  }),
  component: () => <CategoryPage cat={["Festivals", "Culture"]} title="Festivals" text="From Holi to Hornbill — India's biggest celebrations in one place." />,
});
