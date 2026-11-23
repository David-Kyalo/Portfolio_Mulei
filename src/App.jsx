import { useEffect, useRef, useState } from 'react'

const EMAIL = 'david.kyalo@email.com'
const FILTERS = ['All', 'Infrastructure', 'Software', 'Automation']

const projects = [
  {
    num: '01',
    type: 'Infrastructure',
    title: 'Cloud Platform Re-architecture',
    description:
      'Rebuilt a monolithic deployment stack into a resilient, observable platform designed for independent delivery.',
    result: '↓ 42% cloud spend',
    tags: ['AWS', 'Terraform', 'Kubernetes', 'Grafana'],
    tone: 'lime',
    icon: 'server',
  },
  {
    num: '02',
    type: 'Software',
    title: 'Internal Developer Portal',
    description:
      'Created a self-service platform that standardized service scaffolding, ownership, and deployment workflows.',
    result: '3× faster onboarding',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    tone: 'orange',
    icon: 'code',
  },
  {
    num: '03',
    type: 'Automation',
    title: 'Zero-Touch Fleet Management',
    description:
      'Automated configuration, patching, and compliance reporting across a distributed Linux server estate.',
    result: '860+ nodes managed',
    tags: ['Ansible', 'Python', 'Linux', 'Prometheus'],
    tone: 'blue',
    icon: 'terminal',
  },
  {
    num: '04',
    type: 'Software',
    title: 'Incident Intelligence Engine',
    description:
      'Built an event correlation service that enriches alerts and routes incidents to the right team in seconds.',
    result: '↓ 61% MTTR',
    tags: ['Go', 'Kafka', 'Redis', 'OpenTelemetry'],
    tone: 'violet',
    icon: 'code',
  },
]

const stats = [
  ['09+', 'Years shipping'],
  ['99.95%', 'Uptime maintained'],
  ['120+', 'Deployments / year'],
  ['860+', 'Nodes automated'],
]

const capabilities = [
  {
    icon: 'server',
    title: 'Infrastructure',
    items: ['Cloud architecture', 'Infrastructure as code', 'Containers & orchestration', 'Observability'],
  },
  {
    icon: 'code',
    title: 'Engineering',
    items: ['Backend systems', 'Developer tooling', 'API design', 'Technical leadership'],
  },
  {
    icon: 'terminal',
    title: 'Operations',
    items: ['Linux administration', 'SRE & incident response', 'Security hardening', 'Workflow automation'],
  },
]

const experience = [
  {
    period: '2022 — NOW',
    role: 'Senior Platform Engineer',
    company: 'Northstar Systems',
    copy: 'Leading platform architecture and developer experience for 40+ product engineers.',
  },
  {
    period: '2019 — 2022',
    role: 'Systems Engineer',
    company: 'Layerworks',
    copy: 'Owned production infrastructure, observability, and reliability across three regions.',
  },
  {
    period: '2016 — 2019',
    role: 'Software Engineer',
    company: 'Independent',
    copy: 'Delivered web systems and workflow automation for growing technical teams.',
  },
]

function Icon({ name, size = 20 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'arrow') {
    return (
      <svg {...props}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    )
  }
  if (name === 'check') {
    return (
      <svg {...props}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    )
  }
  if (name === 'chevron') {
    return (
      <svg {...props}>
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  }
  if (name === 'close') {
    return (
      <svg {...props}>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </svg>
    )
  }
  if (name === 'menu') {
    return (
      <svg {...props}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    )
  }
  if (name === 'copy') {
    return (
      <svg {...props}>
        <rect width="13" height="13" x="9" y="9" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    )
  }
  if (name === 'github') {
    return (
      <svg {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.1.5S18 0 15 2a13.4 13.4 0 0 0-7 0C5 0 3.9.5 3.9.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2" />
      </svg>
    )
  }
  if (name === 'linkedin') {
    return (
      <svg {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  }
  if (name === 'code') {
    return (
      <svg {...props}>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </svg>
    )
  }
  if (name === 'terminal') {
    return (
      <svg {...props}>
        <path d="m4 17 6-6-6-6" />
        <path d="M12 19h8" />
      </svg>
    )
  }
  return (
    <svg {...props}>
      <rect width="20" height="8" x="2" y="3" rx="2" />
      <rect width="20" height="8" x="2" y="13" rx="2" />
      <path d="M6 7h.01M6 17h.01" />
    </svg>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [filter, setFilter] = useState('All')
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)

  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.type === filter)

  const openContact = () => {
    triggerRef.current = document.activeElement
    setMenuOpen(false)
    setContactOpen(true)
  }

  const closeContact = () => {
    setContactOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!copied) return undefined
    const timer = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timer)
  }, [copied])

  useEffect(() => {
    if (!contactOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeContact()
      if (event.key !== 'Tab') return
      const nodes = [...(dialogRef.current?.querySelectorAll('button, a[href]') ?? [])]
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [contactOpen])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#101413] text-[#f2f0e9]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#101413]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex min-h-11 items-center gap-3 font-display text-lg font-bold tracking-[-0.02em]" onClick={() => setMenuOpen(false)}>
            <span className="grid size-8 place-items-center bg-[#dfe247] text-[#101413]">
              <span className="text-sm">D/</span>
            </span>
            DAVID KYALO
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            <a href="#work" className="nav-link">Work</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
          </nav>
          <button type="button" className="hidden min-h-11 items-center gap-2 border border-white/20 px-5 text-sm font-semibold transition-colors hover:border-[#dfe247] hover:bg-[#dfe247] hover:text-[#101413] md:flex" onClick={openContact}>
            Let’s talk <Icon name="arrow" size={17} />
          </button>
          <button type="button" aria-expanded={menuOpen} aria-label="Toggle navigation menu" className="icon-button md:hidden" onClick={() => setMenuOpen((open) => !open)}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-[#101413] px-5 py-5 md:hidden">
            {['Work', 'About', 'Experience'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block min-h-12 py-3 text-lg" onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button type="button" className="mt-3 flex min-h-12 w-full items-center justify-between bg-[#dfe247] px-4 font-semibold text-[#101413]" onClick={openContact}>
              Let’s talk <Icon name="arrow" />
            </button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative mx-auto flex min-h-[780px] max-w-[1440px] items-center px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pt-40">
          <div className="grid-lines absolute inset-y-0 right-0 hidden w-[46%] border-x border-white/6 lg:block" aria-hidden="true">
            <div className="absolute left-[34%] top-[24%] size-3 bg-[#dfe247] shadow-[0_0_28px_8px_rgba(223,226,71,.18)]" />
            <div className="absolute bottom-[19%] right-[22%] size-2 bg-[#eb6b38]" />
          </div>
          <div className="relative z-10 w-full">
            <div className="mb-10 flex items-center gap-4">
              <span className="pulse-dot" />
              <p className="eyebrow text-[#c4c9c5]">AVAILABLE FOR SELECT PROJECTS — 2025</p>
            </div>
            <h1 className="max-w-6xl font-display text-[clamp(3.5rem,9.5vw,9rem)] font-semibold leading-[.82] tracking-[-0.065em]">
              I BUILD SYSTEMS
              <span className="block text-[#dfe247]">THAT STAY BUILT.</span>
            </h1>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.25fr_.75fr]">
              <p className="max-w-2xl font-display text-xl leading-8 text-[#d8dcd8] sm:text-2xl">
                Software engineer &amp; systems administrator turning complex infrastructure into simple, dependable tools.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <a href="#work" className="primary-button">
                  Explore my work <Icon name="arrow" size={18} />
                </a>
                <button type="button" className="icon-button gap-2 px-4" aria-label="Copy email address" onClick={copyEmail}>
                  <Icon name={copied ? 'check' : 'copy'} size={17} />
                  <span className="text-sm">{copied ? 'Copied' : 'Email'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#c9cbc4] bg-[#f2f0e9] text-[#101413]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-[#c9cbc4] px-5 sm:px-8 md:grid-cols-4 lg:px-12">
            {stats.map(([value, label], index) => (
              <div
                key={label}
                className={`py-8 md:px-8 md:first:pl-0 md:last:pr-0 ${index % 2 ? 'pl-5 sm:pl-8' : 'pr-5 sm:pr-8'} ${index > 1 ? 'border-t border-[#c9cbc4] md:border-t-0' : ''}`}
              >
                <strong className="font-display text-3xl tracking-[-0.04em] sm:text-4xl">{value}</strong>
                <p className="mt-1 text-sm font-medium text-[#59605c]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-20 bg-[#f2f0e9] px-5 py-24 text-[#101413] sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1344px]">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-4 text-[#656c68]">01 / SELECTED WORK</p>
                <h2 className="section-title">
                  Systems with
                  <br />
                  measurable impact.
                </h2>
              </div>
              <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
                {FILTERS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={filter === item}
                    className={`filter-button ${filter === item ? 'filter-active' : ''}`}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#c9cbc4] bg-[#c9cbc4] lg:grid-cols-2">
              {visibleProjects.map((project) => (
                <article key={project.num} className="project-card group bg-[#f2f0e9] p-6 sm:p-9">
                  <div className="mb-16 flex items-start justify-between">
                    <span className="font-mono text-sm text-[#656c68]">
                      {project.num} / {project.type.toUpperCase()}
                    </span>
                    <span className={`project-mark mark-${project.tone}`} aria-hidden="true">
                      <Icon name={project.icon} size={26} />
                    </span>
                  </div>
                  <h3 className="max-w-lg font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{project.title}</h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-[#59605c]">{project.description}</p>
                  <div className="mt-10 flex items-center justify-between gap-5 border-t border-[#c9cbc4] pt-5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <strong className="shrink-0 text-sm">{project.result}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 border-t border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1344px]">
            <p className="eyebrow mb-12 text-[#a8afaa]">02 / WHAT I DO</p>
            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
              <h2 className="section-title text-[#f2f0e9]">
                Calm systems.
                <br />
                <span className="text-[#737b76]">Clear thinking.</span>
              </h2>
              <div>
                <p className="max-w-2xl font-display text-2xl leading-9 text-[#d8dcd8] sm:text-3xl sm:leading-[1.35]">
                  I work where software engineering meets operations—designing platforms that are easy to use, easy to understand, and difficult to break.
                </p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#aeb5b0]">
                  My approach pairs deep technical ownership with practical communication. No black boxes, no needless complexity, and no handoffs without context.
                </p>
              </div>
            </div>
            <div className="mt-20 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
              {capabilities.map((capability, index) => (
                <div key={capability.title} className="bg-[#101413] p-7 sm:p-9">
                  <div className="mb-10 flex items-center justify-between text-[#dfe247]">
                    <Icon name={capability.icon} size={27} />
                    <span className="font-mono text-xs text-[#737b76]">0{index + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{capability.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {capability.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-[#aeb5b0]">
                        <span className="size-1 bg-[#dfe247]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-20 bg-[#dfe247] px-5 py-24 text-[#101413] sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1344px]">
            <div className="grid gap-12 lg:grid-cols-[.6fr_1.4fr]">
              <div>
                <p className="eyebrow mb-4 text-[#505323]">03 / EXPERIENCE</p>
                <h2 className="section-title">
                  Built over
                  <br />
                  time.
                </h2>
              </div>
              <div className="border-t border-[#101413]/35">
                {experience.map((item) => (
                  <div key={item.role} className="grid gap-4 border-b border-[#101413]/35 py-8 sm:grid-cols-[140px_1fr] sm:py-10">
                    <span className="font-mono text-xs font-semibold">{item.period}</span>
                    <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{item.role}</h3>
                        <p className="mt-1 text-sm font-semibold">{item.company}</p>
                      </div>
                      <p className="text-sm leading-6 text-[#41441d]">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pt-32">
        <div className="mx-auto max-w-[1344px]">
          <div className="flex flex-col items-start justify-between gap-10 border-b border-white/15 pb-20 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-5 text-[#a8afaa]">HAVE A COMPLEX PROBLEM?</p>
              <h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.9] tracking-[-0.055em]">
                LET’S MAKE IT
                <br />
                <span className="text-[#dfe247]">SIMPLER.</span>
              </h2>
            </div>
            <button type="button" className="footer-cta group" aria-label="Open contact dialog" onClick={openContact}>
              <Icon name="arrow" size={35} />
            </button>
          </div>
          <div className="flex flex-col justify-between gap-6 py-8 text-sm text-[#909893] sm:flex-row sm:items-center">
            <p>© 2025 David Kyalo. Built with intent.</p>
            <div className="flex gap-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#dfe247]">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#dfe247]">LinkedIn</a>
              <a href="#top" className="flex items-center gap-2 hover:text-[#dfe247]">
                Back to top
                <span className="-rotate-90">
                  <Icon name="chevron" size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {contactOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#101413]/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeContact()
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="w-full max-w-xl border border-white/15 bg-[#f2f0e9] p-7 text-[#101413] shadow-2xl sm:p-10"
          >
            <div className="mb-10 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow mb-3 text-[#59605c]">START A CONVERSATION</p>
                <h2 id="contact-title" className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Let’s build something reliable.
                </h2>
              </div>
              <button ref={closeRef} type="button" aria-label="Close contact dialog" className="icon-button shrink-0 border-[#c9cbc4] hover:bg-[#dfe247]" onClick={closeContact}>
                <Icon name="close" />
              </button>
            </div>
            <p className="mb-8 max-w-md text-base leading-7 text-[#525a56]">
              I’m currently open to senior engineering roles, platform consulting, and ambitious infrastructure projects.
            </p>
            <a href={`mailto:${EMAIL}`} className="group flex min-h-20 items-center justify-between border-y border-[#c9cbc4] text-lg font-semibold transition-colors hover:bg-white/70">
              {EMAIL}
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrow" />
              </span>
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
                <Icon name="github" size={18} /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">
                <Icon name="linkedin" size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
