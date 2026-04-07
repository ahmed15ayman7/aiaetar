"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/programs", key: "programs" },
  { href: "/certifications", key: "certifications" },
  { href: "/trainers", key: "trainers" },
  { href: "/resources", key: "resources" },
  { href: "/contact", key: "contact" },
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
        "flex gap-1",
        mobile ? "flex-col gap-2" : "items-center gap-1 md:gap-2 lg:gap-3"
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
              "rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:text-[#ebd190]",
              active ? "text-[#ebd190]" : "text-slate-200/90"
            )}
          >
            {t(key)}
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c2c59]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2"
          aria-label={tMeta("siteName")}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#b98251]/50 bg-white/5 text-xs font-bold text-[#ebd190]">
            AI
          </span>
          <span className="hidden max-w-[14rem] truncate font-heading text-sm font-semibold leading-tight text-white sm:max-w-xs sm:text-base">
            {tMeta("instituteShort")}
          </span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          <HeaderNavLinks />
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gold-shimmer bg-gold-gradient border border-[#ebd190]/40 font-semibold text-[#0c1a33] shadow-md hover:brightness-105"
            )}
          >
            {t("enroll")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "border-white/20 bg-white/5 text-white"
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-white/10 bg-[#0c2c59]/98 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-start">{tMeta("instituteShort")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                <HeaderNavLinks mobile onNavigate={() => setOpen(false)} />
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
