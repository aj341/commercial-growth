import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488533278/Vr2TGVp28Rc8GfDRVCESuq/hero-bg-LW6pcJwJAEpB3bycpWfFQU.webp";
const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488533278/Vr2TGVp28Rc8GfDRVCESuq/cta-bg-C4gzBzGAyhe5p3ho2SxEaL.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488533278/Vr2TGVp28Rc8GfDRVCESuq/commercial-growth-logo_17e19301.png";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useScrollReveal(0.12);
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ["blueprint", "who", "about", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) { setActive(id); return; }
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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ background: scrolled ? "rgba(15,22,35,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent" }}>
      <div className="container flex items-center justify-between" style={{ height: 72 }}>
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img src={LOGO} alt="Commercial Growth" className="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-sm font-medium transition-colors duration-200" style={{ color: active === l.id ? "#3BB9F5" : "#9CA3AF" }}>{l.label}</a>
          ))}
          <a href="#contact" className="nav-cta">Book a Call</a>
        </div>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-[#0F1623]/95 backdrop-blur-xl border-t border-white/5 py-4">
          <div className="container flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2" style={{ color: active === l.id ? "#3BB9F5" : "#9CA3AF" }}>{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary text-center text-sm py-2.5">Book a Call</a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1623]/70 via-[#0F1623]/40 to-[#0F1623]" />
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-[#3BB9F5]/8 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full bg-[#3BB9F5]/6 blur-3xl animate-float-slower" />
      </div>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          <p className="mb-6" style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.18em", color: "#3BB9F5", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.1s" }}>Data-led decisions. Proven results.</p>
          <h1 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", lineHeight: 1.07, letterSpacing: "-0.02em", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s" }}>
            Growth You<br />Can Measure
          </h1>
          <p className="text-[#6B7280] max-w-xl mb-10" style={{ fontSize: "1.05rem", lineHeight: 1.7, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.5s" }}>
            Strategies built around commercial outcomes, where every dollar spent has a justifiable expected return.
          </p>
          <div className="flex flex-wrap gap-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s ease 0.7s" }}>
            <a href="#contact" className="btn-primary">Book a Discovery Call</a>
            <a href="#blueprint" className="btn-outline-dark">See How It Works</a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#3BB9F5] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function PainPoints() {
  const pains = [
    { title: "Your marketing spend can't prove its ROI", icon: "clipboard" },
    { title: "You've been sold generic strategies that weren't built for your business", icon: "search" },
    { title: "You know growth is possible but can't pinpoint what's holding you back", icon: "chart" },
  ];
  const icons: Record<string, React.ReactNode> = {
    clipboard: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#3BB9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 12h4M9 15h5" /></svg>,
    search: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#3BB9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
    chart: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#3BB9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 3 5-6 4 4" /><line x1="3" y1="20" x2="21" y2="20" /></svg>,
  };
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.18em] mb-4" style={{ fontSize: "0.72rem" }}>The problem</p>
          <h2 className="font-extrabold text-white mb-16" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>Sound Familiar?</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="glass-card p-8 h-full flex flex-col gap-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,185,245,0.1)" }}>{icons[p.icon]}</div>
                <p className="text-lg font-medium text-white/90 leading-relaxed">{p.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const phaseData = [
  {
    num: "1", eye: "Phase 01", title: "Diagnose and Blueprint",
    desc: "Audit systems and workflows to find leakage, bottlenecks, and the fastest path to growth.",
    steps: [
      { name: "End-to-End System Audit", sub: "Technology, data and workflow review" },
      { name: "Leakage and Bottleneck ID", sub: "Where opportunities are being lost" },
      { name: "Strategic Growth Mapping", sub: "Custom plan built to your goals" },
      { name: "Competitive Landscape Analysis", sub: "Pinpoint your unique market position" },
    ],
  },
  {
    num: "2", eye: "Phase 02", title: "Build and Implement",
    desc: "Install CRM, automation, and tracking to build a scalable, measurable growth engine.",
    steps: [
      { name: "CRM and Tracking Installation", sub: "Fully measurable campaign activity" },
      { name: "Workflow Automation", sub: "Email sequences and lead routing" },
      { name: "Conversion Optimisation", sub: "Landing pages that convert prospects" },
      { name: "Team Training and Handover", sub: "Your team confident with new systems" },
    ],
  },
  {
    num: "3", eye: "Phase 03", title: "Test and Scale",
    desc: "Run controlled tests, optimise performance, and lock in cost benchmarks before scaling.",
    steps: [
      { name: "Controlled Acquisition Testing", sub: "Real performance under real conditions" },
      { name: "Performance Optimisation", sub: "Scale only what works, cut what doesn't" },
      { name: "Benchmark Establishment", sub: "Precise ROI and efficiency metrics locked in" },
      { name: "Advanced Reporting and Scaling", sub: "Full funnel visibility as you grow" },
    ],
  },
];

const sIcons = [
  <svg key="a" viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#3BB9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h4M9 15h5"/></svg>,
  <svg key="b" viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#3BB9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  <svg key="c" viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#3BB9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l5-5 4 3 5-6 4 4"/><line x1="3" y1="20" x2="21" y2="20"/></svg>,
  <svg key="d" viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="#3BB9F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
];

function Blueprint() {
  const [cur, setCur] = useState(0);
  const touchRef = useRef(0);
  const goTo = useCallback((n: number) => setCur(((n % 3) + 3) % 3), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(cur + 1);
      if (e.key === "ArrowLeft") goTo(cur - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cur, goTo]);

  const getState = (i: number) => {
    if (i === cur) return "active";
    if (i === ((cur - 1 + 3) % 3)) return "left";
    if (i === ((cur + 1) % 3)) return "right";
    return "hidden";
  };

  const cardStyle = (state: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute", left: "50%", top: 0,
      width: "clamp(260px, 38vw, 340px)", height: 460,
      marginLeft: "clamp(-130px, -19vw, -170px)",
      background: "#1A2235", borderRadius: 20,
      padding: "24px 20px 20px", display: "flex", flexDirection: "column", gap: 9,
      overflow: "hidden", cursor: "pointer",
      transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.65s ease, border-color 0.4s ease, box-shadow 0.4s ease",
      willChange: "transform, opacity",
    };
    if (state === "active") return { ...base, transform: "translateX(0) scale(1)", opacity: 1, zIndex: 3, border: "1px solid rgba(59,185,245,0.5)", boxShadow: "0 0 60px rgba(59,185,245,0.18), 0 20px 50px rgba(0,0,0,0.5)" };
    if (state === "left") return { ...base, transform: "translateX(-74%) scale(0.82)", opacity: 0.35, zIndex: 2, border: "1px solid rgba(255,255,255,0.08)" };
    if (state === "right") return { ...base, transform: "translateX(74%) scale(0.82)", opacity: 0.35, zIndex: 2, border: "1px solid rgba(255,255,255,0.08)" };
    return { ...base, transform: "translateX(0) scale(0.7)", opacity: 0, zIndex: 1, pointerEvents: "none", border: "1px solid rgba(255,255,255,0.08)" };
  };

  return (
    <section id="blueprint" className="relative py-24 md:py-32 bg-[#0F1623]"
      onTouchStart={(e) => { touchRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const d = touchRef.current - e.changedTouches[0].clientX; if (Math.abs(d) > 40) { d > 0 ? goTo(cur + 1) : goTo(cur - 1); } }}>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.18em] mb-2" style={{ fontSize: "0.67rem" }}>3-Phase Framework</p>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(1.6rem, 5vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}>
              The Commercial Growth <span className="text-[#3BB9F5]">Blueprint</span>
            </h2>
            <p className="text-white/40 mt-1" style={{ fontSize: "0.82rem" }}>Data-led decisions. Proven results.</p>
          </div>
        </Reveal>
        <div className="relative mx-auto overflow-visible" style={{ height: 460, maxWidth: 900 }}>
          {phaseData.map((phase, i) => (
            <div key={i} onClick={() => goTo(i)} style={cardStyle(getState(i))}>
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,185,245,0.12) 0%, transparent 70%)" }} />
              <div className="absolute top-4 right-4 font-black text-[#3BB9F5] pointer-events-none select-none" style={{ fontSize: "5rem", lineHeight: 1, letterSpacing: "-0.04em" }}>{phase.num}</div>
              <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.18em] relative z-10" style={{ fontSize: "0.6rem", paddingRight: "18%" }}>{phase.eye}</p>
              <h3 className="font-extrabold text-white relative z-10" style={{ fontSize: "1.15rem", lineHeight: 1.15, letterSpacing: "-0.02em", paddingRight: "18%" }}>{phase.title}</h3>
              <p className="text-white/45 relative z-10" style={{ fontSize: "0.68rem", lineHeight: 1.55, paddingRight: "18%", marginTop: 2 }}>{phase.desc}</p>
              <div className="flex flex-col gap-1.5 mt-1 flex-1">
                {phase.steps.map((step, j) => (
                  <div key={j} className="flex items-center gap-2.5 bg-white rounded-lg flex-1" style={{ padding: "8px 10px" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(59,185,245,0.1)" }}>{sIcons[j]}</div>
                    <div>
                      <p className="font-semibold text-[#111827]" style={{ fontSize: "0.66rem", lineHeight: 1.25 }}>{step.name}</p>
                      <p className="text-[#6B7280]" style={{ fontSize: "0.58rem", lineHeight: 1.3, marginTop: 1 }}>{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 mb-4">
          <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.15em]" style={{ fontSize: "0.62rem" }}>{phaseData[cur].eye}</p>
          <p className="font-extrabold text-white" style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}>{phaseData[cur].title}</p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button onClick={() => goTo(cur - 1)} className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-[#3BB9F5] hover:border-[#3BB9F5] hover:text-[#0F1623] text-white transition-all duration-200">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="flex gap-2 items-center">
            {[0, 1, 2].map((n) => (
              <button key={n} onClick={() => goTo(n)} className="transition-all duration-300 border-none" style={{ width: cur === n ? 22 : 8, height: 8, borderRadius: cur === n ? 4 : "50%", background: cur === n ? "#3BB9F5" : "rgba(255,255,255,0.18)", boxShadow: cur === n ? "0 0 8px rgba(59,185,245,0.5)" : "none" }} />
            ))}
          </div>
          <button onClick={() => goTo(cur + 1)} className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-[#3BB9F5] hover:border-[#3BB9F5] hover:text-[#0F1623] text-white transition-all duration-200">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function WhoIWorkWith() {
  const segments = [
    { title: "Franchise Groups", desc: "Scaling from 3 locations to 40+ with systems that actually work." },
    { title: "B2B Services", desc: "Professional services firms looking to build predictable pipelines." },
    { title: "Scaling SMEs", desc: "Businesses doing $1M-$20M ready to break through their growth ceiling." },
    { title: "PE-Backed Companies", desc: "Portfolio companies needing commercial acceleration on a timeline." },
  ];
  return (
    <section id="who" className="relative py-24 md:py-32 bg-[#0F1623]">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.18em] mb-4" style={{ fontSize: "0.72rem" }}>Who this is for</p>
          <h2 className="font-extrabold text-white mb-16" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>Who I Work With</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {segments.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="mini-card flex flex-col gap-3 h-full">
                <h3 className="text-white font-bold text-base">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credibility() {
  const { ref, isVisible } = useScrollReveal(0.2);
  const franchisees = useCountUp(40, 2200, isVisible);
  const settlements = useCountUp(8, 2400, isVisible);
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#1A2235]">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10" ref={ref}>
        <Reveal>
          <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.18em] mb-4 text-center" style={{ fontSize: "0.72rem" }}>Track Record</p>
          <h2 className="font-extrabold text-white mb-16 text-center" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>Results That Speak</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid grid-cols-3 gap-6 md:gap-12 mb-16">
            <div className="text-center">
              <p className="font-black text-white" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}>{franchisees}+</p>
              <p className="text-white/50 mt-2" style={{ fontSize: "0.8rem" }}>3 to 40+ Franchisees</p>
            </div>
            <div className="text-center">
              <p className="font-black text-white" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}>${settlements}B</p>
              <p className="text-white/50 mt-2" style={{ fontSize: "0.8rem" }}>$500K to $8B in Settlements</p>
            </div>
            <div className="text-center">
              <p className="font-black text-white" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}>Under <span className="text-[#3BB9F5]">4</span></p>
              <p className="text-white/50 mt-2" style={{ fontSize: "0.8rem" }}>Years Timeframe</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/70 leading-relaxed" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
              AJ Kavanagh has spent over a decade in commercial growth, working with franchise groups, PE-backed companies, and scaling SMEs. Every engagement starts with data, ends with measurable outcomes, and is built around your specific commercial reality.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: "Growth Strategy", desc: "End-to-end commercial strategy built around your numbers, not theory." },
    { title: "CRM and Sales Systems", desc: "Install and optimise the systems that turn leads into revenue." },
    { title: "Paid Acquisition", desc: "Data-led paid media that proves ROI at every stage of the funnel." },
    { title: "Analytics and Reporting", desc: "Dashboards and frameworks that give you full funnel visibility." },
    { title: "Conversion Optimisation", desc: "Landing pages, funnels, and touchpoints engineered to convert." },
    { title: "Team Enablement", desc: "Train your team to own and scale the systems we build together." },
  ];
  return (
    <section className="relative py-24 md:py-32 bg-[#0F1623]">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10">
        <Reveal>
          <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.18em] mb-4" style={{ fontSize: "0.72rem" }}>What we do</p>
          <h2 className="font-extrabold text-white mb-16" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>Services</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="glass-card p-7 h-full flex flex-col gap-3">
                <h3 className="text-white font-bold text-base">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="relative py-24 md:py-32" style={{ background: "linear-gradient(135deg, #1A9EDE 0%, #3BB9F5 60%, #5CC8F8 100%)" }}>
      <div className="container relative z-10 text-center">
        <Reveal>
          <p className="text-white/80 font-bold uppercase tracking-[0.18em] mb-4" style={{ fontSize: "0.72rem" }}>Free Resource</p>
          <h2 className="font-extrabold text-white mb-4" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>Not Ready to Talk Yet? Start Here.</h2>
          <h3 className="text-white/80 font-semibold mb-4" style={{ fontSize: "1.1rem" }}>The 5-Question Business Growth Audit</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-10" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
            Diagnose where growth is leaking in your business. Score yourself across five commercial growth levers and find out which one needs fixing first.
          </p>
        </Reveal>
        {!submitted ? (
          <Reveal delay={100}>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input type="text" placeholder="Your name" required className="flex-1 px-4 py-3 rounded-lg border-none text-sm text-[#111827] placeholder-[#9CA3AF] outline-none" style={{ fontFamily: "'Poppins', sans-serif" }} />
              <input type="email" placeholder="Your email" required className="flex-1 px-4 py-3 rounded-lg border-none text-sm text-[#111827] placeholder-[#9CA3AF] outline-none" style={{ fontFamily: "'Poppins', sans-serif" }} />
              <button type="submit" className="px-6 py-3 rounded-lg font-bold text-sm text-white whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#0F1623", fontFamily: "'Poppins', sans-serif" }}>Get the Free Audit</button>
            </form>
          </Reveal>
        ) : (
          <Reveal>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-white font-bold text-lg">Check your inbox!</p>
              <p className="text-white/80 text-sm mt-2">Your growth audit is on its way.</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0F1623] overflow-hidden">
      <div className="absolute inset-0">
        <img src={CTA_BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] via-[#0F1623]/60 to-[#0F1623]/80" />
      </div>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="container relative z-10 text-center">
        <Reveal>
          <p className="text-[#3BB9F5] font-bold uppercase tracking-[0.18em] mb-4" style={{ fontSize: "0.72rem" }}>Get Started</p>
          <h2 className="font-extrabold text-white mb-6" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>Let's Talk Growth</h2>
          <p className="text-white/60 max-w-md mx-auto mb-10" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            Book a free 30-minute discovery call. No pitch, no pressure.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <a href="#contact" className="btn-primary text-base px-8 py-4">Book a Discovery Call</a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/7 bg-[#0F1623]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-2">
          <img src={LOGO} alt="Commercial Growth" className="h-7 w-auto" />
        </a>
        <div className="flex items-center gap-6">
          <a href="#blueprint" className="text-white/50 text-sm hover:text-[#3BB9F5] transition-colors">How It Works</a>
          <a href="#who" className="text-white/50 text-sm hover:text-[#3BB9F5] transition-colors">Who I Help</a>
          <a href="#about" className="text-white/50 text-sm hover:text-[#3BB9F5] transition-colors">About</a>
          <a href="#contact" className="text-white/50 text-sm hover:text-[#3BB9F5] transition-colors">Contact</a>
        </div>
        <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} Commercial Growth. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
