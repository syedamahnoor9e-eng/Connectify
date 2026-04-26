import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Features } from "../components/home/Features";
import { CTA } from "../components/home/CTA";
import { Footer } from "../components/home/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}