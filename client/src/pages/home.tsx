import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Waves, Building2, Users, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/coastal_amphibious_housing_hero.png";
import aboutImage from "@assets/generated_images/about_section_amphibious_house.png";
import ficsAward from "@assets/generated_images/fics_24_award_ceremony.png";
import hultAward from "@assets/generated_images/hult_prize_runner_up.png";
import sdg9 from "@assets/sdg9-en_1763798707207.png";
import sdg11 from "@assets/E-Goal-11-1024x1024_1763798715992.png";
import sdg13 from "@assets/sdg13_1763798707208.png";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2" data-testid="nav-brand">
              <Waves className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Marine Refuge
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-about"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("what-we-do")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-what-we-do"
              >
                What We Do
              </button>
              <Link href="/learn-more" className="text-foreground hover:text-primary transition-colors font-medium" data-testid="nav-learn-more">
                Learn More
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
            Protecting Communities Through Innovative Amphibious Housing
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
            Climate-resilient solutions for coastal communities facing rising
            sea levels and flooding
          </p>
          <Button
            onClick={() => scrollToSection("about")}
            size="lg"
            className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20"
            data-testid="button-hero-cta"
          >
            Discover Our Mission
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4" data-testid="text-about-label">
                About Us
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
                Building Resilient Futures
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-about-description-1">
                Marine Refuge is dedicated to developing innovative amphibious
                housing solutions that protect coastal communities from the
                devastating impacts of climate change. Our mission is to create
                sustainable, flood-resistant homes that rise with water levels,
                ensuring safety and security for vulnerable populations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-description-2">
                Through cutting-edge engineering and community-centered design,
                we're transforming how the world approaches climate adaptation
                in flood-prone regions. Our amphibious housing technology
                represents a paradigm shift in sustainable urban development.
              </p>
            </div>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Modern amphibious house on water"
                className="w-full h-auto shadow-2xl"
                data-testid="img-about"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4" data-testid="text-what-we-do-label">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-what-we-do-title">
              Our Key Activities
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover-elevate transition-all duration-300" data-testid="card-activity-1">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-activity-1-title">
                Amphibious Housing Design
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-activity-1-description">
                We engineer innovative floating foundation systems that allow
                homes to rise and fall with water levels, protecting residents
                and property from flood damage.
              </p>
            </Card>

            <Card className="p-8 hover-elevate transition-all duration-300" data-testid="card-activity-2">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-activity-2-title">
                Community Engagement
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-activity-2-description">
                We work directly with vulnerable coastal communities to
                understand their needs and co-create sustainable housing
                solutions that preserve their way of life.
              </p>
            </Card>

            <Card className="p-8 hover-elevate transition-all duration-300" data-testid="card-activity-3">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-activity-3-title">
                Climate Adaptation Research
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-activity-3-description">
                Our team conducts cutting-edge research on climate resilience,
                developing best practices for flood mitigation and sustainable
                urban planning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-20 md:py-32 bg-accent/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-sdg-title">
              Aligned with UN Sustainable Development Goals
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-sdg-subtitle">
              Our work directly contributes to achieving global sustainability
              targets
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center" data-testid="sdg-9">
              <img
                src={sdg9}
                alt="SDG 9 - Industry, Innovation and Infrastructure"
                className="w-full max-w-[200px] mx-auto mb-4"
              />
              <p className="text-sm font-medium text-foreground" data-testid="text-sdg-9-label">
                Industry, Innovation and Infrastructure
              </p>
            </div>
            <div className="text-center" data-testid="sdg-11">
              <img
                src={sdg11}
                alt="SDG 11 - Sustainable Cities and Communities"
                className="w-full max-w-[200px] mx-auto mb-4"
              />
              <p className="text-sm font-medium text-foreground" data-testid="text-sdg-11-label">
                Sustainable Cities and Communities
              </p>
            </div>
            <div className="text-center" data-testid="sdg-13">
              <img
                src={sdg13}
                alt="SDG 13 - Climate Action"
                className="w-full max-w-[200px] mx-auto mb-4"
              />
              <p className="text-sm font-medium text-foreground" data-testid="text-sdg-13-label">
                Climate Action
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliated Companies Slider */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12" data-testid="text-affiliated-title">
            Affiliated With
          </h3>
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll gap-16 items-center">
              {/* Placeholder for affiliated company logos - to be added when provided */}
              <div className="flex gap-16 items-center min-w-max">
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 1
                </div>
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 2
                </div>
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 3
                </div>
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 4
                </div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex gap-16 items-center min-w-max">
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 1
                </div>
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 2
                </div>
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 3
                </div>
                <div className="w-32 h-16 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Partner 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-awards-title">
              Awards & Recognition
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link href="/awards/fics-24" className="block group relative aspect-[4/3] overflow-hidden" data-testid="link-award-fics">
              <img
                src={ficsAward}
                alt="FICS'24 Grand Finalists"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-medium flex items-center gap-2">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/awards/hult-prize" className="block group relative aspect-[4/3] overflow-hidden" data-testid="link-award-hult">
              <img
                src={hultAward}
                alt="HULT Prize On-Campus Runner Up"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-medium flex items-center gap-2">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-contact-title">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-contact-description">
            Interested in learning more about our amphibious housing solutions?
            We'd love to hear from you.
          </p>
          <Button
            size="lg"
            data-testid="button-contact"
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2" data-testid="footer-brand">
              <Waves className="w-6 h-6" />
              <span className="text-lg font-bold">Marine Refuge</span>
            </div>
            <p className="text-sm text-background/70" data-testid="text-footer-copyright">
              © 2025 Marine Refuge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
