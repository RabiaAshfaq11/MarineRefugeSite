import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Waves, ArrowLeft, ExternalLink, Trophy } from "lucide-react";
import ficsAward from "@assets/generated_images/fics_24_award_ceremony.png";

export default function AwardFics() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2" data-testid="header-brand">
              <Waves className="w-8 h-8" />
              <span className="text-xl font-bold" data-testid="text-brand-name">Marine Refuge</span>
            </div>
            <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-background/10 h-9 px-4 py-2 text-background" data-testid="link-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground" data-testid="text-award-title">
              FICS'24 Grand Finalists
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl" data-testid="text-award-subtitle">
            Marine Refuge was selected as a Grand Finalist at the FICS'24
            (Future Innovation Challenge Summit) 2024
          </p>
          <div className="mb-12">
            <img
              src={ficsAward}
              alt="FICS'24 Grand Finalists Award"
              className="w-full h-auto shadow-2xl"
              data-testid="img-award-fics"
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-foreground mb-8" data-testid="text-about-achievement-title">
            About This Achievement
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p className="leading-relaxed" data-testid="text-achievement-description-1">
              The Future Innovation Challenge Summit (FICS) brings together the
              world's most promising startups and innovators working on
              solutions to global challenges. Being selected as a Grand Finalist
              represents recognition from leading experts in sustainability,
              climate adaptation, and social innovation.
            </p>
            <p className="leading-relaxed" data-testid="text-achievement-description-2">
              Marine Refuge's amphibious housing solution impressed judges with
              its practical approach to climate resilience, combining
              cutting-edge engineering with community-centered design. Our
              solution addresses the urgent need for flood protection in
              vulnerable coastal communities while maintaining affordability and
              cultural preservation.
            </p>
            <p className="leading-relaxed" data-testid="text-achievement-description-3">
              This recognition validates our mission and demonstrates the global
              potential of amphibious housing technology as a scalable climate
              adaptation strategy. We're honored to be among the finalists and
              remain committed to protecting communities from the impacts of
              climate change.
            </p>
          </div>

          <div className="mt-12">
            <a
              href="https://www.linkedin.com/feed/update/urn:li:activity:7256053842058878976"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
              data-testid="link-fics-linkedin"
            >
              View Announcement
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-cta-title">
            Join Us in Building Resilient Communities
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-cta-description">
            Learn more about our amphibious housing solutions and how we're
            making a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8" data-testid="link-back-home">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
            <Link href="/learn-more" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8" data-testid="link-learn-more">
              Learn More About Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2" data-testid="footer-brand">
              <Waves className="w-6 h-6" />
              <span className="text-lg font-bold" data-testid="text-footer-brand-name">Marine Refuge</span>
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
