// UPDATED: Add imports at the top

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { useFadeUp } from "@/hooks/use-fade-up";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useScroll } from "@/contexts/scroll-context";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  Waves,
  Building2,
  Users,
  Shield,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  HelpCircle,
  FileEdit,
  Handshake,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@assets/pexels-andriall-11918086_1763801753953.jpg";
import logoGreen from "@assets/Asset 1_1763803151514.png";
import logoLight from "@assets/targeted_element_1763829124980.png";
import logoHouse from "@assets/Asset 1_1763829102049.png";
import logo1 from "@assets/image_1763805395713.png";
import logo2 from "@assets/image_1763805402347.png";
import logo3 from "@assets/image_1763805408141.png";
import logo4 from "@assets/image_1763805414223.png";
import ficsAward from "@assets/image_1763804088995.png";
import ficsDetail1 from "@assets/image_1763804107507.png";
import ficsCertificate from "@assets/image_1763804115236.png";
import hultAward from "@assets/image_1763804171413.png";
import sdg9 from "@assets/sdg9-en_1763798707207.png";
import sdg11 from "@assets/E-Goal-11-1024x1024_1763798715992.png";
import sdg13 from "@assets/sdg13_1763798707208.png";
import maryamPhoto from "@assets/image_1763827218881.png";
import ayaanPhoto from "@assets/image_1763827286844.png";
import technologyImage1 from "@assets/3_1763810423345.png";
import technologyImage2 from "@assets/1_1763810432206.png";
import { useEffect, useRef, useState } from "react";

import { AffiliatedLogosCarouselAdvanced } from "@/components/AffiliatedLogosCarouselAdvanced";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          message: data.message,
          source: "website_contact_form",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Show success toast
      toast({
        title: "Message Sent! ✅",
        description:
          "Thank you for contacting Marine Refuge. We'll get back to you shortly.",
        duration: 5000,
      });

      // Reset form
      form.reset();
      setFocusedField(null);
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error toast
      toast({
        title: "Error Sending Message ❌",
        description:
          "There was an error sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        data-testid="contact-form"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* First Name and Last Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-white block mb-2">
                  First Name
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    className="w-full bg-[#3A5A5A] text-white placeholder-gray-400 px-4 py-3 rounded-t border-b-2 border-[#20C997] focus:outline-none focus:border-b-2 focus:border-[#20C997] transition-colors"
                    placeholder={focusedField === "firstName" ? "" : "John"}
                    onFocus={() => {
                      setFocusedField("firstName");
                      field.onFocus?.();
                    }}
                    onBlur={() => {
                      setFocusedField(null);
                      field.onBlur();
                    }}
                    data-testid="input-first-name"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-white block mb-2">
                  Last Name
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    className="w-full bg-[#3A5A5A] text-white placeholder-gray-400 px-4 py-3 rounded-t border-b-2 border-[#20C997] focus:outline-none focus:border-b-2 focus:border-[#20C997] transition-colors"
                    placeholder={focusedField === "lastName" ? "" : "Doe"}
                    onFocus={() => {
                      setFocusedField("lastName");
                      field.onFocus?.();
                    }}
                    onBlur={() => {
                      setFocusedField(null);
                      field.onBlur();
                    }}
                    data-testid="input-last-name"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* Email and Phone Row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-white block mb-2">
                  Your Email
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    className="w-full bg-[#3A5A5A] text-white placeholder-gray-400 px-4 py-3 rounded-t border-b-2 border-[#20C997] focus:outline-none focus:border-b-2 focus:border-[#20C997] transition-colors"
                    placeholder={
                      focusedField === "email"
                        ? ""
                        : "your.email@example.com"
                    }
                    onFocus={() => {
                      setFocusedField("email");
                      field.onFocus?.();
                    }}
                    onBlur={() => {
                      setFocusedField(null);
                      field.onBlur();
                    }}
                    data-testid="input-email"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase text-white block mb-2">
                  Your Phone
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="tel"
                    className="w-full bg-[#3A5A5A] text-white placeholder-gray-400 px-4 py-3 rounded-t border-b-2 border-[#20C997] focus:outline-none focus:border-b-2 focus:border-[#20C997] transition-colors"
                    placeholder={
                      focusedField === "phone" ? "" : "+92 (000) 000-0000"
                    }
                    onFocus={() => {
                      setFocusedField("phone");
                      field.onFocus?.();
                    }}
                    onBlur={() => {
                      setFocusedField(null);
                      field.onBlur();
                    }}
                    data-testid="input-phone"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs uppercase text-white block mb-2">
                Your Message
              </FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full bg-[#3A5A5A] text-white placeholder-gray-400 px-4 py-3 rounded-t border-b-2 border-[#20C997] focus:outline-none focus:border-b-2 focus:border-[#20C997] min-h-[120px] resize-none transition-colors"
                  placeholder={
                    focusedField === "message"
                      ? ""
                      : "Tell us about your inquiry..."
                  }
                  onFocus={() => {
                    setFocusedField("message");
                    field.onFocus?.();
                  }}
                  onBlur={() => {
                    setFocusedField(null);
                    field.onBlur();
                  }}
                  data-testid="textarea-message"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#20C997] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#20C997]/90 disabled:bg-[#20C997]/60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          style={{ fontFamily: "Inter, sans-serif" }}
          data-testid="button-submit"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block animate-spin">⚙️</span>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>

        {/* Form Info Text */}
        <p
          className="text-xs text-gray-400 text-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Your message will be sent to our team and we'll respond within 24-48
          hours.
        </p>
      </form>
    </Form>
  );
}

function ScrollTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionStartRef = useRef(0);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Store the initial position of the section
    if (sectionRef.current) {
      sectionStartRef.current = sectionRef.current.offsetTop;
    }

    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current) return;

      const sectionHeight = sectionRef.current.offsetHeight;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;

      // Calculate progress: how much we've scrolled into the section
      const scrollProgress = Math.max(
        0,
        Math.min(1, (scrollY - sectionTop + window.innerHeight) / (window.innerHeight + sectionHeight))
      );

      setImageOpacity(scrollProgress);

      // Once scroll progress reaches completion, allow normal scrolling
      if (scrollProgress >= 0.99) {
        setIsTransitionComplete(true);
      }

      // Apply sticky positioning during transition
      if (!isTransitionComplete && scrollY >= sectionTop - window.innerHeight) {
        containerRef.current!.style.position = "fixed";
        containerRef.current!.style.top = "0";
        containerRef.current!.style.left = "0";
        containerRef.current!.style.right = "0";
        containerRef.current!.style.zIndex = "10";
      } else if (!isTransitionComplete) {
        containerRef.current!.style.position = "relative";
        containerRef.current!.style.zIndex = "0";
      } else {
        containerRef.current!.style.position = "relative";
        containerRef.current!.style.zIndex = "0";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransitionComplete]);

  return (
    <div
      ref={containerRef}
      className="h-screen"
      data-testid="section-scroll-transition-container"
    >
      <div
        ref={sectionRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-accent/10"
        data-testid="section-scroll-transition"
      >
      </div>
    </div>
  );
}

function TeamSection({
  maryamPhoto,
  ayaanPhoto,
}: {
  maryamPhoto: string;
  ayaanPhoto: string;
}) {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const maryamTextRef = useRef<HTMLDivElement>(null);
  const ayaanTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (maryamTextRef.current) observer.observe(maryamTextRef.current);
    if (ayaanTextRef.current) observer.observe(ayaanTextRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (maryamTextRef.current) observer.unobserve(maryamTextRef.current);
      if (ayaanTextRef.current) observer.unobserve(ayaanTextRef.current);
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p
            className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4"
            data-testid="text-team-label"
          >
            The Team
          </p>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-foreground opacity-0"
            data-testid="text-team-title"
          >
            5 Years of Combined
            <br />
            Relevant Experience
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-muted-foreground mt-4 opacity-0"
            data-testid="text-team-subtitle"
          >
            Meet our founders
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Maryam */}
          <div className="text-center" data-testid="team-member-maryam">
            <div className="mb-6 flex justify-center">
              <img
                src={maryamPhoto}
                alt="Maryam Iftikhar"
                className="w-64 h-64 object-cover transition-all duration-300"
                style={{ borderRadius: "35px", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 22.5px 0 rgb(5, 180, 180)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="img-maryam"
              />
            </div>
            <div ref={maryamTextRef} className="opacity-0">
              <h3
                className="text-2xl font-bold text-foreground mb-2"
                data-testid="text-maryam-name"
              >
                Maryam Iftikhar
              </h3>
              <p
                className="text-lg font-semibold text-primary mb-4"
                data-testid="text-maryam-position"
              >
                Founder & CEO
              </p>
              <p
                className="text-muted-foreground mb-2"
                data-testid="text-maryam-degree"
              >
                MS Innovation & Entrepreneurship
              </p>
              <p
                className="text-sm text-muted-foreground font-medium"
                data-testid="text-maryam-focus"
              >
                Management, Networking & Outreach
              </p>
            </div>
          </div>

          {/* Ayaan */}
          <div className="text-center" data-testid="team-member-ayaan">
            <div className="mb-6 flex justify-center">
              <img
                src={ayaanPhoto}
                alt="Ayaan Ahmed Sheikh"
                className="w-64 h-64 object-cover transition-all duration-300"
                style={{ borderRadius: "35px", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 22.5px 0 rgb(5, 180, 180)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
                data-testid="img-ayaan"
              />
            </div>
            <div ref={ayaanTextRef} className="opacity-0">
              <h3
                className="text-2xl font-bold text-foreground mb-2"
                data-testid="text-ayaan-name"
              >
                Ayaan Ahmed Sheikh
              </h3>
              <p
                className="text-lg font-semibold text-primary mb-4"
                data-testid="text-ayaan-position"
              >
                Cofounder & CTO
              </p>
              <p
                className="text-muted-foreground mb-2"
                data-testid="text-ayaan-degree"
              >
                BS Civil Engineering
              </p>
              <p
                className="text-sm text-muted-foreground font-medium"
                data-testid="text-ayaan-focus"
              >
                Development & Testing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { scroll } = useScroll();
  const scrolled = scroll > 20;
  const { shouldShowNav } = useScrollDirection();
  const { scrollToElement, scrollToTop } = useSmoothScroll();
  useFadeUp();

  // Define sections for navigation
  const sections = [
    { id: "home", navSelector: "a[data-nav='home']", offset: 80 },
    { id: "about", navSelector: "a[data-nav='about']", offset: 80 },
    { id: "what-we-do", navSelector: "a[data-nav='what-we-do']", offset: 80 },
    { id: "contact", navSelector: "a[data-nav='contact']", offset: 80 },
  ];

  // Use scroll section hook
  useScrollToSection(sections);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      scrollToElement(element, {
        offset: 80,
        duration: 800,
        easing: "easeInOutCubic",
      });
    }
  };

  const handleLogoClick = () => {
    scrollToTop({ duration: 800, easing: "easeInOutCubic" });
  };

  // Define logo items
  const affiliatedLogos = [
    { id: "nust", src: logo1, alt: "NUST Pakistan", testId: "logo-1" },
    { id: "nstp", src: logo2, alt: "NSTP", testId: "logo-2" },
    { id: "nbs", src: logo3, alt: "NUST Business School", testId: "logo-3" },
    { id: "nice", src: logo4, alt: "NUST NICE", testId: "logo-4" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          !shouldShowNav && scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Marine Refuge Home"
              data-testid="nav-brand"
            >
              {scrolled ? (
                <img
                  src={logoGreen}
                  alt="Marine Refuge"
                  className="h-8 w-8 transition-all duration-300 ease-in-out"
                />
              ) : (
                <img
                  src={logoLight}
                  alt="Marine Refuge"
                  className="h-8 w-auto transition-all duration-300 ease-in-out"
                  style={{
                    filter: "brightness(0) invert(1)",
                    opacity: 1,
                  }}
                />
              )}
              <span
                className={`text-xl font-bold transition-colors duration-300 ease-in-out ${
                  scrolled ? "text-primary" : "text-white"
                }`}
                data-testid="text-brand-name"
              >
                Marine Refuge
              </span>
            </button>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => handleNavClick("home")}
                className={`transition-colors duration-300 ease-in-out font-medium ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-accent"
                }`}
                data-testid="nav-home"
                data-nav="home"
                aria-current="false"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className={`transition-colors duration-300 ease-in-out font-medium ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-accent"
                }`}
                data-testid="nav-about"
                data-nav="about"
                aria-current="false"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick("what-we-do")}
                className={`transition-colors duration-300 ease-in-out font-medium ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-accent"
                }`}
                data-testid="nav-what-we-do"
                data-nav="what-we-do"
                aria-current="false"
              >
                What We Do
              </button>
              <Link
                href="/learn-more"
                className={`transition-colors duration-300 ease-in-out font-medium ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-accent"
                }`}
                data-testid="nav-learn-more"
              >
                Learn More
              </Link>
              <button
                onClick={() => handleNavClick("contact")}
                className={`transition-colors duration-300 ease-in-out font-medium ${
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-accent"
                }`}
                data-testid="nav-contact"
                data-nav="contact"
                aria-current="false"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 w-full h-screen flex flex-col justify-between">
          <div className="absolute bottom-8 left-[73px] p-6 text-left">
            <h1
              style={{
                fontSize: "64px",
                fontWeight: 500,
                color: "white",
              }}
              data-testid="text-hero-title"
            >
              Marine Refuge
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.9)",
                marginTop: "8px",
              }}
              data-testid="text-hero-subtitle"
            >
              Homes that stand by you
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <p
                className="fade-up-trigger text-sm font-semibold text-primary uppercase tracking-wider mb-4"
                data-testid="text-about-label"
              >
                About Us
              </p>
              <h2
                className="fade-up-trigger text-4xl md:text-5xl font-bold text-foreground mb-6"
                data-testid="text-about-title"
              >
                Building Resilient Futures
              </h2>
              <p
                className="fade-up-trigger text-lg text-muted-foreground mb-6 leading-relaxed"
                data-testid="text-about-description-1"
              >
                Marine Refuge is dedicated to developing innovative amphibious
                housing solutions that protect coastal communities from the
                devastating impacts of climate change. Our mission is to create
                sustainable, flood-resistant homes that rise with water levels,
                ensuring safety and security for vulnerable populations.
              </p>
              <p
                className="fade-up-trigger text-lg text-muted-foreground leading-relaxed"
                data-testid="text-about-description-2"
              >
                Through cutting-edge engineering and community-centered design,
                we're transforming how the world approaches climate adaptation
                in flood-prone regions. Our amphibious housing technology
                represents a paradigm shift in sustainable urban development.
              </p>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Modern amphibious house on water"
                className="w-full h-auto shadow-2xl"
                data-testid="img-about"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 md:py-32 bg-[#23454C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 flex flex-col gap-4">
            <p
              className="fade-up-trigger text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#07EBE1" }}
            >
              What We Do
            </p>
            <h2
              className="fade-up-trigger text-5xl md:text-6xl font-bold"
              style={{ color: "white" }}
            >
              Our Key Activities
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-5 gap-6 items-center">
            {/* Left Column */}
            <div className="flex flex-col gap-6 col-span-2">
              {/* Card 1 */}
              <div
                className="fade-up-trigger p-10 border-b-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "#07EBE1",
                  borderRadius: "10px",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#07EBE1" }}
                >
                  Amphibious Housing Design
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "white" }}
                >
                  We engineer innovative floating foundation systems that allow
                  homes to rise and fall with water levels, protecting residents
                  and property from flood damage.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="fade-up-trigger p-10 border-b-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "#07EBE1",
                  borderRadius: "10px",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#07EBE1" }}
                >
                  Community Engagement
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "white" }}
                >
                  We work directly with vulnerable coastal communities to
                  understand their needs and co-create sustainable housing
                  solutions that preserve their way of life.
                </p>
              </div>
            </div>

            {/* Center Logo */}
            <div
              className="flex justify-center items-center col-span-1 fade-up-trigger"
            >
              <img
                src="/logo.png"
                alt="Marine Refuge Logo"
                style={{
                  maxWidth: "100%",
                  opacity: 0.1,
                }}
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 col-span-2">
              {/* Card 3 */}
              <div
                className="fade-up-trigger p-10 border-b-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "#07EBE1",
                  borderRadius: "10px",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#07EBE1" }}
                >
                  Climate Adaptation Research
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "white" }}
                >
                  Our team conducts cutting-edge research on climate resilience,
                  developing best practices for flood mitigation and sustainable
                  urban planning.
                </p>
              </div>

              {/* Card 4 */}
              <div
                className="fade-up-trigger p-10 border-b-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "#07EBE1",
                  borderRadius: "10px",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#07EBE1" }}
                >
                  Sustainable Design
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "white" }}
                >
                  Build with eco-friendly materials and designed to minimize
                  environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-20 md:py-32 bg-accent/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2
              className="fade-up-trigger text-4xl md:text-5xl font-bold text-foreground mb-4"
              data-testid="text-sdg-title"
            >
              Aligned with UN Sustainable Development Goals
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-sdg-subtitle"
            >
              Our work directly contributes to achieving global sustainability
              targets
            </p>
          </div>
          <div className="relative mx-auto" style={{ maxWidth: "800px" }}>
            {/* Gradient fade on left */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent z-10 pointer-events-none" />
            {/* Gradient fade on right */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-accent/10 via-accent/5 to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div className="overflow-hidden">
              <div
                className="flex animate-scroll items-center py-4"
                style={{ gap: "48px" }}
              >
                <div className="flex items-center min-w-max" style={{ gap: "48px" }}>
                  {/* SDG 9 */}
                  <div className="text-center flex-shrink-0" data-testid="sdg-9">
                    <img
                      src={sdg9}
                      alt="SDG 9 - Industry, Innovation and Infrastructure"
                      className="w-full max-w-[170px] mx-auto mb-3"
                    />
                    <p
                      className="text-sm font-medium text-foreground whitespace-nowrap"
                      data-testid="text-sdg-9-label"
                    >
                      Industry, Innovation & Infrastructure
                    </p>
                  </div>
                  {/* SDG 11 */}
                  <div className="text-center flex-shrink-0" data-testid="sdg-11">
                    <img
                      src={sdg11}
                      alt="SDG 11 - Sustainable Cities and Communities"
                      className="w-full max-w-[170px] mx-auto mb-3"
                    />
                    <p
                      className="text-sm font-medium text-foreground whitespace-nowrap"
                      data-testid="text-sdg-11-label"
                    >
                      Sustainable Cities & Communities
                    </p>
                  </div>
                  {/* SDG 13 */}
                  <div className="text-center flex-shrink-0" data-testid="sdg-13">
                    <img
                      src={sdg13}
                      alt="SDG 13 - Climate Action"
                      className="w-full max-w-[170px] mx-auto mb-3"
                    />
                    <p
                      className="text-sm font-medium text-foreground whitespace-nowrap"
                      data-testid="text-sdg-13-label"
                    >
                      Climate Action
                    </p>
                  </div>
                </div>
                {/* Repeat for seamless scrolling */}
                <div className="flex items-center min-w-max" style={{ gap: "48px" }}>
                  <div className="text-center flex-shrink-0">
                    <img
                      src={sdg9}
                      alt="SDG 9 - Industry, Innovation and Infrastructure"
                      className="w-full max-w-[170px] mx-auto mb-3"
                    />
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">
                      Industry, Innovation & Infrastructure
                    </p>
                  </div>
                  <div className="text-center flex-shrink-0">
                    <img
                      src={sdg11}
                      alt="SDG 11 - Sustainable Cities and Communities"
                      className="w-full max-w-[170px] mx-auto mb-3"
                    />
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">
                      Sustainable Cities & Communities
                    </p>
                  </div>
                  <div className="text-center flex-shrink-0">
                    <img
                      src={sdg13}
                      alt="SDG 13 - Climate Action"
                      className="w-full max-w-[170px] mx-auto mb-3"
                    />
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">
                      Climate Action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <TeamSection maryamPhoto={maryamPhoto} ayaanPhoto={ayaanPhoto} />

      {/* Affiliated Companies Slider */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-8 md:gap-16">
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground whitespace-nowrap flex-shrink-0"
              data-testid="text-affiliated-title"
            >
              Affiliated with
            </h3>

            <AffiliatedLogosCarouselAdvanced
              logos={affiliatedLogos}
              duration={30}
              pauseOnHover={true}
            />
          </div>
        </div>
      </section>

      {/* The Technology Behind It Section */}
      <section className="py-10 md:py-16 bg-accent/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <p
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
              data-testid="text-technology-label"
            >
              Innovation
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              data-testid="text-technology-title"
            >
              The Technology Behind It
            </h2>
          </div>
        </div>
      </section>

      {/* Scroll Transition Section */}
      <ScrollTransitionSection />

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
              data-testid="text-benefits-label"
            >
              Advantages
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
              data-testid="text-benefits-title"
            >
              Benefits of Amphibious Housing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card
              className="p-8 hover-elevate transition-all duration-300"
              data-testid="card-benefit-1"
            >
              <h3
                className="text-2xl font-semibold text-foreground mb-4"
                data-testid="text-benefit-1-title"
              >
                Climate Resilience
              </h3>
              <p
                className="text-muted-foreground leading-relaxed"
                data-testid="text-benefit-1-description"
              >
                Homes that adapt to rising water levels and extreme weather,
                protecting families and property from flood damage.
              </p>
            </Card>

            <Card
              className="p-8 hover-elevate transition-all duration-300"
              data-testid="card-benefit-2"
            >
              <h3
                className="text-2xl font-semibold text-foreground mb-4"
                data-testid="text-benefit-2-title"
              >
                Economic Sustainability
              </h3>
              <p
                className="text-muted-foreground leading-relaxed"
                data-testid="text-benefit-2-description"
              >
                Reduce reconstruction costs and insurance premiums with
                technology that works with nature instead of against it.
              </p>
            </Card>

            <Card
              className="p-8 hover-elevate transition-all duration-300"
              data-testid="card-benefit-3"
            >
              <h3
                className="text-2xl font-semibold text-foreground mb-4"
                data-testid="text-benefit-3-title"
              >
                Dignity & Community
              </h3>
              <p
                className="text-muted-foreground leading-relaxed"
                data-testid="text-benefit-3-description"
              >
                Enable communities to stay in their homes and maintain their way
                of life while building a sustainable future.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              data-testid="text-awards-title"
            >
              Awards & Recognition
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link
              href="/awards/fics-24"
              className="block group relative aspect-[4/3] overflow-hidden"
              data-testid="link-award-fics"
            >
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

            <Link
              href="/awards/hult-prize"
              className="block group relative aspect-[4/3] overflow-hidden"
              data-testid="link-award-hult"
            >
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

      {/* Contact Us Section */}
      <section
        id="contact"
        className="py-20 md:py-32 bg-white"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <h1
            className="text-center text-6xl font-bold text-black mb-16"
            style={{ fontFamily: "Inter, sans-serif" }}
            data-testid="text-contact-title"
          >
            Contact us.
          </h1>

          {/* Three Cards Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Card 1: General Inquiries */}
            <div
              className="bg-[#F8F8F8] rounded-lg p-10"
              data-testid="card-general-inquiries"
            >
              <div className="w-16 h-16 rounded-full bg-[#20C997] flex items-center justify-center mb-6">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                General Inquiries
              </h3>
              <p
                className="text-base text-gray-700"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                For any general questions or information about our services,
                feel free to reach out.
              </p>
            </div>

            {/* Card 2: Research collaboration */}
            <div
              className="bg-[#F8F8F8] rounded-lg p-10"
              data-testid="card-research-collaboration"
            >
              <div className="w-16 h-16 rounded-full bg-[#20C997] flex items-center justify-center mb-6">
                <FileEdit className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Research collaboration
              </h3>
              <p
                className="text-base text-gray-700"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Academic institutions can help us innovate further. We're open
                to research.
              </p>
            </div>

            {/* Card 3: Partnerships */}
            <div
              className="bg-[#F8F8F8] rounded-lg p-10"
              data-testid="card-partnerships"
            >
              <div className="w-16 h-16 rounded-full bg-[#20C997] flex items-center justify-center mb-6">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl font-bold text-black mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Partnerships
              </h3>
              <p
                className="text-base text-gray-700"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Interested in working together to create sustainable solutions?
                Contact our team.
              </p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column - Contact Information */}
            <div>
              <p
                className="text-sm text-gray-700 mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="text-get-in-touch-subtitle"
              >
                • Get in touch.
              </p>
              <h2
                className="text-4xl font-bold text-black mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="text-contact-subtitle"
              >
                Turning climate challenges into sustainable opportunities.
              </h2>
              <p
                className="text-base text-gray-700 mb-8 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Our team is here to support your sustainable goals. Whether you
                have questions, need assistance, or want to collaborate, we're
                ready to help you take the next step toward a greener future
              </p>

              <div className="space-y-6">
                <div className="flex gap-4" data-testid="contact-phone">
                  <Phone className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <p
                    className="text-black"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    92 444999332
                  </p>
                </div>
                <div className="flex gap-4" data-testid="contact-address">
                  <MapPin className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <p
                    className="text-black"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    NSTP, H-12 Islamabad, Pakistan
                  </p>
                </div>
                <div className="flex gap-4" data-testid="contact-email">
                  <Mail className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <p
                    className="text-black"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    marinerefuge@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-[#2F4F4F] rounded-lg p-10">
              <h3
                className="text-4xl font-bold text-white mb-8"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="text-contact-form-title"
              >
                Send us a message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-[#1A202C] text-white py-12"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Copyright Top-Left */}
          <p
            className="text-sm text-white mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
            data-testid="text-footer-copyright"
          >
            2025 Marine Refuge. All rights reserved.
          </p>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            {/* Left: Brand */}
            <div>
              <div
                className="flex items-center gap-3 mb-3"
                data-testid="footer-brand"
              >
                <img
                  src={logoGreen}
                  alt="Marine Refuge"
                  className="w-8 h-8"
                  style={{
                    filter: "brightness(0) invert(1)",
                    opacity: 1,
                  }}
                />
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  data-testid="text-footer-brand-name"
                >
                  Marine Refuge
                </span>
              </div>
              <p
                className="text-sm text-gray-300"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="text-footer-tagline"
              >
                Homes that stand by you
              </p>
            </div>

            {/* Right: Newsletter and Navigation */}
            <div>
              {/* Newsletter Subscription */}
              <div className="mb-8">
                <h4
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "Inter, sans-serif", color: "#00FFFF" }}
                  data-testid="text-newsletter-title"
                >
                  Newsletter subcription
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL*"
                    className="flex-1 bg-[#2F4F4F] text-white placeholder-gray-400 px-4 py-3 rounded focus:outline-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    data-testid="input-newsletter-email"
                  />
                  <button
                    type="button"
                    className="bg-[#00FFFF] text-white px-6 py-3 rounded font-medium hover:bg-[#00FFFF]/90 transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    data-testid="button-subscribe"
                  >
                    Subcribe
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick("home")}
                  className="text-base text-white text-left hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  data-testid="footer-nav-home"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick("about")}
                  className="text-base text-white text-left hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  data-testid="footer-nav-about"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavClick("what-we-do")}
                  className="text-base text-white text-left hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  data-testid="footer-nav-what-we-do"
                >
                  What we do
                </button>
                <Link
                  href="/learn-more"
                  className="text-base text-white hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  data-testid="footer-nav-learn-more"
                >
                  Learn more
                </Link>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="text-base text-white text-left hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  data-testid="footer-nav-contact"
                >
                  Contact Us
                </button>
              </nav>
            </div>
          </div>

          {/* LinkedIn Icon Bottom-Right */}
          <div className="flex justify-end">
            <a
              href="https://www.linkedin.com/company/marinerefuge/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:opacity-80 transition-opacity"
              data-testid="link-linkedin"
              aria-label="Marine Refuge LinkedIn"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
