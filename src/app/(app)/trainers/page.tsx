"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";

const trainers = [
  {
    id: "1",
    name: "Dr. Amira Hassan",
    role: "Lead Trainer, Tourism Strategy",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    id: "2",
    name: "Prof. Karim Nabil",
    role: "Lead Trainer, Quality Systems",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    id: "3",
    name: "Ms. Dina Soliman",
    role: "Lead Trainer, Hospitality Operations",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

export default function TrainersPage() {
  const t = useTranslations("trainers");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn>
        <h1 className="font-heading mb-12 text-center text-4xl font-bold text-white">
          {t("title")}
        </h1>
      </FadeIn>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((person, i) => (
          <FadeIn key={person.id} delay={i * 0.06}>
            <article className="group relative overflow-hidden rounded-xl border border-white/10">
              <div className="relative aspect-[3/4]">
                <Image
                  src={person.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59]/85 via-transparent to-transparent opacity-90 transition group-hover:from-[#b98251]/90" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition group-hover:opacity-100">
                  <p className="font-heading text-xl font-semibold text-white">
                    {person.name}
                  </p>
                  <p className="text-sm text-white/95">{person.role}</p>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0c1a33]"
                    aria-label="LinkedIn"
                  >
                    <ExternalLink className="size-4" aria-hidden />
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="p-4 group-hover:hidden">
                <p className="font-heading font-semibold text-white">
                  {person.name}
                </p>
                <p className="text-sm text-slate-400">{person.role}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
