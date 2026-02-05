"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Page() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Safe matchMedia usage (client-only)
    console.log(
      "reduce motion?",
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Spotlight follows pointer
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--spotlight-x", `${x}px`);
      el.style.setProperty("--spotlight-y", `${y}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      )?.matches;

      if (reduceMotion) {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        return;
      }

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.08,
      });

      // Important for some setups: make ScrollTrigger compute against the wrapper
      ScrollTrigger.defaults({ scroller: wrapperRef.current! });

      // Reveal animations
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Card stagger
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      gsap.fromTo(
        cards,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-cards]",
            start: "top 80%",
          },
        }
      );

      // Ensure layout is measured correctly
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        smoother.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: contentRef }
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div
        id="smooth-content"
        ref={contentRef}
        className="bg-background text-foreground"
      >
        <div className="group/spotlight relative">
          {/* Spotlight layer (decorative) */}
          <div
            ref={spotlightRef}
            className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute spotlight-bg"
            aria-hidden="true"
          />

          {/* Skip link uses your existing global .skip-link */}
          <a href="#content" className="skip-link">
            Skip to Content
          </a>

          {/* ===== TOP: Brittany structure, your palette ===== */}
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
                <div>
                  <h1
                    className="text-2xl font-bold tracking-tight text-neutral-white sm:text-5xl whitespace-nowrap"
                    data-reveal
                  >
                    <Link href="/">Gabriel Ferreira</Link>
                  </h1>

                  <h2
                    className="mt-3 text-lg font-medium tracking-tight text-neutral-white sm:text-xl"
                    data-reveal
                  >
                    UX/UI Engineer
                  </h2>

                  <p
                    className="mt-4 max-w-xs leading-normal text-neutral-light"
                    data-reveal
                  >
                    I bring your idea to life, and opportunity keeps you growing
                    beyond delivery
                  </p>

                  <nav
                    className="hidden lg:block"
                    aria-label="In-page jump links"
                    data-reveal
                  >
                    <ul className="mt-16 w-max">
                      {[
                        { href: "#about", label: "About" },
                        { href: "#selected-work", label: "Projects" },
                        { href: "#lets-build", label: "Contact" },
                      ].map((x) => (
                        <li key={x.href}>
                          <a
                            className="group flex items-center py-3"
                            href={x.href}
                          >
                            <span className="mr-4 h-px w-8 bg-neutral-mid/70 transition-all group-hover:w-16 group-hover:bg-neutral-white group-focus-visible:w-16 group-focus-visible:bg-neutral-white motion-reduce:transition-none" />
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-mid group-hover:text-neutral-white group-focus-visible:text-neutral-white">
                              {x.label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="mt-10 text-neutral-mid text-sm" data-reveal>
                  {/* social icons row goes here */}
                </div>
              </header>

              <main
                id="content"
                tabIndex={-1}
                className="pt-24 lg:w-[52%] lg:py-24"
              >
                <section
                  id="about"
                  className="mb-16 scroll-mt-16 md:mb-24 lg:mb-28 lg:scroll-mt-24"
                  aria-label="About me"
                >
                  {/* Mobile sticky section label (Brittany-style) */}
                  <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-white lg:sr-only">
                      About
                    </h2>
                  </div>

                  <div className="space-y-4 text-neutral-light">
                    <p data-reveal>
                      I&apos;m a UI/UX engineer who is driven to deliver
                      accessible, unique, and meticulous applications. I
                      specialize in web-accessibility, design, development and
                      optimization of applications
                    </p>

                    <p data-reveal>
                      Currently I&apos;m based in Philadelphia, PA where I work
                      as a part-time Software Developer @{" "}
                      <a
                        className="font-medium text-neutral-white hover:text-tertiary-mid focus-visible:text-tertiary-mid"
                        href="https://www.proconexdirect.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Proconex (opens in a new tab)"
                      >
                        Proconex
                      </a>
                      .
                    </p>

                    <p data-reveal>
                      Throughout my time as a developer I&apos;ve been able to
                      develop software across different applications, whether it
                      was trouble shooting or starting from zero, there was
                      always an opportunity for success.
                    </p>

                    <p data-reveal>
                      If you have any questions please reach out, and I&apos;ll
                      respond as soon as I&apos;m available!
                    </p>
                  </div>
                </section>
              </main>
            </div>
          </div>

          {/* ===== BELOW: your original sections ===== */}
          <section
            id="selected-work"
            className="mx-auto w-full max-w-6xl px-8 md:px-2"
            aria-label="Selected work"
          >
            <div className="min-h-[110vh] py-24 md:py-32">
              <div className="flex items-end justify-between gap-8">
                <h2
                  className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-white"
                  data-reveal
                >
                  Selected Work
                </h2>
                <p
                  className="max-w-sm text-neutral-light font-light"
                  data-reveal
                >
                  A few fake “cards” so we can see smooth scroll + reveal
                  transitions.
                </p>
              </div>

              <div
                className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
                data-cards
                role="list"
                aria-label="Project cards"
              >
                {[
                  {
                    title: "Moonrise Meditation",
                    tag: "Mobile • Audio • Calm UX",
                  },
                  { title: "Out&Abt", tag: "Events • Social • Philly" },
                  {
                    title: "Enterprise UI Systems",
                    tag: "Angular • PrimeNG • Scale",
                  },
                  {
                    title: "Automation Suite",
                    tag: "Selenium • C# • Reliability",
                  },
                ].map((p) => (
                  <div
                    key={p.title}
                    data-card
                    role="listitem"
                    className="rounded-2xl border border-neutral-white/10 bg-neutral-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-medium text-neutral-white">
                        {p.title}
                      </h3>
                      <span className="text-xs rounded-full border border-neutral-white/10 bg-neutral-white/5 px-3 py-1 text-neutral-light">
                        Case Study
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-light text-neutral-light">
                      {p.tag}
                    </p>

                    <div
                      className="mt-6 h-32 overflow-hidden rounded-xl bg-neutral-white/5"
                      data-speed="0.85"
                      aria-hidden="true"
                    >
                      <div className="h-full w-full bg-gradient-to-b from-neutral-white/10 to-transparent" />
                    </div>

                    <p className="mt-4 text-sm font-light text-neutral-light">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Tempus leo eu aenean sed diam urna tempor.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="mx-auto w-full max-w-6xl px-8 md:px-2"
            aria-label="How I work"
          >
            <div className="min-h-[110vh] py-24 md:py-32">
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-white"
                data-reveal
              >
                How I Work
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_420px]">
                <div className="space-y-6 text-neutral-light font-light leading-6">
                  <p data-reveal>
                    I like building interfaces that feel quiet and intentional —
                    clean hierarchy, smooth motion, and just enough personality
                    to be memorable.
                  </p>
                  <p data-reveal>
                    This section is intentionally tall so you can feel
                    ScrollSmoother’s inertia and see the reveals as you move.
                  </p>
                  <p data-reveal>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisque faucibus ex sapien vitae pellentesque sem placerat.
                  </p>
                </div>

                <div
                  className="rounded-2xl border border-neutral-white/10 bg-neutral-white/5 p-6"
                  data-speed="0.92"
                  aria-label="Highlights"
                >
                  <p
                    className="text-sm text-neutral-light font-light"
                    data-reveal
                  >
                    “Opportunity keeps you growing beyond delivery.”
                  </p>

                  <div className="mt-6 space-y-3" aria-label="Focus areas">
                    {[
                      "Design systems",
                      "Motion & micro-interactions",
                      "Accessible UI",
                      "Performance + polish",
                    ].map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-neutral-white/10 bg-neutral-white/5 px-4 py-3 text-neutral-white/90"
                        data-reveal
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="lets-build"
            className="mx-auto w-full max-w-6xl px-8 pb-28 md:px-2"
            aria-label="Contact"
          >
            <div className="min-h-[95vh] py-24 md:py-24">
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-white"
                data-reveal
              >
                Let’s Build Something
              </h2>

              <div
                className="mt-10 rounded-2xl border border-neutral-white/10 bg-neutral-white/5 p-8"
                data-reveal
              >
                <p className="text-neutral-light font-light max-w-2xl">
                  Placeholder call-to-action. Scroll up/down a few times to
                  really feel the smoothing + the way elements “settle” into
                  place.
                </p>

                <div
                  className="mt-8 flex flex-wrap gap-3"
                  aria-label="Contact actions"
                >
                  {["Email", "LinkedIn", "GitHub", "Resume"].map((x) => (
                    <Button
                      key={x}
                      className="hover:bg-neutral-white/10 transition"
                      variant="secondary"
                      type="button"
                      aria-label={x}
                    >
                      {x}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
