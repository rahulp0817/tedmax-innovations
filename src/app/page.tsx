import HeroSection from "@/components/Landing-page/Hero-section";
import { Reviews } from "@/components/Landing-page/Reviews-students";
import CourseSection from "@/components/Landing-page/course-categories";
import CatalogSection from "@/components/Landing-page/course-catlog";
import InternshipSection from "@/components/Landing-page/internship-categories";
import FAQs from "@/components/Landing-page/FAQs";
import LandingNavbar from "@/components/Landing-page/landing-navbar";
import Promotesection from "@/components/Landing-page/promote-section";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <LandingNavbar />
      <HeroSection />
      <CourseSection />
      <InternshipSection />
      <Reviews />
      <FAQs />
      <Promotesection />
      <Footer />
      {/* <CatalogSection />
       */}
    </main>
  );
}
