"use client";

import { BookOpen, ExternalLink, Globe2, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const trainers = [
  {
    id: "1",
    name: "Dr. Amira Hassan",
    role: "Lead Trainer, Tourism Strategy",
    bio: "Former advisor to the Egyptian Ministry of Tourism. PhD from Lausanne, 18 years in applied hospitality research.",
    specialties: ["Destination Marketing", "Sustainable Tourism", "Research Methods"],
    rating: 4.9,
    courses: 7,
    countries: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    id: "2",
    name: "Prof. Karim Nabil",
    role: "Lead Trainer, Quality Systems",
    bio: "ISO certified lead auditor, published in 3 international journals. Pioneered QMS curricula for MENA hospitality groups.",
    specialties: ["ISO 9001", "Quality Auditing", "Process Design"],
    rating: 4.8,
    courses: 5,
    countries: 8,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    id: "3",
    name: "Ms. Dina Soliman",
    role: "Lead Trainer, Hospitality Operations",
    bio: "Ex-General Manager at a leading Cairo property. Designed F&B and front-office excellence programmes for 12 brands.",
    specialties: ["Front Office", "Service Design", "F&B Operations"],
    rating: 4.9,
    courses: 6,
    countries: 4,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    id: "4",
    name: "Mr. Hany Farid",
    role: "Lead Trainer, Administrative Leadership",
    bio: "MBA from AUC. 20 years in corporate training and executive coaching across the tourism and public sectors.",
    specialties: ["Leadership", "HR Development", "Corporate Training"],
    rating: 4.7,
    courses: 9,
    countries: 6,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    id: "5",
    name: "Dr. Layla Kamal",
    role: "Lead Trainer, Research & Analytics",
    bio: "Statistician and researcher with a focus on data-driven decisions in hospitality. Oxford DPhil.",
    specialties: ["Data Analysis", "Survey Design", "Academic Writing"],
    rating: 4.8,
    courses: 4,
    countries: 7,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
  },
  {
    id: "6",
    name: "Mr. Tarek Mansour",
    role: "Lead Trainer, Digital Tourism",
    bio: "Digital marketing expert specialised in OTA strategy, revenue management, and travel tech platforms.",
    specialties: ["Revenue Management", "OTA Strategy", "Digital Marketing"],
    rating: 4.6,
    courses: 5,
    countries: 3,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

export default function TrainersPage() {
  const t = useTranslations("trainers");

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-14 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="section-label mb-5">Expert Faculty</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
            Our trainers are senior industry practitioners with international credentials —
            not just academics. Every course is delivered by someone who has lived it.
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((person) => (
            <StaggerItem key={person.id}>
              <article className="glass-card group flex h-full flex-col overflow-hidden">
                {/* Photo section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={person.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59] via-[#0c2c59]/20 to-transparent" />

                  {/* Rating badge */}
                  <div className="absolute end-3 top-3 flex items-center gap-1 rounded-full border border-[#c4854a]/60 bg-[#0c2c59]/80 px-2.5 py-1 text-[11px] font-bold text-[#ebd190] backdrop-blur-sm">
                    <Star className="size-3 fill-[#ebd190] text-[#ebd190]" aria-hidden />
                    {person.rating}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end gap-3 bg-gradient-to-t from-[#9a6c3a]/90 to-transparent p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <p className="text-sm text-white/90 leading-relaxed">{person.bio}</p>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-white"
                      aria-label="LinkedIn"
                    >
                      <ExternalLink className="size-3.5" />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-white">{person.name}</h2>
                    <p className="text-sm text-[#c4854a]">{person.role}</p>
                  </div>

                  {/* Stats row */}
                  <div className="flex gap-4 border-y border-white/10 py-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="size-3.5 text-[#c4854a]" aria-hidden />
                      {person.courses} courses
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe2 className="size-3.5 text-[#c4854a]" aria-hidden />
                      {person.countries} countries
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5">
                    {person.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[#c4854a]/25 bg-[#c4854a]/10 px-2 py-0.5 text-[10px] font-semibold text-[#ebd190]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
