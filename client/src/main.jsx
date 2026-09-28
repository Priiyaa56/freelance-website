import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Admin from "./Admin.jsx";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import "./styles.css";

const SITE = {
  name: "Priya H.",
  email: "your-email@example.com",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/Priiyaa56",
};

const services = [
  {
    icon: Globe2,
    title: "Business Websites",
    text: "Professional, responsive websites that present your business clearly and make it easy for visitors to take the next step.",
  },
  {
    icon: Layers3,
    title: "Landing Pages",
    text: "Focused pages for products, services, campaigns and startups with clear messaging and strong calls to action.",
  },
  {
    icon: Code2,
    title: "React Websites",
    text: "Custom React interfaces with reusable components, responsive layouts and polished interactions.",
  },
  {
    icon: Sparkles,
    title: "API & AI Integration",
    text: "Practical integrations that connect your website to APIs, data and AI-powered features when they add real value.",
  },
];

const projects = [
  {
    slug: "leadflow-ai",
    number: "01",
    title: "LeadFlow AI",
    category: "AI-powered business workflow",
    description:
      "An AI-powered lead management platform designed to help businesses analyze leads, prioritize opportunities and organize follow-ups.",
    tags: ["React", "Express", "Gemini API", "Supabase"],
    live: "https://client-delta-five-29.vercel.app/",
    source: "https://github.com/Priiyaa56/leadflow-ai",
    visual: "leadflow",
    image: "/projects/leadflow.png",
    featured: true,
    details: [
      "Lead analysis and scoring workflow",
      "AI-generated follow-up recommendations",
      "Task and activity organization",
      "Supabase-backed data flow",
    ],
  },
  {
    slug: "careerbridge",
    number: "02",
    title: "CareerBridge",
    category: "Job portal",
    description:
      "A responsive job portal interface for discovering jobs, viewing details and exploring candidate and employer workflows.",
    tags: ["React", "Vite", "JavaScript", "Responsive UI"],
    live: "https://job-portal-react-kappa.vercel.app/",
    source: "https://github.com/Priiyaa56/Job-portal-react",
    visual: "jobs",
    image: "/projects/boj.png",
    details: [
      "Responsive job discovery interface",
      "Search and listing experiences",
      "Candidate and employer-oriented flows",
    ],
  },
  {
    slug: "future-os",
    number: "03",
    title: "FutureOS",
    category: "AI-powered career guidance",
    description:
      "FutureOS is a modern AI-powered career guidance platform that helps students and aspiring developers explore career paths, follow structured roadmaps, and prepare for placements through an interactive and responsive interface.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
    live: "https://future-os-ye54-lrhbe8u29-priya-futureos.vercel.app/",
    source: "https://github.com/Priiyaa56/Future-_Os",
    visual: "future-os",
    image: "/projects/futu.png",
    details: [
      "AI Mentor section",
      "Career roadmaps",
      "Step-by-step learning guidance",
      "Modern responsive interface",
      "Smooth animations",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    text: "We clarify your goals, audience, pages, features and the action you want visitors to take.",
  },
  {
    number: "02",
    title: "Plan",
    text: "We define the structure, content direction and functionality before development begins.",
  },
  {
    number: "03",
    title: "Build",
    text: "I turn the plan into a responsive website and keep you updated as the project moves forward.",
  },
  {
    number: "04",
    title: "Launch",
    text: "We review the result, complete the agreed revisions, test it and prepare it for launch.",
  },
];

const projectTypes = [
  "Business website",
  "Landing page",
  "Portfolio / personal website",
  "Website redesign",
  "React website",
  "API / AI integration",
  "Other",
];

function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <button
      className="theme-toggle"
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle light and dark mode"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}
function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          o.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ "--delay": `${delay}ms` }}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Services", "#services"],
    ["Work", "#work"],
    ["About", "#about"],
    ["Process", "#process"],
  ];
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="logo" to="/" onClick={() => setOpen(false)}>
          <span>PH</span>
          <strong>Priya H.</strong>
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {nav.map(([label, href]) => (
            <a key={label} href={`/${href}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <ThemeToggle />
          <Link
            className="nav-button"
            to="/start-project"
            onClick={() => setOpen(false)}
          >
            Start a project <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ProjectVisual({ type, live }) {
  if (live)
    return (
      <div className={`live-preview ${type}-preview`}>
        <iframe
          src={live}
          title={`${type} live website preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
        <div className="preview-shade" />
        <div className="preview-label">
          <span>Live UI preview</span>
          <ExternalLink size={13} />
        </div>
      </div>
    );
  return (
    <div className="mockup portfolio-mock">
      <div className="port-top">
        <strong>Portfolio</strong>
        <span>About</span>
        <span>Work</span>
        <span>Contact</span>
      </div>
      <div className="port-hero">
        <small>CREATIVE DEVELOPER</small>
        <b>Designing ideas into digital experiences.</b>
        <div className="port-line" />
      </div>
      <div className="port-blocks">
        <i />
        <i />
      </div>
    </div>
  );
}

const heroProjects = [
  {
    key: "leadflow",
    title: "LeadFlow AI",
    label: "AI + WORKFLOW",
    short: "Lead management",
    url: "https://client-delta-five-29.vercel.app/",
    accent: "peach",
  },
  {
    key: "jobs",
    title: "CareerBridge",
    label: "JOB PORTAL",
    short: "Find your next role",
    url: "https://job-portal-react-kappa.vercel.app/",
    accent: "sage",
  },
  {
    key: "movie",
    title: "Movie Website",
    label: "ENTERTAINMENT",
    short: "Browse. Discover. Watch.",
    url: "https://web-movie-beta.vercel.app/",
    accent: "plum",
  },
];

function HeroWorkspace() {
  const [active, setActive] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = React.useRef(null);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 10 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="hero-workspace"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="workspace-glow"
        style={{
          transform: `translate3d(${tilt.y * 0.8}px, ${tilt.x * 0.8}px, 0)`,
        }}
      />
      <div className="workspace-orbit orbit-one" />
      <div className="workspace-orbit orbit-two" />

      <div
        className="workspace-scene"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {heroProjects.map((project, index) => (
          <a
            key={project.key}
            className={`project-float-card ${project.key}-card ${active === project.key ? "is-active" : ""}`}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setActive(project.key)}
            onFocus={() => setActive(project.key)}
            onMouseLeave={() => setActive(null)}
            aria-label={`Open ${project.title} live website`}
          >
            <div className="project-card-browser">
              <span />
              <span />
              <span />
              <small>live</small>
            </div>
            <div className={`mini-site ${project.accent}`}>
              <b>
                {project.key === "leadflow"
                  ? "LF"
                  : project.key === "jobs"
                    ? "CB"
                    : "MV"}
              </b>
              <div className="mini-lines">
                <i />
                <i />
                <i />
              </div>
              <strong>{project.short}</strong>
              <span className="mini-link">
                Open <ArrowUpRight size={11} />
              </span>
            </div>
            <div className="project-card-caption">
              <span>{project.label}</span>
              <strong>{project.title}</strong>
            </div>
          </a>
        ))}

        <div className="cartoon-person" aria-hidden="true">
          <div className="character-shadow" />
          <div className="character-body">
            <div className="character-neck" />
            <div className="character-head">
              <div className="character-hair" />
              <span className="eye eye-left" />
              <span className="eye eye-right" />
              <span className="character-smile" />
            </div>
            <div className="character-shirt">
              <span>PH</span>
            </div>
            <div className="character-arm arm-left" />
            <div className="character-arm arm-right" />
            <div className="character-laptop">
              <div className="laptop-screen">
                <div className="laptop-dot" />
                <div className="laptop-lines">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="laptop-base" />
            </div>
            <div className="character-leg leg-left" />
            <div className="character-leg leg-right" />
          </div>
        </div>
      </div>

      <div className="workspace-label label-top">
        <Sparkles size={13} />
        <span>Built with curiosity</span>
      </div>
      <div className="workspace-label label-bottom">
        <span>Click a project to explore</span>
        <ArrowUpRight size={13} />
      </div>
    </div>
  );
}

const ABOUT_CHARACTERS = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    title: "WEB DESIGN",
    subtitle: "Modern digital experiences",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    title: "REACT",
    subtitle: "Interactive web interfaces",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    title: "AI INTEGRATION",
    subtitle: "Smarter web experiences",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    title: "RESPONSIVE",
    subtitle: "Built for every screen",
  },
];

function About3DCharacter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    ABOUT_CHARACTERS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);

      setActiveIndex((current) => (current + 1) % ABOUT_CHARACTERS.length);

      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const navigate = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setActiveIndex((current) =>
      direction === "next"
        ? (current + 1) % ABOUT_CHARACTERS.length
        : (current + ABOUT_CHARACTERS.length - 1) % ABOUT_CHARACTERS.length,
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getRole = (index) => {
    const center = activeIndex;
    const left =
      (activeIndex + ABOUT_CHARACTERS.length - 1) % ABOUT_CHARACTERS.length;
    const right = (activeIndex + 1) % ABOUT_CHARACTERS.length;
    const back = (activeIndex + 2) % ABOUT_CHARACTERS.length;

    if (index === center) return "center";
    if (index === left) return "left";
    if (index === right) return "right";
    if (index === back) return "back";

    return "hidden";
  };

  return (
    <div className="about-3d-panel">
      <div className="about-ghost-text">BUILD</div>

      <div className="about-3d-top">
        <span>MY APPROACH</span>
        <span>01 — 04</span>
      </div>

      <div className="about-character-stage">
        {ABOUT_CHARACTERS.map((item, index) => {
          const role = getRole(index);

          return (
            <div key={item.src} className={`about-character-slide ${role}`}>
              <img src={item.src} alt={item.title} draggable="false" />
            </div>
          );
        })}
      </div>

      <div className="about-character-info">
        <div>
          <strong>{ABOUT_CHARACTERS[activeIndex].title}</strong>
          <span>{ABOUT_CHARACTERS[activeIndex].subtitle}</span>
        </div>

        <div className="about-character-controls">
          <button
            type="button"
            onClick={() => navigate("prev")}
            aria-label="Previous character"
          >
            <ArrowLeft size={19} strokeWidth={2.2} />
          </button>

          <button
            type="button"
            onClick={() => navigate("next")}
            aria-label="Next character"
          >
            <ArrowRight size={19} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="about-character-dots">
        {ABOUT_CHARACTERS.map((_, index) => (
          <span key={index} className={index === activeIndex ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="container hero-inner">
            <Reveal className="hero-content">
              <div className="availability">
                <span /> Available for freelance projects
              </div>
              <p className="kicker">FREELANCE WEB DEVELOPER</p>
              <h1>
                I turn ideas into <span>modern websites</span> that make a
                strong impression.
              </h1>
              <p className="hero-description">
                I build clean, responsive digital experiences for businesses,
                creators and anyone who needs a website that works beautifully
                across devices.
              </p>
              <div className="hero-buttons">
                <Link className="button dark" to="/start-project">
                  Start a project <ArrowUpRight size={18} />
                </Link>
                <a className="button outline" href="#work">
                  View my work <ArrowDown size={17} />
                </a>
              </div>
              <div className="hero-meta">
                <span>React</span>
                <b />
                <span>JavaScript</span>
                <b />
                <span>Responsive Design</span>
                <b />
                <span>AI Integration</span>
              </div>
            </Reveal>
            <Reveal className="hero-art" delay={120}>
              <HeroWorkspace />
            </Reveal>
          </div>
          <a className="scroll-hint" href="#services">
            <span>Scroll to explore</span>
            <ArrowDown size={16} />
          </a>
        </section>

        <section id="services" className="section">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <p className="kicker">WHAT I CAN BUILD</p>
                <h2>
                  Websites designed around <em>your goals.</em>
                </h2>
              </div>
              <p className="heading-text">
                Whether you need a first online presence or a better version of
                an existing site, I focus on clear structure, responsive design
                and a smooth visitor experience.
              </p>
            </Reveal>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, text }, i) => (
                <Reveal className="service-card" key={title} delay={i * 60}>
                  <div className="service-icon">
                    <Icon size={21} />
                  </div>
                  <span className="service-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link to="/start-project">
                    Discuss this <ArrowUpRight size={15} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="container">
            <Reveal className="section-heading work-heading">
              <div>
                <p className="kicker">SELECTED WORK</p>
                <h2>
                  A few things I've <em>built.</em>
                </h2>
              </div>
              <a
                className="simple-link"
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
              >
                View GitHub <ArrowUpRight size={16} />
              </a>
            </Reveal>
            <div className="projects">
              {projects.map((p, i) => (
                <Reveal
                  className={`project-card ${p.featured ? "featured" : ""}`}
                  key={p.slug}
                  delay={i * 50}
                >
                  <div className="project-visual-link">
                    <div className="project-visual">
                      <div className="project-topline">
                        <span>{p.number}</span>
                        <span>{p.category}</span>
                      </div>
                      <div className="project-image">
                        <img
                          src={p.image}
                          alt={`${p.title} project screenshot`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="project-details">
                    <p className="project-category">{p.category}</p>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      <a href={p.live} target="_blank" rel="noreferrer">
                        Live demo <ExternalLink size={14} />
                      </a>
                      {p.source && (
                        <a href={p.source} target="_blank" rel="noreferrer">
                          GitHub Repo <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <Reveal className="about-character-column">
              <div className="about-title">
                <p className="kicker">ABOUT ME</p>

                <h2>
                  Frontend-focused. <em>Curious about more.</em>
                </h2>
              </div>

              <div className="about-character-wrapper">
                <About3DCharacter />
              </div>
            </Reveal>
            <Reveal className="about-content">
              <p className="about-lead">
                I'm a frontend-focused web developer who builds modern,
                responsive websites for businesses, creators and individuals.
              </p>
              <p>
                I work primarily with HTML, CSS, JavaScript and React, while
                expanding my skills across full-stack development, APIs,
                databases and AI-powered web experiences.
              </p>
              <p>
                I'm also pursuing a B.Tech in Computer Science. For freelance
                projects, my focus is simple: understand the goal, build what is
                actually needed, communicate clearly and deliver a website that
                feels finished.
              </p>
              <div className="skill-list">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "Vite",
                  "Git & GitHub",
                  "REST APIs",
                  "Supabase",
                  "Node / Express",
                  "Gemini API",
                ].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="container">
            <Reveal className="section-heading">
              <div>
                <p className="kicker">THE PROCESS</p>
                <h2>
                  Simple from first message <em>to launch.</em>
                </h2>
              </div>
              <p className="heading-text">
                A clear process keeps the project focused and avoids surprises.
              </p>
            </Reveal>
            <div className="process-grid">
              {process.map((item, i) => (
                <Reveal
                  className="process-card"
                  key={item.number}
                  delay={i * 60}
                >
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterCTA />
    </>
  );
}

function FooterCTA() {
  return (
    <section className="contact-section">
      <div className="container cta-inner">
        <div>
          <p className="kicker">START A PROJECT</p>
          <h2>
            Have an idea? <em>Let's build it.</em>
          </h2>
          <p>
            Tell me what you are looking to build and I'll get back to you with
            the next steps.
          </p>
        </div>
        <Link className="button light" to="/start-project">
          Tell me about your project <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <main className="inner-page">
      <div className="container">
        <Link className="back-link" to="/#work">
          <ArrowLeft size={15} /> Back to work
        </Link>
        <Reveal className="case-hero">
          <p className="kicker">{project.category}</p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Reveal>
        <Reveal className="case-visual">
          <ProjectVisual type={project.visual} live={project.live} />
        </Reveal>
        <div className="case-grid">
          <Reveal>
            <p className="kicker">PROJECT DETAILS</p>
            <h2>
              Built with a focus on <em>useful experiences.</em>
            </h2>
          </Reveal>
          <Reveal>
            <ul className="detail-list">
              {project.details.map((d) => (
                <li key={d}>
                  <Check size={16} />
                  {d}
                </li>
              ))}
            </ul>
            <div className="case-actions">
              <a
                className="button dark"
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                Open live demo <ExternalLink size={16} />
              </a>
              {project.source && (
                <a
                  className="button outline"
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

function StartProject() {
  const [submitting, setSubmitting] = useState(false),
    [sent, setSent] = useState(false),
    [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Business website",
    timeline: "",
    budget: "",
    message: "",
  });
  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setSent(false);
    setError("");
  };
  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSent(false);
    setError("");
    try {
      const r = await fetch(`${SITE.apiUrl}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || "Unable to send your inquiry.");
      setSent(true);
      setForm({
        name: "",
        email: "",
        company: "",
        projectType: "Business website",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className="inner-page inquiry-page">
      <div className="container inquiry-grid">
        <Reveal className="inquiry-copy">
          <Link className="back-link" to="/">
            <ArrowLeft size={15} /> Back home
          </Link>
          <p className="kicker">START A PROJECT</p>
          <h1>
            Let's turn your idea into <em>something real.</em>
          </h1>
          <p>
            Share a few details about your project. You don't need to have
            everything figured out — a rough idea is enough to start the
            conversation.
          </p>
          <div className="inquiry-notes">
            <div>
              <span>01</span>
              <p>Tell me what you need</p>
            </div>
            <div>
              <span>02</span>
              <p>I'll understand the scope</p>
            </div>
            <div>
              <span>03</span>
              <p>We'll discuss the next step</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="form-panel" delay={100}>
          <form onSubmit={submit} className="contact-form">
            <div className="form-row">
              <label>
                Name *
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                />
              </label>
              <label>
                Email *
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Business / Company
                <input
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Company name"
                />
              </label>
              <label>
                Project type
                <select
                  value={form.projectType}
                  onChange={update("projectType")}
                >
                  {projectTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Budget
                <select value={form.budget} onChange={update("budget")}>
                  <option value="">Select a range</option>
                  <option>₹5k – ₹10k</option>
                  <option>₹10k – ₹25k</option>
                  <option>₹25k – ₹50k</option>
                  <option>₹50k+</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label>
                Preferred timeline
                <input
                  value={form.timeline || ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, timeline: e.target.value }))
                  }
                  placeholder="e.g. 3–4 weeks"
                />
              </label>
            </div>
            <label>
              Tell me about the project *
              <textarea
                required
                minLength="10"
                rows="7"
                value={form.message}
                onChange={update("message")}
                placeholder="What are you looking to build? What should the website help you achieve?"
              />
            </label>
            <button className="submit-button" disabled={submitting}>
              {submitting ? "Sending..." : "Send project inquiry"}{" "}
              <ArrowUpRight size={16} />
            </button>
            {sent && (
              <p className="form-note success">
                <Check size={14} /> Thanks — your inquiry has been received.
              </p>
            )}
            {error && <p className="form-note error">{error}</p>}
          </form>
        </Reveal>
      </div>
    </main>
  );
}
function NotFound() {
  return (
    <main className="inner-page">
      <div className="container not-found">
        <p className="kicker">404</p>
        <h1>Page not found.</h1>
        <Link className="button dark" to="/">
          Back home <ArrowUpRight size={16} />
        </Link>
      </div>
    </main>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <Link className="logo" to="/">
          <span>PH</span>
          <strong>Priya H.</strong>
        </Link>
        <span>© {new Date().getFullYear()} Priya H.</span>
        <a href={SITE.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-project" element={<StartProject />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
