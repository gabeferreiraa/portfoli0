"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import Link from "next/link";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.08,
      });

      // Reveal animations
      const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      revealEls.forEach((el) => {
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

      // Subtle stagger for cards
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
        {" "}
        <div className="min-h-screen bg-background text-foreground">
          <main className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-12 px-8 py-20 md:grid-cols-[380px_1fr] md:gap-40 md:px-2 md:py-28">
            {/* Left column */}
            <aside className="flex flex-col justify-between md:-mt-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Link href="#">
                    <h1
                      className="text-5xl font-semibold tracking-tight text-neutral-white"
                      data-reveal
                    >
                      Gabriel Ferreira
                    </h1>
                  </Link>
                  <p
                    className="text-xl font-light text-neutral-white mt-4"
                    data-reveal
                  >
                    UX/UI Engineer
                  </p>
                </div>

                <p
                  className="max-w-xs font-light leading-5 text-neutral-light"
                  data-reveal
                >
                  I bring your idea to life, and opportunity keeps you growing
                  beyond delivery
                </p>
              </div>

              <div className="mt-16 flex gap-6" data-lag="0.15">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    data-speed={0.9 + i * 0.06}
                    className="h-5 w-5 rounded-[2px] bg-neutral-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                  />
                ))}
              </div>
            </aside>

            {/* Right column */}
            <section className="space-y-10 text-neutral-light text-base font-light leading-6 max-w-80 sm:max-w-2xl">
              <p data-reveal>
                I&apos;m a UI/UX engineer who is driven to deliver accessible,
                unique, and meticulous applications. I specialize in
                web-accessibility, design, development and optimization of
                applications
              </p>
              <p data-reveal>
                Currently I&apos;m based in Philadelphia, PA where I work as a
                part-time Software Developer @{" "}
                <span className="text-tertiary-mid">
                  <a href="https://www.proconex.com" target="_blank">
                    Proconex
                  </a>
                </span>
                .
              </p>
              <p data-reveal>
                Throughout my time as a developer I&apos;ve been able to develop
                software across different applications, whether it was trouble
                shooting or starting from zero, there was always an opportunity
                for success.
              </p>
              <p data-reveal>
                If you have any questions please reach out, and I&apos;ll
                respond as soon as I&apos;m available!
              </p>
              <div className="flex gap-5">
                <Button variant="primary" color="secondary">
                  Reach out
                </Button>
                <Button variant="primary" color="primary">
                  Reach out
                </Button>
                <Button variant="primary" color="tertiary">
                  Reach out
                </Button>
              </div>
              <div className="flex gap-5">
                <Button variant="secondary" color="secondary">
                  Reach out
                </Button>
                <Button variant="secondary" color="primary">
                  Reach out
                </Button>
                <Button variant="secondary" color="tertiary">
                  Reach out
                </Button>
              </div>
              <div className="flex gap-5">
                <Button variant="ghost" color="secondary">
                  Reach out
                </Button>
                <Button variant="ghost" color="primary">
                  Reach out
                </Button>
                <Button variant="ghost" color="tertiary">
                  Reach out
                </Button>
              </div>
            </section>
          </main>
        </div>
        {/* SECTION: Projects */}
        <section className="mx-auto w-full max-w-6xl px-8 md:px-2">
          <div className="min-h-[110vh] py-24 md:py-32">
            <div className="flex items-end justify-between gap-8">
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-white"
                data-reveal
              >
                Selected Work
              </h2>
              <p className="max-w-sm text-neutral-light font-light" data-reveal>
                A few fake “cards” so we can see smooth scroll + reveal
                transitions.
              </p>
            </div>

            <div
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
              data-cards
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
        {/* SECTION: About */}
        <section className="mx-auto w-full max-w-6xl px-8 md:px-2">
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
                  clean hierarchy, smooth motion, and just enough personality to
                  be memorable.
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
              >
                <p
                  className="text-sm text-neutral-light font-light"
                  data-reveal
                >
                  “Opportunity keeps you growing beyond delivery.”
                </p>

                <div className="mt-6 space-y-3">
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
        <section className="mx-auto w-full max-w-6xl px-8 pb-28 md:px-2">
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
                Placeholder call-to-action. Scroll up/down a few times to really
                feel the smoothing + the way elements “settle” into place.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Email", "LinkedIn", "GitHub", "Resume"].map((x) => (
                  <Button
                    key={x}
                    className=" hover:bg-neutral-white/10 transition"
                    variant="secondary"
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
  );
}
