"use client";

import { CheckCircle2, Eye, Globe2, Heart, Target } from "lucide-react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const team = [
  {
    id: "1",
    name: "Dr. Amira Hassan",
    role: "Academic Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "15 years in tourism education; PhD in Hospitality Management.",
  },
  {
    id: "2",
    name: "Prof. Karim Nabil",
    role: "Research Lead",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Published researcher in quality management and applied learning.",
  },
  {
    id: "3",
    name: "Ms. Dina Soliman",
    role: "Programs Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Designed curricula adopted by three international hotel groups.",
  },
  {
    id: "4",
    name: "Mr. Hany Farid",
    role: "Industry Partnerships",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Built partnerships with 30+ organisations across the MENA region.",
  },
];

const values = [
  { icon: CheckCircle2, label: "Excellence" },
  { icon: Globe2,       label: "Global Outlook" },
  { icon: Heart,        label: "Integrity" },
  { icon: Target,       label: "Impact" },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="space-y-24 py-16">

      {/* ── Hero banner ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="section-label mb-6">Who We Are</span>
          <h1 className="font-heading mt-6 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-6 max-w-xs" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Since 2012 the American Institute has been shaping professionals who lead with knowledge,
            practice, and integrity across the tourism and administrative sectors.
          </p>
        </FadeIn>
      </div>

      {/* ── Vision / Mission / Values ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Vision */}
          <SlideIn direction="left">
            <section className="glass-card flex h-full flex-col p-8">
              <Eye className="mb-5 size-10 text-[#ebd190]" aria-hidden />
              <h2 className="font-heading mb-3 text-xl font-bold text-white">{t("vision")}</h2>
              <div className="gold-line mb-4 w-12" />
              <p className="text-sm leading-relaxed text-slate-300">{t("visionText")}</p>
            </section>
          </SlideIn>

          {/* Mission */}
          <FadeIn delay={0.1}>
            <section className="glass-card flex h-full flex-col p-8">
              <Target className="mb-5 size-10 text-[#ebd190]" aria-hidden />
              <h2 className="font-heading mb-3 text-xl font-bold text-white">{t("mission")}</h2>
              <div className="gold-line mb-4 w-12" />
              <p className="text-sm leading-relaxed text-slate-300">{t("missionText")}</p>
            </section>
          </FadeIn>

          {/* Values */}
          <SlideIn direction="right" delay={0.05}>
            <section className="glass-card flex h-full flex-col p-8">
              <Heart className="mb-5 size-10 text-[#ebd190]" aria-hidden />
              <h2 className="font-heading mb-3 text-xl font-bold text-white">{t("values")}</h2>
              <div className="gold-line mb-4 w-12" />
              <p className="mb-5 text-sm leading-relaxed text-slate-300">{t("valuesText")}</p>
              <div className="mt-auto grid grid-cols-2 gap-2">
                {values.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 rounded-lg border border-[#c4854a]/25 bg-[#c4854a]/10 px-3 py-2 text-xs font-semibold text-[#ebd190]"
                  >
                    <Icon className="size-3.5 shrink-0" aria-hidden />
                    {label}
                  </span>
                ))}
              </div>
            </section>
          </SlideIn>
        </div>
      </div>

      {/* ── Story strip ── */}
      <div className="border-y border-[#c4854a]/15 bg-[#0c2c59]/60 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <SlideIn direction="left">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80"
                alt=""
                width={700}
                height={480}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c2c59]/60 to-transparent" />
            </div>
          </SlideIn>
          <SlideIn direction="right">
            <span className="section-label mb-6">Our Story</span>
            <h2 className="font-heading mt-5 text-3xl font-bold text-white sm:text-4xl">
              Building Leaders Since 2012
            </h2>
            <GoldDivider className="my-6 max-w-xs" />
            <p className="mb-4 text-sm leading-loose text-slate-300">
              What began as a single applied-training cohort of 32 professionals in Cairo has grown
              into a regionally recognised institute serving graduates across 18 countries. Our
              partnership-first model means that every programme is co-designed with industry to
              guarantee direct workplace relevance.
            </p>
            <p className="text-sm leading-loose text-slate-400">
              Accredited by the Egyptian Organization for Standardization, ISO 9001, and the
              National Quality Institute, our quality management system ensures that every course
              meets the highest international benchmarks.
            </p>
          </SlideIn>
        </div>
      </div>

      {/* ── Team ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="section-label mb-4">The People</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("teamTitle")}
          </h2>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <StaggerItem key={member.id}>
              <article className="group relative overflow-hidden rounded-2xl border border-white/10">
                {/* Photo */}
                <div className="relative aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59] via-[#0c2c59]/20 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-[#9a6c3a]/90 to-transparent p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <p className="font-heading text-lg font-bold text-white">{member.name}</p>
                    <p className="text-sm text-white/90">{member.role}</p>
                    <p className="text-xs text-white/70">{member.bio}</p>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-white"
                      aria-label="LinkedIn"
                    >
                      <ExternalLink className="size-3.5" />
                      LinkedIn
                    </a>
                  </div>
                </div>
                {/* Card footer */}
                <div className="p-4">
                  <p className="font-heading font-bold text-white">{member.name}</p>
                  <p className="text-sm text-[#c4854a]">{member.role}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
