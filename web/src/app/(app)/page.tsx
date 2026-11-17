import { AccreditationsBar } from "@/components/home/accreditations-bar";
import { FeaturedPrograms } from "@/components/home/featured-programs";
import { Hero } from "@/components/home/hero";
import { LatestNews } from "@/components/home/latest-news";
import { Testimonials } from "@/components/home/testimonials";
import { WhyUs } from "@/components/home/why-us";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <FeaturedPrograms />
      <AccreditationsBar />
      <Testimonials />
      <LatestNews />
    </>
  );
}
