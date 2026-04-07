"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/ui/fade-in";

const MAP_EMBED =
  "https://maps.google.com/maps?q=30.0444%2C31.2357&z=15&output=embed";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn>
        <h1 className="font-heading mb-10 text-center text-4xl font-bold text-white">
          {t("title")}
        </h1>
      </FadeIn>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <FadeIn>
          <ContactForm />
        </FadeIn>
        <div className="flex min-h-0 flex-col gap-6">
          <FadeIn delay={0.05}>
            <div className="glass-panel overflow-hidden rounded-2xl">
              <iframe
                title="Location"
                src={MAP_EMBED}
                className="aspect-[4/3] w-full min-h-[280px] lg:min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="glass-panel space-y-4 rounded-2xl p-6 text-slate-200">
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 size-5 shrink-0 text-[#b98251]"
                  aria-hidden
                />
                <a href="tel:+2020000000" className="hover:text-white">
                  +20 2 0000 0000
                </a>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="mt-0.5 size-5 shrink-0 text-[#b98251]"
                  aria-hidden
                />
                <a href="mailto:info@aiaetar.edu" className="hover:text-white">
                  info@aiaetar.edu
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-[#b98251]"
                  aria-hidden
                />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
