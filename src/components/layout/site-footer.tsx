"use client";

import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/programs", key: "programs" },
  { href: "/certifications", key: "certifications" },
  { href: "/trainers", key: "trainers" },
  { href: "/resources", key: "resources" },
  { href: "/contact", key: "contact" },
] as const;

const MAP_EMBED =
  "https://maps.google.com/maps?q=30.0444%2C31.2357&z=15&output=embed";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-white/10 bg-[#0c2c59]/90">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="font-heading text-lg font-semibold text-white">
              {tMeta("instituteShort")}
            </p>
            <p className="text-sm leading-relaxed text-slate-300">{t("bio")}</p>
            <div className="flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-[#b98251]/40 bg-white/5 text-[#ebd190] transition hover:bg-white/10"
                aria-label="Facebook"
              >
                <ExternalLink className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-[#b98251]/40 bg-white/5 text-[#ebd190] transition hover:bg-white/10"
                aria-label="LinkedIn"
              >
                <ExternalLink className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-[#b98251]/40 bg-white/5 text-[#ebd190] transition hover:bg-white/10"
                aria-label="Twitter"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wide text-[#ebd190]">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-[#ebd190]">
              {t("contactTitle")}
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#b98251]" aria-hidden />
                <a href="tel:+2020000000" className="hover:text-white">
                  +20 2 0000 0000
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#b98251]" aria-hidden />
                <a href="mailto:info@aiaetar.edu" className="hover:text-white">
                  info@aiaetar.edu
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#b98251]" aria-hidden />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-[#ebd190]">
              {t("newsletter")}
            </h3>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              aria-label={t("newsletter")}
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletterPlaceholder")}
                className="border-[#b98251]/40 bg-white/5 text-white placeholder:text-slate-400"
              />
              <Button
                type="submit"
                className="gold-shimmer bg-gold-gradient font-semibold text-[#0c1a33]"
              >
                {t("newsletterCta")}
              </Button>
            </form>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Institute location"
                src={MAP_EMBED}
                className="aspect-video w-full min-h-[140px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {tMeta("siteName")}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
