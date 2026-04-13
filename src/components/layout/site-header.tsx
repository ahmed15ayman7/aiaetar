"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navKeys = [
  { href: "/",               key: "home" },
  { href: "/about",          key: "about" },
  { href: "/programs",       key: "programs" },
  { href: "/certifications", key: "certifications" },
  { href: "/trainers",       key: "trainers" },
  { href: "/resources",      key: "resources" },
  { href: "/verify",         key: "verify" },
  { href: "/gallery",        key: "gallery" },
  { href: "/contact",        key: "contact" },
] as const;

function HeaderNavLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex",
        mobile ? "flex-col gap-1" : "items-center gap-0.5"
      )}
      aria-label="Main"
    >
      {navKeys.map(({ href, key }) => {
        const active = pathname === href;
        return (
          <Link
            key={key}
            href={href}
            onClick={() => onNavigate?.()}
            className={cn(
              "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:text-[#ebd190]",
              active ? "text-[#ebd190]" : "text-slate-300/90"
            )}
          >
            {t(key)}
            {active && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-[#c4854a]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-[#c4854a]/25 bg-[#0c2c59]/90 shadow-[0_4px_30px_rgb(0_0_0_/_0.3)] backdrop-blur-2xl"
          : "border-b border-white/5 bg-[#0c2c59]/60 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-3"
          aria-label={tMeta("siteName")}
        >
          <motion.div
            whileHover={reduce ? {} : { rotate: [0, -5, 5, 0], scale: 1.04 }}
            transition={{ duration: 0.5 }}
            className="relative size-11 shrink-0 animate-gold-pulse rounded-full"
          >
            <Image
              src="/logo.png"
              alt="AI AETAR logo"
              fill
              sizes="44px"
              className="rounded-full object-cover"
            />
          </motion.div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-heading text-sm font-bold bg-gold-gradient-reverse text-transparent bg-clip-text">
              AIA ETAR – QMS – IMS
            </span>
            <span className="max-w-[210px] truncate text-[10px] font-normal text-slate-400">
              {tMeta("siteName")}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 lg:flex">
          <HeaderNavLinks />
          <div className="ms-2 flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "default" }),
                "gold-shimmer bg-gold-gradient border border-[#ebd190]/30 font-semibold text-[#0c1a33] shadow-lg"
              )}
            >
              {t("enroll")}
            </Link>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "border border-[#c4854a]/30 bg-white/5 text-white"
              )}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-[#c4854a]/20 bg-[#0c2c59] text-white"
            >
              <SheetHeader className="border-b border-white/10 pb-4">
                <SheetTitle className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <span className="font-heading text-sm text-[#ebd190]">
                    AI AETAR
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-4">
                <HeaderNavLinks mobile onNavigate={() => setOpen(false)} />
                <div className="pt-2">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "gold-shimmer bg-gold-gradient w-full font-semibold text-[#0c1a33]"
                    )}
                  >
                    {t("enroll")}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
