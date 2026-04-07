"use client";

import { ExternalLink, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "/",               key: "home" },
  { href: "/about",          key: "about" },
  { href: "/programs",       key: "programs" },
  { href: "/certifications", key: "certifications" },
  { href: "/trainers",       key: "trainers" },
  { href: "/resources",      key: "resources" },
  { href: "/contact",        key: "contact" },
] as const;

const MAP_EMBED =
  "https://maps.google.com/maps?q=30.0444%2C31.2357&z=15&output=embed";

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter",  href: "https://twitter.com" },
] as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const tContact = useTranslations("contact");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative border-t border-[#c4854a]/20 bg-[#0a2248]">
      {/* Top gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c4854a]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 – Bio */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3" aria-label={tMeta("siteName")}>
              <Image src="/logo.png" alt="" width={48} height={48} className="rounded-full" style={{ width: 48, height: 48 }} />
              <span className="font-heading text-sm font-bold text-[#ebd190] leading-tight">
                {tMeta("instituteShort")}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">{t("bio")}</p>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {t("followUs")}
              </p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-[#c4854a]/30 bg-white/5 text-[#c4854a] transition hover:border-[#c4854a]/70 hover:bg-[#c4854a]/10 hover:text-[#ebd190]"
                    aria-label={s.label}
                  >
                    <ExternalLink className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h3 className="font-heading mb-5 text-sm font-bold uppercase tracking-widest text-[#ebd190]">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-[#ebd190]"
                  >
                    <span className="size-1 rounded-full bg-[#c4854a]" aria-hidden />
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Contact */}
          <div className="space-y-5">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#ebd190]">
              {t("contactTitle")}
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#c4854a]" aria-hidden />
                <a href={`tel:${tContact("phone1")}`} className="hover:text-[#ebd190]">
                  {tContact("phone1")}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#c4854a]" aria-hidden />
                <a href={`mailto:${tContact("email1")}`} className="hover:text-[#ebd190] break-all">
                  {tContact("email1")}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#c4854a]" aria-hidden />
                <span>{tContact("addressText")}</span>
              </li>
            </ul>
          </div>

          {/* Col 4 – Newsletter + Map */}
          <div className="space-y-5">
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#ebd190]">
              {t("newsletter")}
            </h3>
            <p className="text-xs leading-relaxed text-slate-500">{t("newsletterDesc")}</p>
            {submitted ? (
              <p className="rounded-lg border border-[#c4854a]/30 bg-[#c4854a]/10 px-4 py-3 text-sm text-[#ebd190]">
                ✓ {t("newsletterCta")}
              </p>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  className="border-[#c4854a]/30 bg-white/5 text-white placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className={cn(
                    buttonVariants({ size: "icon" }),
                    "gold-shimmer shrink-0 bg-gold-gradient text-[#0c1a33]"
                  )}
                  aria-label={t("newsletterCta")}
                >
                  <Send className="size-4" />
                </button>
              </form>
            )}

            <div className="overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Institute location"
                src={MAP_EMBED}
                className="aspect-video w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {tMeta("siteName")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
