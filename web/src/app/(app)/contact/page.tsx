"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/contact/contact-form";
import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, SlideIn } from "@/components/ui/motion";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.5185470882043!2d31.344891299999997!3d30.050667399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fd6b8de1643%3A0x4728673f53f26710!2sESpaces!5e0!3m2!1sen!2seg!4v1779273481753!5m2!1sen!2seg";

export default function ContactPage() {
  const t = useTranslations("contact");

  const contactDetails = [
    { Icon: Phone, href: `tel:${t("phone1")}`, value: t("phone1"), label: t("callUs") },
    { Icon: Mail,  href: `mailto:${t("email1")}`, value: t("email1"), label: t("emailUs") },
    { Icon: MapPin, href: null, value: t("addressText"), label: t("visitUs") },
    { Icon: Clock,  href: null, value: t("workingHoursText"), label: t("workingHours") },
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-14 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="section-label mb-5">{t("pageBadge")}</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>

      {/* Split layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Left: Form */}
          <SlideIn direction="left">
            <ContactForm />
          </SlideIn>

          {/* Right: Map + details */}
          <div className="flex flex-col gap-6">
            <SlideIn direction="right">
              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-[#c4854a]/20 shadow-xl">
                <iframe
                  title={t("mapPlaceholder")}
                  src={MAP_EMBED}
                  className="w-full aspect-[4/3] min-h-[280px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.08}>
              {/* Contact details */}
              <ul className="glass-panel space-y-5 rounded-2xl p-7">
                {contactDetails.map(({ Icon, href, value, label }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#c4854a]/40 bg-[#c4854a]/15 text-[#c4854a]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-[#c4854a]">
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="text-sm text-slate-200 hover:text-[#ebd190]">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-200">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  );
}
