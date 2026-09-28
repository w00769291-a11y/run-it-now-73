<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site chrome (Header, Footer, Hero, motion hooks) lives in src/components/site; mock content in src/lib/data.ts — single source until a backend exists.
- Scroll motion uses GSAP + ScrollTrigger via gsap.matchMedia with reduced-motion guards — keeps animations performant and accessible.
