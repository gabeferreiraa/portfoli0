import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "tertiary";
};

const COLOR_TOKENS = {
  primary: {
    mid: "var(--color-primary-mid)",
    light: "var(--color-primary-light)",
    dark: "var(--color-primary-dark)",
    on: "var(--color-neutral-white)",
  },
  secondary: {
    mid: "var(--color-secondary-mid)",
    light: "var(--color-secondary-light)",
    dark: "var(--color-secondary-dark)",
    on: "var(--color-neutral-white)",
  },
  tertiary: {
    mid: "var(--color-tertiary-mid)",
    light: "var(--color-tertiary-light)",
    dark: "var(--color-tertiary-mid)",
    on: "var(--color-neutral-white)",
  },
} as const;

export function Button({
  className,
  variant = "primary",
  size = "md",
  color = "primary",
  ...props
}: ButtonProps) {
  const t = COLOR_TOKENS[color];

  return (
    <button
      style={
        {
          ["--c-mid" as any]: t.mid,
          ["--c-light" as any]: t.light,
          ["--c-dark" as any]: t.dark,
          ["--c-on" as any]: t.on,
          ["--bg" as any]: "var(--color-background)",
        } as React.CSSProperties
      }
      className={cn(
        // base
        "group relative inline-flex items-center justify-center rounded-md font-medium",
        "select-none isolate",
        "transition-[transform,box-shadow,background-color,opacity] duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-[color:var(--c-light)] focus-visible:ring-offset-[color:var(--bg)]",
        "disabled:pointer-events-none disabled:opacity-50",

        // liquid glass scaffolding
        "overflow-hidden",
        // subtle blur = glass (works best on top of your ambient glows)
        "backdrop-blur-md",
        // outer stroke + inner stroke (feels “premium”)
        "shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_12px_34px_rgba(0,0,0,0.35)]",

        // sheen highlight (top-left to bottom-right), always super subtle
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-md",
        "before:bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.10),rgba(255,255,255,0.04),rgba(255,255,255,0))]",
        "before:opacity-70",

        // moving “glass sweep” on hover
        "after:pointer-events-none after:absolute after:-inset-y-6 after:-left-1/2 after:w-[140%] after:rotate-[12deg]",
        "after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]",
        "after:opacity-0 after:translate-x-[-20%]",
        "hover:after:opacity-100 hover:after:translate-x-[20%]",
        "after:transition-all after:duration-500 after:ease-out",

        // lift on hover/press (matches your calm motion)
        "hover:translate-y-[-1px] active:translate-y-0",

        // ───────────── VARIANTS (token-driven) ─────────────
        variant === "primary" && [
          // glassy gradient using your chosen palette family
          "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--c-mid)_88%,transparent),color-mix(in_oklab,var(--c-dark)_70%,transparent))]",
          "text-[color:var(--c-on)]",
          // glow on hover (colored)
          "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_46px_rgba(0,0,0,0.45),0_0_36px_color-mix(in_oklab,var(--c-mid)_28%,transparent)]",
        ],

        variant === "secondary" && [
          // translucent glass with a tinted edge
          "bg-[color-mix(in_oklab,var(--c-mid)_14%,transparent)]",
          "text-[color:var(--c-on)]",
          "shadow-[0_0_0_1px_color-mix(in_oklab,var(--c-mid)_35%,rgba(255,255,255,0.10)),0_10px_26px_rgba(0,0,0,0.30)]",
          "hover:bg-[color-mix(in_oklab,var(--c-mid)_20%,transparent)]",
        ],

        variant === "ghost" && [
          "bg-transparent",
          // use the family color as text
          "text-[color:var(--c-light)]",
          // hover gives a faint glass pad
          "hover:bg-[color-mix(in_oklab,var(--c-mid)_12%,transparent)]",
          "shadow-none hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
          // reduce sheen intensity for ghost
          "before:opacity-40",
        ],

        // sizes
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",

        className
      )}
      {...props}
    />
  );
}
