"use client";

import { Eye, Heart, Target } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";

const team = [
  {
    id: "1",
    name: "Dr. Amira Hassan",
    role: "Academic Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    id: "2",
    name: "Prof. Karim Nabil",
    role: "Research Lead",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    id: "3",
    name: "Ms. Dina Soliman",
    role: "Programs Lead",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    id: "4",
    name: "Mr. Hany Farid",
    role: "Industry Partnerships",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn>
        <h1 className="font-heading mb-12 text-center text-4xl font-bold text-white">
          {t("title")}
        </h1>
      </FadeIn>

      <div className="grid gap-8 md:grid-cols-3">
        <FadeIn>
          <section className="glass-card h-full p-6">
            <Eye className="mb-4 size-10 text-[#ebd190]" aria-hidden />
            <h2 className="font-heading mb-3 text-xl font-semibold text-white">
              {t("vision")}
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {t("visionText")}
            </p>
          </section>
        </FadeIn>
        <FadeIn delay={0.05}>
          <section className="glass-card h-full p-6">
            <Target className="mb-4 size-10 text-[#ebd190]" aria-hidden />
            <h2 className="font-heading mb-3 text-xl font-semibold text-white">
              {t("mission")}
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {t("missionText")}
            </p>
          </section>
        </FadeIn>
        <FadeIn delay={0.1}>
          <section className="glass-card h-full p-6">
            <Heart className="mb-4 size-10 text-[#ebd190]" aria-hidden />
            <h2 className="font-heading mb-3 text-xl font-semibold text-white">
              {t("values")}
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {t("valuesText")}
            </p>
          </section>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <h2 className="font-heading mb-8 mt-16 text-center text-3xl font-bold text-white">
          {t("teamTitle")}
        </h2>
      </FadeIn>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <FadeIn key={member.id} delay={i * 0.05}>
            <article className="group relative overflow-hidden rounded-xl border border-white/10">
              <div className="relative aspect-[3/4]">
                <Image
                  src={member.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59]/80 via-transparent to-transparent opacity-80 transition group-hover:from-[#b98251]/90" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition group-hover:opacity-100">
                  <p className="font-heading text-lg font-semibold text-white">
                    {member.name}
                  </p>
                  <p className="text-sm text-white/90">{member.role}</p>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-medium text-[#0c1a33]"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="p-4 group-hover:hidden">
                <p className="font-heading font-semibold text-white">
                  {member.name}
                </p>
                <p className="text-sm text-slate-400">{member.role}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
