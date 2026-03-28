import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

/* ─── Asset URLs ─── */
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488533278/Vr2TGVp28Rc8GfDRVCESuq/hero-bg-LW6pcJwJAEpB3bycpWfFQU.webp";
const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488533278/Vr2TGVp28Rc8GfDRVCESuq/cta-bg-C4gzBzGAyhe5p3ho2SxEaL.webp";

/* ─── Reusable: Reveal wrapper ─── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useScrollReveal(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Geometric accent shapes ─── */
function GeoAccent({ type, className }: { type: number; className?: string }) {
  const shapes = [
    <svg viewBox="0 0 40 40" className="w-8 h-8"><polygon points="20,4 36,36 4,36" fill="none" stroke="#7BB9F1" strokeWidth="1.5" opacity="0.6" /></svg>,
    <svg viewBox="0 0 40 40" className="w-8 h-8"><rect x="6" y="6" width="28" height="28" rx="2" fill="none" stroke="#7BB9F1" strokeWidth="1.5" opacity="0.6" transform="rotate(45 20 20)" /></svg>,
    <svg viewBox="0 0 40 40" className="w-8 h-8"><circle cx="20" cy="20" r="14" fill="none" stroke="#7BB9F1" strokeWidth="1.5" opacity="0.6" /><circle cx="20" cy="20" r="6" fill="#7BB9F1" opacity="0.2" /></svg>,
    <svg viewBox="0 0 40 40" className="w-8 h-8"><line x1="4" y1="20" x2="36" y2="20" stroke="#7BB9F1" strokeWidth="1.5" opacity="0.6" /><line x1="20" y1="4" x2="20" y2="36" stroke="#7BB9F1" strokeWidth="1.5" opacity="0.6" /><circle cx="20" cy="20" r="4" fill="#7BB9F1" opacity="0.3" /></svg>,
  ];
  return <span className={className}>{shapes[type % shapes.length]}</span>;
}

/* ─── Sticky Nav ─── */
function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["blueprint", "who", "about", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "blueprint", label: "How It Works" },
    { id: "who", label: "Who I Help" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(31,52,79,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between h-16 md:h-18">
        <a href="#" className="text-white font-bold text-lg tracking-tight">
          Commercial<span className="text-[#7BB9F1]">Growth</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm font-medium transition-colors duration-300"
              style={{ color: active === l.id ? "#7BB9F1" : "#96989D" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="glow-btn px-5 py-2 text-sm">Book a Call</a>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1F344F]/95 backdrop-blur-xl border-t border-white/5 py-4">
          <div className="container flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2 transition-colors duration-300"
                style={{ color: active === l.id ? "#7BB9F1" : "#96989D" }}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="glow-btn px-5 py-2.5 text-sm text-center">Book a Call</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── 1. Hero ─── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F344F]/60 via-[#1F344F]/30 to-[#1F344F]" />
        {/* Floating orbs */}
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-[#7BB9F1]/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full bg-[#8FC0D3]/10 blur-3xl animate-float-slower" />
        <div className="absolute top-[50%] left-[40%] w-32 h-32 rounded-full bg-[#7BB9F1]/8 blur-2xl animate-pulse-glow" />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-6"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}
          >
            Data-led decisions. Proven results.
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight text-white mb-6"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s" }}
          >
            Growth You<br />Can Measure
          </h1>
          <p
            className="text-lg md:text-xl text-[#96989D] max-w-xl mb-10 leading-relaxed"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.5s" }}
          >
            Strategies built around commercial outcomes, where every dollar spent has a justifiable expected return.
          </p>
          <div
            className="flex flex-wrap gap-4"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.7s" }}
          >
            <a href="#contact" className="glow-btn px-8 py-4 text-base">Book a Discovery Call</a>
            <a href="#blueprint" className="ghost-btn px-8 py-4 text-base">See How It Works</a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#7BB9F1] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Pain Points ─── */
function PainPoints() {
  const pains = [
    "Your marketing spend can't prove its ROI",
    "You've been sold generic strategies that weren't built for your business",
    "You know growth is possible but can't pinpoint what's holding you back",
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-4">The problem</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Sound Familiar?</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="glass-card p-8 h-full flex flex-col gap-5">
                <GeoAccent type={i} />
                <p className="text-lg font-medium text-white/90 leading-relaxed">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Blueprint Stepper ─── */
const phases = [
  {
    num: "01",
    title: "Diagnose and Blueprint",
    desc: "We audit your systems, data, and workflows end-to-end to identify leakage, bottlenecks, and the fastest path to growth.",
    items: ["End-to-End System Audit", "Leakage and Bottleneck Identification", "Strategic Growth Mapping", "Competitive Landscape Analysis"],
  },
  {
    num: "02",
    title: "Build and Implement",
    desc: "We install CRM workflows, automation, tracking, and conversion improvements to create a scalable, measurable growth engine.",
    items: ["CRM and Tracking Installation", "Workflow Automation", "Lead Generation Systems", "Conversion Optimisation"],
  },
  {
    num: "03",
    title: "Test and Scale",
    desc: "We run controlled experiments, measure what works, double down on winners, and build repeatable systems for sustainable growth.",
    items: ["Performance Testing and Iteration", "Channel Expansion", "Reporting and Accountability Frameworks", "Scalable Growth Systems"],
  },
];

function Blueprint() {
  const [active, setActive] = useState(0);
  const touchStart = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && active < 2) setActive(active + 1);
      if (diff < 0 && active > 0) setActive(active - 1);
    }
  }, [active]);

  return (
    <section id="blueprint" className="relative py-24 md:py-32 bg-[#1a2e47]">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-4">The framework</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Commercial Growth Blueprint</h2>
          <p className="text-[#96989D] text-lg mb-12 max-w-2xl">Three phases. One system. Measurable results at every step.</p>
        </Reveal>

        {/* Step indicator */}
        <Reveal delay={100}>
          <div className="flex items-center gap-0 mb-12 max-w-lg">
            {phases.map((p, i) => (
              <div key={i} className="flex items-center flex-1">
                <button
                  onClick={() => setActive(i)}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-500"
                  style={{
                    background: i <= active ? "#7BB9F1" : "rgba(255,255,255,0.08)",
                    color: i <= active ? "#fff" : "#96989D",
                    boxShadow: i === active ? "0 0 25px rgba(123,185,241,0.4)" : "none",
                  }}
                >
                  {p.num}
                </button>
                {i < 2 && (
                  <div className="flex-1 h-0.5 mx-2 rounded-full overflow-hidden bg-white/10">
                    <div
                      className="h-full bg-[#7BB9F1] transition-all duration-700"
                      style={{ width: i < active ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Phase card */}
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {phases.map((p, i) => (
              <div key={i} className="w-full flex-shrink-0 px-0 md:px-0">
                <div className="glass-card p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <span className="text-6xl font-extrabold text-[#7BB9F1]/20 leading-none">{p.num}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{p.title}</h3>
                      <p className="text-[#96989D] leading-relaxed max-w-xl">{p.desc}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {p.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <GeoAccent type={j} />
                        <span className="text-sm font-medium text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile swipe hint */}
        <p className="text-center text-xs text-[#96989D]/60 mt-4 md:hidden">Swipe to navigate</p>
      </div>
    </section>
  );
}

/* ─── 4. Who I Work With ─── */
function WhoIWorkWith() {
  const cards = [
    "SMBs frustrated that their marketing spend can't prove its ROI",
    "Service businesses and agencies wanting to grow without guesswork",
    "Early-stage founders who've been DIY-ing their growth and need a system",
    "Business owners tired of being sold strategy that can't be measured",
  ];
  return (
    <section id="who" className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-4">Ideal clients</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Built for Businesses Ready to Grow</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="glass-card p-8 h-full flex items-start gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#7BB9F1] flex-shrink-0" />
                <p className="text-lg text-white/90 leading-relaxed">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Credibility / About ─── */
function Credibility() {
  const { ref, isVisible } = useScrollReveal(0.2);
  const franchisees = useCountUp(40, 2200, isVisible);
  const settlements = useCountUp(8, 2400, isVisible);

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#1a2e47]">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10" ref={ref}>
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-4">Track record</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">The Track Record</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-3 gap-6 md:gap-12 mb-16">
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-extrabold text-white">
                {franchisees === 0 ? "0" : franchisees}+
              </p>
              <p className="text-sm text-[#96989D] mt-2">3 to 40+ Franchisees</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-extrabold text-white">
                ${settlements}B
              </p>
              <p className="text-sm text-[#96989D] mt-2">$500K to $8B in Settlements</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-6xl font-extrabold text-white">
                Under <span className="text-[#7BB9F1]">4</span> Years
              </p>
              <p className="text-sm text-[#96989D] mt-2">Timeframe</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-[#96989D] text-lg leading-relaxed max-w-3xl mb-10">
            At Rate Money, I led the marketing function from three franchisees to a fully national franchise network. Every decision was tied to a number, every campaign had to justify its cost, and every franchisee needed to see a return they could feel.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <blockquote className="border-l-2 border-[#7BB9F1] pl-6 py-4 bg-[#7BB9F1]/[0.04] rounded-r-xl max-w-2xl"
            style={{ boxShadow: "inset 0 0 30px rgba(123,185,241,0.03)" }}
          >
            <p className="text-xl md:text-2xl font-semibold text-white italic leading-relaxed">
              "Business owners don't want marketing. They want growth they can measure."
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 6. Services ─── */
function Services() {
  const services = [
    { title: "Growth Strategy", desc: "For SMBs, service businesses, agencies, and early-stage founders" },
    { title: "Lead Generation Systems", desc: "That attract the right clients, not just any clients" },
    { title: "Marketing Accountability", desc: "Every strategy comes with metrics that prove it's working" },
    { title: "Founder Coaching", desc: "For businesses in the 0-5 year growth phase" },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">What I Build</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="glass-card p-8 h-full">
                <GeoAccent type={i} className="mb-4 block" />
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#96989D] leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Lead Magnet ─── */
function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative py-24 md:py-32 bg-[#172a40]">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      {/* Glowing orb accent */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-72 h-72 rounded-full bg-[#7BB9F1]/8 blur-[100px] animate-pulse-glow pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-4">Free resource</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Not Ready to Talk Yet? Start Here.</h2>
            <p className="text-[#96989D] text-lg mb-2 font-semibold">The 5-Question Business Growth Audit</p>
            <p className="text-[#96989D] mb-10 leading-relaxed">
              Diagnose where growth is leaking in your business. Score yourself across five commercial growth levers and find out which one needs fixing first.
            </p>
          </Reveal>

          {!submitted ? (
            <Reveal delay={100}>
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-[#96989D]/60 focus:outline-none focus:border-[#7BB9F1]/40 focus:ring-1 focus:ring-[#7BB9F1]/20 backdrop-blur-sm transition-all"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-[#96989D]/60 focus:outline-none focus:border-[#7BB9F1]/40 focus:ring-1 focus:ring-[#7BB9F1]/20 backdrop-blur-sm transition-all"
                />
                <button type="submit" className="glow-btn px-6 py-3.5 text-sm whitespace-nowrap">
                  Get the Free Audit
                </button>
              </form>
            </Reveal>
          ) : (
            <Reveal>
              <div className="glass-card p-8 max-w-md mx-auto text-center">
                <p className="text-[#7BB9F1] text-lg font-semibold mb-2">You're in!</p>
                <p className="text-[#96989D]">Check your inbox for the Growth Audit.</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── 8. Contact / CTA ─── */
function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={CTA_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F344F] via-[#1F344F]/70 to-[#1F344F]/90" />
      </div>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="container relative z-10 text-center">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#7BB9F1] mb-4">Get started</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Let's Talk Growth</h2>
          <p className="text-[#96989D] text-lg mb-10">Book a free 30-minute discovery call. No pitch, no pressure.</p>
        </Reveal>
        <Reveal delay={100}>
          <a href="mailto:aj@commercialgrowth.com.au" className="glow-btn inline-block px-10 py-5 text-lg mb-8">
            Book a Discovery Call
          </a>
          <div className="flex flex-col items-center gap-2 text-[#96989D]">
            <a href="mailto:aj@commercialgrowth.com.au" className="hover:text-[#7BB9F1] transition-colors">
              aj@commercialgrowth.com.au
            </a>
            <span>Sydney, Australia</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 9. Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#96989D]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">Commercial<span className="text-[#7BB9F1]">Growth</span></span>
          <span className="hidden sm:inline">|</span>
          <span>Data-led decisions. Proven results.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <span>&copy; 2026 Commercial Growth</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#1F344F]">
      <StickyNav />
      <Hero />
      <PainPoints />
      <Blueprint />
      <WhoIWorkWith />
      <Credibility />
      <Services />
      <LeadMagnet />
      <Contact />
      <Footer />
    </div>
  );
}
