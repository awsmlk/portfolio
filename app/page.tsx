"use client";

import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Project = {
  name: string;
  category: "Web Design" | "Applications" | "Machine Learning" | "Bots" | "Robotics";
  description: string;
  tech: string[];
  repo?: string;
  live?: string;
  mark: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "Minimalist Clothing Website",
    category: "Web Design",
    description: "A clean storefront concept that pairs calm editorial layouts with an easy product-browsing flow.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://awsmlk.github.io/ICT-Project-Clothing-Website/",
    mark: "MC",
    featured: true,
  },
  {
    name: "ATM Interface",
    category: "Applications",
    description: "A banking interface simulation that models secure account actions, balances, and transaction logic.",
    tech: ["C++", "App logic", "Banking simulation"],
    repo: "https://github.com/awsmlk/ATM-Banking-System",
    mark: "ATM",
    featured: true,
  },
  {
    name: "Server Response Time Prediction",
    category: "Machine Learning",
    description: "A regression project exploring how infrastructure inputs influence server response time.",
    tech: ["Python", "Machine Learning", "Regression"],
    repo: "https://github.com/awsmlk/server-response-prediction-multiple-linear-regression",
    mark: "ML",
    featured: true,
  },
  {
    name: "Sentiment Analyzer",
    category: "Machine Learning",
    description: "A text-analysis tool that classifies sentiment and turns raw language into a clear signal.",
    tech: ["Python", "NLP", "Sentiment analysis"],
    repo: "https://github.com/awsmlk/sentiment-analyzer",
    mark: "SA",
  },
  {
    name: "Parking Management System",
    category: "Applications",
    description: "A system-design project for tracking parking availability, entries, and structured records.",
    tech: ["App logic", "Database", "System design"],
    mark: "PMS",
  },
  {
    name: "Discord Economy Bot",
    category: "Bots",
    description: "A community bot with economy mechanics designed around commands, balances, and playful progression.",
    tech: ["Node.js", "Discord.js"],
    mark: "DE",
  },
  {
    name: "Discord Quran Bot",
    category: "Bots",
    description: "A Discord bot focused on making Quran-related content accessible inside a community workflow.",
    tech: ["Node.js", "Discord.js"],
    mark: "DQ",
  },
  {
    name: "Discord Ticket Management Bot",
    category: "Bots",
    description: "A support-flow bot that helps servers organise tickets and route member requests clearly.",
    tech: ["Node.js", "Discord.js"],
    mark: "DT",
  },
  {
    name: "Discord Verification Bot",
    category: "Bots",
    description: "A server utility for guiding verification steps and keeping community access more intentional.",
    tech: ["Node.js", "Discord.js"],
    mark: "DV",
  },
  {
    name: "Discord Feature Testing & QA Bot",
    category: "Bots",
    description: "A controlled bot environment for trying new Discord features and testing interaction flows.",
    tech: ["Node.js", "Discord.js", "QA"],
    mark: "QA",
  },
  {
    name: "Discord Music Streaming Bot",
    category: "Bots",
    description: "A music-focused bot experiment built around commands, queues, and a social listening experience.",
    tech: ["Node.js", "Discord.js", "Audio"],
    mark: "DM",
  },
  {
    name: "Discord 24/7 Audio Bot",
    category: "Bots",
    description: "A persistent audio bot concept for voice channels that need an always-on ambient stream.",
    tech: ["Node.js", "Discord.js", "Voice"],
    mark: "24",
  },
  {
    name: "Line Following Robot",
    category: "Robotics",
    description: "A sensor-driven robot that reads a path and adapts its movement to stay on course.",
    tech: ["Arduino", "Sensors", "Robotics"],
    mark: "LF",
  },
  {
    name: "Maze Solving Robot",
    category: "Robotics",
    description: "A hands-on exploration of navigation, sensing, and simple pathfinding in a maze environment.",
    tech: ["Arduino", "Sensors", "Pathfinding"],
    mark: "MZ",
  },
  {
    name: "Obstacle Avoidance Robot",
    category: "Robotics",
    description: "A mobile robot designed to detect nearby objects and choose a clear route in real time.",
    tech: ["Arduino", "Ultrasonic sensors", "Motors"],
    mark: "OA",
  },
  {
    name: "Firefighting Robot",
    category: "Robotics",
    description: "A robotics build that combines flame detection, motion, and response-focused hardware control.",
    tech: ["Arduino", "Flame sensor", "Motors"],
    mark: "FF",
  },
  {
    name: "Remote Control Robot (CODI Bot)",
    category: "Robotics",
    description: "A remote-operated robotics project exploring wireless control and dependable motor movement.",
    tech: ["Arduino", "Remote control", "Motors"],
    mark: "CB",
  },
  {
    name: "Mini Drone",
    category: "Robotics",
    description: "A compact flight project investigating the building blocks of stabilisation and control.",
    tech: ["Robotics", "Flight control", "Hardware"],
    mark: "MD",
  },
];

const skillGroups = [
  { title: "Languages", items: ["JavaScript", "Python", "C++", "HTML5", "CSS3", "LaTeX"] },
  { title: "Frameworks & libraries", items: ["Node.js", "Express.js", "Discord.js"] },
  { title: "Databases & platforms", items: ["MongoDB", "MySQL", "Microsoft Access", "Heroku", "Vercel", "Replit"] },
  { title: "Tools & hardware", items: ["Git", "GitHub", "VS Code", "Arduino", "Linux"] },
  { title: "Focus areas", items: ["Web Development", "Machine Learning", "Robotics", "APIs"] },
  { title: "Working style", items: ["Problem solving", "Attention to detail", "Communication", "Team collaboration", "Adaptability", "Continuous learning"] },
];

const categories = ["All", "Web Design", "Applications", "Machine Learning", "Bots", "Robotics"] as const;

function ExternalLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={primary ? "button button-primary" : "button button-secondary"}
    >
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("awais-theme") as "light" | "dark" | null;
    const nextTheme = storedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("awais-theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateTime = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        month: "short",
        day: "numeric",
      }).formatToParts(new Date());
      const lookup = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
      setTime(`${lookup("hour")}:${lookup("minute")} ${lookup("dayPeriod").toLowerCase()} · ${lookup("month")} ${lookup("day")}`);
    };

    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function switchCategory(category: (typeof categories)[number]) {
    setActiveCategory(category);
    setVisibleCount(6);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (String(formData.get("website") ?? "").trim()) return;
    setFormState("sending");

    try {
      const response = await fetch("https://formspree.io/f/xpqapyqj", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!response.ok) throw new Error("Form request failed");
      form.reset();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a href="#home" className="brand-mark" aria-label="Awais Malik home">AM<span>.</span></a>
        <nav className="top-links" aria-label="Desktop sections">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="top-actions">
          <a className="top-icon" href="https://github.com/awsmlk" target="_blank" rel="noopener noreferrer" aria-label="Awais Malik on GitHub">GH</a>
          <a className="top-icon" href="https://www.linkedin.com/in/awsmlk/" target="_blank" rel="noopener noreferrer" aria-label="Awais Malik on LinkedIn">in</a>
          <button className="theme-button" type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          </button>
        </div>
      </header>

      <section id="home" data-section className="hero section-pad">
        <div className="hero-grain" aria-hidden="true" />
        <p className="hello-note"><span aria-hidden="true">✦</span> Hello, world.</p>
        <div className="hero-meta" aria-label="Location and local time">
          <span>Islamabad, PK</span>
          <span>{time || "Loading time..."}</span>
        </div>

        {noticeOpen && (
          <aside className="launch-note" aria-label="Current focus">
            <Image src="/image0.jpg" alt="Awais Malik" width={56} height={56} unoptimized />
            <div>
              <p>Currently building useful things with code, AI, and robotics.</p>
              <div className="launch-actions">
                <button type="button" onClick={() => setNoticeOpen(false)}>Later</button>
                <a href="#contact">Let&apos;s connect</a>
              </div>
            </div>
          </aside>
        )}

        <div className="hero-copy">
          <p className="eyebrow">Software developer · AI & robotics enthusiast</p>
          <h1><span>AWAIS</span><em>MALIK</em></h1>
          <div className="tech-orbit tech-orbit-left" aria-hidden="true">JAVASCRIPT · PYTHON · C++ · HTML · CSS · APIs · ROBOTICS</div>
          <div className="tech-orbit tech-orbit-right" aria-hidden="true">NODE.JS · DISCORD.JS · MONGODB · ARDUINO · MACHINE LEARNING</div>
          <p className="hero-summary">Building thoughtful web experiences, community bots, and intelligent machines one project at a time.</p>
          <div className="hero-cta">
            <a className="button button-primary" href="/AWS-Resume.pdf" download>Download resume <span aria-hidden="true">↓</span></a>
            <a className="button button-secondary" href="#projects">Explore work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-grid" aria-hidden="true" />

        <div className="terminal-panel" aria-label="Developer terminal introduction">
          <div className="terminal-header"><span><i /> <i /> <i /></span><strong>awais@portfolio:~</strong><b>◐</b></div>
          <div className="terminal-body">
            <p><span className="terminal-user">awais@malik</span>:<span className="terminal-path">~</span>$ <span className="terminal-command">fortune focus</span></p>
            <p className="terminal-output">&gt; Build small. Learn fast. Ship useful things.</p>
          </div>
        </div>
      </section>

      <section id="about" data-section className="section-pad about-section">
        <div className="section-heading reveal">
          <p className="eyebrow">01 / About</p>
          <h2>A curious builder with a hardware heart.</h2>
        </div>
        <div className="about-layout">
          <div className="about-copy reveal">
            <p>Hi, I&apos;m Awais Malik, a computer science student and a developer with a passion for software engineering, artificial intelligence, and robotics.</p>
            <p>I enjoy building web applications, Discord bots, machine learning projects, and intelligent robotic systems. I love turning ideas into real-world solutions and continuously learning new technologies.</p>
            <div className="about-actions">
              <ExternalLink href="https://github.com/awsmlk" primary>GitHub profile</ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/awsmlk/">LinkedIn</ExternalLink>
            </div>
          </div>
          <div className="focus-board reveal" aria-label="Current focus areas">
            <p className="sticker sticker-yellow">web craft</p>
            <p className="sticker sticker-blue">backend & APIs</p>
            <p className="sticker sticker-green">AI & ML</p>
            <p className="sticker sticker-pink">robotics</p>
            <div className="focus-board-inner">
              <span>NOW EXPLORING</span>
              <strong>Software engineering through real, hands-on projects.</strong>
              <small>Web development / automation / intelligent systems</small>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" data-section className="section-pad projects-section dot-field">
        <div className="section-heading section-heading-wide reveal">
          <div>
            <p className="eyebrow">02 / Selected work</p>
            <h2>Projects with a point.</h2>
          </div>
          <p>A growing collection of software, machine-learning experiments, Discord bots, and robots that have helped shape how I build.</p>
        </div>

        <div className="featured-grid">
          {projects.filter((project) => project.featured).map((project) => (
            <article className="featured-card reveal" key={project.name}>
              <span className="project-mark">{project.mark}</span>
              <p className="card-kicker">Featured · {project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="chip-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <div className="project-links">
                {project.live && <ExternalLink href={project.live} primary>Live demo</ExternalLink>}
                {project.repo && <ExternalLink href={project.repo}>Repo</ExternalLink>}
              </div>
            </article>
          ))}
        </div>

        <div className="project-controls reveal" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "filter-button is-active" : "filter-button"}
              aria-pressed={activeCategory === category}
              onClick={() => switchCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="project-grid" aria-live="polite">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <article className="project-card reveal" key={project.name}>
              <div className="project-card-top"><span className="project-mark">{project.mark}</span><span className="category-label">{project.category}</span></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="chip-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <div className="project-links">
                {project.live && <ExternalLink href={project.live} primary>Live demo</ExternalLink>}
                {project.repo && <ExternalLink href={project.repo}>Repo</ExternalLink>}
                {!project.live && !project.repo && <span className="private-note">Project details are being prepared.</span>}
              </div>
            </article>
          ))}
        </div>
        {visibleCount < filteredProjects.length && (
          <button type="button" className="load-button reveal" onClick={() => setVisibleCount((count) => count + 6)}>Load more projects <span aria-hidden="true">+</span></button>
        )}
      </section>

      <section id="skills" data-section className="section-pad skills-section">
        <div className="section-heading reveal">
          <p className="eyebrow">03 / Skills</p>
          <h2>Tools are only useful when they help you make something real.</h2>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-card reveal" key={group.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <div className="chip-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" data-section className="section-pad experience-section">
        <div className="section-heading reveal">
          <p className="eyebrow">04 / Experience & learning</p>
          <h2>In motion since the first build.</h2>
        </div>
        <div className="timeline">
          <article className="timeline-item reveal"><span>2025 — 2029</span><div><p className="card-kicker">Education</p><h3>Bahria University <em>· BS Information Technology</em></h3><p>Pursuing IT with coursework and hands-on experience in software development, web technologies, databases, networking, and system design.</p></div></article>
          <article className="timeline-item reveal"><span>2020 — 2024</span><div><p className="card-kicker">Education</p><h3>Army Public School (APSACS) <em>· High School, Science</em></h3><p>Class Representative, Peace Keeper, Debate Club, Young Journalists Club, IKMC, Makerspace Skills Programme, badminton, chess, tree plantation, and clean water projects.</p></div></article>
          <article className="timeline-item reveal"><span>2020 — now</span><div><p className="card-kicker">Continuous learning</p><h3>Online Courses & Certifications <em>· Various platforms</em></h3><p>Building foundations through web development and programming courses from Coursera, Udemy, and freeCodeCamp.</p></div></article>
          <article className="timeline-item reveal"><span>2017 — 2019</span><div><p className="card-kicker">Hands-on robotics</p><h3>STEM & Robotics Workshops <em>· LearnOBots STEM Camp</em></h3><p>Completed robotics and STEM workshops, with practical experience in robot building and programming.</p></div></article>
          <article className="timeline-item reveal"><span>2016 — now</span><div><p className="card-kicker">Personal practice</p><h3>Self-taught Developer <em>· Personal Learning Journey</em></h3><p>Continuously learning through self-study, projects, documentation, and current technology trends.</p></div></article>
        </div>
      </section>

      <section className="section-pad building-section" aria-label="What Awais is currently building">
        <div className="building-terminal reveal">
          <div className="terminal-header"><span><i /> <i /> <i /></span><strong>current-focus.md</strong><b>◐</b></div>
          <div className="building-content">
            <p className="eyebrow">Currently learning / building</p>
            <h2>AI, robotics, and software engineering.</h2>
            <p>I&apos;m investing in the fundamentals that make an idea usable: clean systems, practical interfaces, intelligent automation, and experiments that leave the browser.</p>
            <a href="#contact" className="text-link">Build something together <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section id="contact" data-section className="section-pad contact-section">
        <div className="section-heading reveal">
          <p className="eyebrow">05 / Contact</p>
          <h2>Got a good idea? Let&apos;s give it momentum.</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-aside reveal">
            <Image src="/image0.jpg" alt="Awais Malik" width={92} height={92} unoptimized />
            <p>Based in Islamabad, Pakistan. Open to learning, collaborating, and building useful things with good people.</p>
            <a className="text-link" href="mailto:awsmlk@proton.me">awsmlk@proton.me <span aria-hidden="true">↗</span></a>
            <div className="social-row">
              <a href="https://github.com/awsmlk" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/awsmlk/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/awsmlks" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <iframe title="Map showing Islamabad, Pakistan" src="https://www.google.com/maps?q=Islamabad,+Pakistan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
            <label>Full name<input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
            <label>Message<textarea name="message" rows={6} required placeholder="Tell me a little about the idea..." /></label>
            <div className="honeypot" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
            <button className="button button-primary submit-button" type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Sending..." : "Send message"} <span aria-hidden="true">→</span></button>
            <p className={`form-message ${formState}`} aria-live="polite">{formState === "success" ? "Thanks - your message is on its way." : formState === "error" ? "Something went wrong. Please email me directly instead." : ""}</p>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div><p>Connect with me on</p><div className="footer-links"><a href="https://github.com/awsmlk" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/awsmlk/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.instagram.com/awsmlks" target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        <div className="footer-marquee" aria-hidden="true"><span>Thanks for visiting my portfolio! · Code & crafted by Awais Malik · </span><span>Thanks for visiting my portfolio! · Code & crafted by Awais Malik · </span></div>
      </footer>

      <nav className="section-dock" aria-label="Quick navigation">
        <a className={activeSection === "home" ? "is-active" : ""} href="#home" aria-label="Home">AM</a>
        <a className={activeSection === "projects" ? "is-active" : ""} href="#projects">Projects</a>
        <a className={activeSection === "skills" ? "is-active" : ""} href="#skills">Skills</a>
        <a className={activeSection === "experience" ? "is-active" : ""} href="#experience">Experience</a>
        <a className="dock-contact" href="#contact">Let&apos;s talk <span aria-hidden="true">→</span></a>
      </nav>
    </main>
  );
}
