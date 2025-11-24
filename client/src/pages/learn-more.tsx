import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Waves, ArrowLeft, Anchor, Home as HomeIcon, Droplet, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import logoLight from "@assets/targeted_element_1763829124980.png";
import logoHouse from "@assets/Asset 1_1763829102049.png";
import aboutImage from "@assets/generated_images/about_section_amphibious_house.png";
import heroVideo from "@assets/14758955_1920_1080_30fps_1763971565251.mp4";

export default function LearnMore() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <Link href="/" className="flex items-center gap-2" data-testid="nav-brand">
              <img 
                src={scrolled ? logoHouse : logoLight} 
                alt="Marine Refuge" 
                className={`h-8 transition-all duration-300 ${scrolled ? "w-8" : "w-auto"}`}
              />
              <span className={`text-xl font-bold transition-colors duration-300 ${
                scrolled ? "text-primary" : "text-white"
              }`} data-testid="text-brand-name">
                Marine Refuge
              </span>
            </Link>
            <Link href="/" className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 ${
              scrolled 
                ? "text-foreground hover:text-primary" 
                : "text-white hover:text-accent"
            }`} data-testid="link-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-20">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="video-hero"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Fading Black Gradient Overlay (top to bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-learn-more-title">
            How Amphibious Housing Works
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto" data-testid="text-learn-more-subtitle">
            Discover the innovative technology behind our climate-resilient
            housing solutions
          </p>
        </div>
      </section>
      {/* Introduction */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-intro-title">
                Floating Foundations for a Changing Climate
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-intro-description-1">
                Amphibious housing represents a revolutionary approach to
                flood-resistant construction. Unlike traditional homes that are
                vulnerable to rising water levels, our amphibious houses are
                designed to float vertically when floodwaters arrive, then
                return to their original position when waters recede.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-intro-description-2">
                This innovative solution protects both the structure and its
                inhabitants while maintaining the community's connection to
                their land and heritage. It's adaptation without displacement.
              </p>
            </div>
            <div>
              <img
                src={aboutImage}
                alt="Amphibious house demonstration"
                className="w-full h-auto shadow-2xl"
                data-testid="img-learn-more-hero"
              />
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-technology-title">
              The Technology Behind It
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-technology-subtitle">
              Our amphibious housing system combines three key components
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8" data-testid="card-tech-1">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Anchor className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-tech-1-title">
                Buoyant Foundation
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-tech-1-description">
                A hollow, watertight foundation made of reinforced concrete or
                engineered materials that provides buoyancy when water levels
                rise, allowing the entire structure to float safely.
              </p>
            </Card>

            <Card className="p-8" data-testid="card-tech-2">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <HomeIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-tech-2-title">
                Vertical Guidance System
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-tech-2-description">
                Steel posts or pylons anchored deep in the ground guide the
                house's vertical movement, ensuring stability and preventing
                lateral drift during flooding events.
              </p>
            </Card>

            <Card className="p-8" data-testid="card-tech-3">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
                <Droplet className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-tech-3-title">
                Flexible Utilities
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-tech-3-description">
                Specially designed flexible connections for water, sewage,
                electricity, and gas that can extend and contract as the house
                rises and falls without breaking or leaking.
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* Benefits */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-benefits-title">
              Benefits of Amphibious Housing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-4" data-testid="benefit-1">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-benefit-1-title">
                  Complete Flood Protection
                </h3>
                <p className="text-muted-foreground" data-testid="text-benefit-1-description">
                  Eliminates flood damage to structures and possessions by
                  rising above floodwaters, protecting both property and
                  livelihoods.
                </p>
              </div>
            </div>

            <div className="flex gap-4" data-testid="benefit-2">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <HomeIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-benefit-2-title">
                  Community Preservation
                </h3>
                <p className="text-muted-foreground" data-testid="text-benefit-2-description">
                  Allows communities to remain in their ancestral lands rather
                  than face climate displacement, preserving cultural heritage.
                </p>
              </div>
            </div>

            <div className="flex gap-4" data-testid="benefit-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-benefit-3-title">
                  Cost-Effective Adaptation
                </h3>
                <p className="text-muted-foreground" data-testid="text-benefit-3-description">
                  More affordable than relocating entire communities or building
                  massive flood defense infrastructure like seawalls.
                </p>
              </div>
            </div>

            <div className="flex gap-4" data-testid="benefit-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Waves className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-benefit-4-title">
                  Sustainable Solution
                </h3>
                <p className="text-muted-foreground" data-testid="text-benefit-4-description">
                  Works with nature rather than against it, reducing
                  environmental impact while providing long-term resilience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>

          <div className="space-y-0">
            <div className="border-t border-foreground/20" />
            
            <div className="py-6 pt-[2px] pb-[2px]" data-testid="faq-1">
              <h3 className="md:text-2xl text-foreground text-[21px] font-extralight" data-testid="text-faq-1-question">
                Is amphibious housing safe during floods?
              </h3>
              <div className="border-b border-foreground/20 mt-6" />
            </div>

            <div className="py-6 pt-[2px] pb-[2px]" data-testid="faq-2">
              <h3 className="md:text-2xl text-foreground text-[21px] font-extralight" data-testid="text-faq-2-question">
                How much does an amphibious house cost?
              </h3>
              <div className="border-b border-foreground/20 mt-6" />
            </div>

            <div className="py-6 pt-[2px] pb-[2px]" data-testid="faq-3">
              <h3 className="md:text-2xl text-foreground text-[21px] font-extralight" data-testid="text-faq-3-question">
                Can existing homes be retrofitted?
              </h3>
              <div className="border-b border-foreground/20 mt-6" />
            </div>

            <div className="py-6" data-testid="faq-4">
              <h3 className="md:text-2xl text-foreground text-[21px] font-extralight" data-testid="text-faq-4-question">
                Where has this technology been successfully implemented?
              </h3>
              <div className="border-b border-foreground/20 mt-6" />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-cta-title">
            Ready to Learn More?
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
            Contact us to discuss how amphibious housing can protect your
            community from climate change impacts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8" data-testid="link-back-home">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
            <Button size="lg" data-testid="button-contact-learn-more">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2" data-testid="footer-brand">
                <Waves className="w-6 h-6" />
                <span className="text-lg font-bold" data-testid="text-footer-brand-name">Marine Refuge</span>
              </div>
              <p className="text-sm text-background/70" data-testid="text-footer-tagline">
                Building climate-resilient communities through innovative amphibious housing
              </p>
            </div>
          </div>
          <div className="border-t border-background/20 pt-6">
            <p className="text-sm text-background/70 text-center md:text-left" data-testid="text-footer-copyright">
              © 2025 Marine Refuge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
