import HeroSection from "@/components/Landing-page/Hero-section";
import { Reviews } from "@/components/Landing-page/Reviews-students";
import CourseSection from "@/components/Landing-page/course-categories";
import InternshipSection from "@/components/Landing-page/internship-categories";
import FAQs from "@/components/Landing-page/FAQs";
import LandingNavbar from "@/components/Landing-page/landing-navbar";
import Promotesection from "@/components/Landing-page/promote-section";
import Footer from "@/components/Footer";
import Brands from "@/components/Landing-page/brands";
import Mentors from "@/components/Landing-page/mentors";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <LandingNavbar />
      <HeroSection />
      <Brands />
      <CourseSection />
      <InternshipSection />
      <Mentors />
      <Reviews />
      <FAQs />
      <Promotesection />
      <Footer />
    </main>
  );
}
