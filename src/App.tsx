import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import logo from './assets/logo.png'
import './App.css'

const YEAR = new Date().getFullYear()
const EMAIL = 'contact@lactosense.org'
const LINKEDIN = 'https://www.linkedin.com/company/lactosense'
// TODO: replace with the real Instagram handle once confirmed
const INSTAGRAM = 'https://www.instagram.com/'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'team', label: 'Our Team' },
  { id: 'product', label: 'The Product' },
  { id: 'support', label: 'Support' },
  { id: 'contact', label: 'Contact' },
]

/** Fades children in once they scroll into view. */
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [el])
  return (
    <div ref={setEl} className={`reveal ${shown ? 'in' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const y = window.scrollY + 140
      let current = NAV[0].id
      for (const { id } of NAV) {
        const s = document.getElementById(id)
        if (s && s.offsetTop <= y) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="brand" onClick={go} aria-label="Lactosense home">
          <img src={logo} alt="" />
          <span>Lactosense</span>
        </a>
        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>
        <ul className={`nav__links ${open ? 'open' : ''}`}>
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={go}>
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#waitlist" className="btn btn--primary" onClick={go}>
              Join the waitlist
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

/**
 * Waitlist signup. NOTE: no backend is wired up yet. Replace the body of
 * `onSubmit` with a call to the newsletter provider once chosen.
 */
function WaitlistForm({ id, dark = false }: { id?: string; dark?: boolean }) {
  const [done, setDone] = useState(false)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDone(true)
  }
  if (done)
    return (
      <p className="form-success" role="status">
        Thank you! We'll be in touch with news and early access.
      </p>
    )
  return (
    <form className="inline-form" onSubmit={onSubmit} id={id}>
      <input type="email" required placeholder="Your email address" aria-label="Email address" />
      <button className={`btn ${dark ? 'btn--light' : 'btn--primary'}`} type="submit">
        Join the waitlist
      </button>
    </form>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div>
          <span className="eyebrow">Cambridge · Biotechnology</span>
          <h1>
            Science that supports <em>every</em> postnatal journey
          </h1>
          <p className="lead">
            Lactosense is developing rapid, at-home diagnostics that give new mothers the confidence
            to act early, starting with mastitis, and growing into a wider range of postnatal
            care tools.
          </p>
          <div className="hero__actions">
            <a href="#waitlist" className="btn btn--primary">
              Join the waitlist
            </a>
            <a href="#product" className="btn btn--ghost">
              Explore our first test
            </a>
          </div>
          <ul className="badges">
            <li>King's College SPARK 2.0 graduate</li>
            <li>King's E-Lab Award</li>
            <li>Cambridge Research Park</li>
          </ul>
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="orb" />
          <div className="ring" />
          <img src={logo} alt="" />
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section className="section section--paper" id="about">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">About us</span>
          <h2>Rooted in Cambridge science, built around mothers</h2>
        </Reveal>
        <Reveal className="story">
          <div className="card">
            <h3>Our story</h3>
            <p>
              Lactosense was founded in 2026 by two Cambridge scientists, and is based in the heart
              of Cambridge Research Park.
            </p>
            <p>
              We combine deep knowledge of mammary gland biology and breastmilk composition with
              experience in medical device development, to turn laboratory insight into tools
              families can use at home.
            </p>
            <div className="pill-row">
              <span className="pill">Founded 2026</span>
              <span className="pill">Cambridge Research Park</span>
              <span className="pill">Idea stage</span>
            </div>
          </div>
          <div className="card card--mission">
            <h3>Our mission</h3>
            <p>
              Empowering breastfeeding mothers in positive infant health outcomes through rapid
              at-home diagnostics.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Person({ initials, name, role, bio, alt }: { initials: string; name: string; role: string; bio: string; alt?: boolean }) {
  return (
    <div className="card person">
      <div className={`avatar ${alt ? 'avatar--brown' : ''}`} aria-hidden="true">
        {initials}
      </div>
      <div>
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p>{bio}</p>
      </div>
    </div>
  )
}

function Team() {
  return (
    <section className="section section--cream" id="team">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Our team</span>
          <h2>Meet the founders</h2>
          <p className="lead">
            Two Cambridge scientists, combining molecular biology with medical device experience.
          </p>
        </Reveal>
        <Reveal className="team-grid">
          <Person
            initials="EF"
            name="Emma Farquhar"
            role="Co-Founder & CEO"
            bio="Master's in Biochemistry, specialising in mammary gland molecular biology."
          />
          <Person
            initials="ES"
            name="Ellen Sheridan"
            role="Co-Founder & CTO"
            bio="PhD in Clinical Neuroscience; previously worked at Stryker in medical device development."
            alt
          />
        </Reveal>
        <Reveal>
          {/* TODO: confirm each person's role/title (advisor, mentor, etc.) */}
          <h3 className="subhead">Advisors &amp; supporters</h3>
          <div className="advisors">
            <div className="advisor">
              <div className="avatar avatar--brown" aria-hidden="true">NP</div>
              <div><strong>Nick Passey</strong></div>
            </div>
            <div className="advisor">
              <div className="avatar" aria-hidden="true">AM</div>
              <div>
                <strong>Ameen Mirjan</strong>
                <small>Director of Digital Health Strategy, AstraZeneca</small>
              </div>
            </div>
            <div className="advisor">
              <div className="avatar avatar--brown" aria-hidden="true">SC</div>
              <div><strong>Shirley Choo</strong></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Waitlist() {
  return (
    <section className="section section--green waitlist--band" id="waitlist">
      <div className="container waitlist">
        <div>
          <span className="eyebrow">Stay in the loop</span>
          <h2>Join our newsletter &amp; product waitlist</h2>
          <p className="lead" style={{ margin: 0 }}>
            Be the first to hear about our progress, pilots and early access.
          </p>
        </div>
        <div>
          <WaitlistForm dark />
          <p className="form-note">We'll only email about Lactosense. Unsubscribe any time.</p>
        </div>
      </div>
    </section>
  )
}

function News() {
  return (
    <section className="section section--paper" id="news">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">News &amp; outreach</span>
          <h2>Recent highlights</h2>
        </Reveal>
        <Reveal className="news-grid">
          {/* TODO: replace with real outreach, awards and networking events */}
          <article className="card news">
            <span className="tag">Award</span>
            <h3>King's E-Lab Award</h3>
            <p>
              Awarded £20,000 of funding on completing the King's College SPARK 2.0 Incubator
              Programme at the University of Cambridge, supporting development of our first
              prototype.
            </p>
          </article>
          <article className="card news">
            <span className="tag">Outreach</span>
            <h3>Public engagement</h3>
            <p>Details of our public outreach and hosted networking events will appear here soon.</p>
          </article>
          <article className="card news">
            <span className="tag">Newsletter</span>
            <h3>Coming soon</h3>
            <p>Our newsletter is in the works, with a link available within the next month.</p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

function Product() {
  return (
    <section className="section section--cream" id="product">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">The product</span>
          <h2>Our first test: a rapid at-home mastitis aid</h2>
          <p className="lead">
            Mastitis is our starting point, within a broader vision for better postnatal care
            diagnostics.
          </p>
        </Reveal>

        <Reveal className="two-col">
          <div>
            <h3>What is mastitis?</h3>
            <p>
              Mastitis is a painful inflammation and infection of the breast tissue. It is often
              left untreated until it becomes severe enough to need hospital care or strong
              antibiotics, and some mothers experience it again and again.
            </p>
            <p>It can affect the health of both mother and infant.</p>
          </div>
          <div>
            <h3>How it affects mothers</h3>
            <ul className="checks">
              <li>Pain, swelling and illness at a time when mothers are already stretched</li>
              <li>Uncertainty about when to seek care, so help often comes late</li>
              <li>Risk of hospital admission and strain on the mother–infant dyad</li>
              <li>Recurrence for some mothers</li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="stats">
          <div className="stat">
            <strong>~500,000</strong>
            <span>women in the UK initiate breastfeeding every year</span>
          </div>
          <div className="stat">
            <strong>1 in 4+</strong>
            <span>of these mothers will develop mastitis</span>
          </div>
          <div className="stat">
            <strong>Often late</strong>
            <span>treatment is sought only once the condition has worsened</span>
          </div>
        </Reveal>

        <Reveal className="science">
          <div className="science__grid">
            <div>
              <span className="eyebrow">The science behind the test</span>
              <h3>Listening to what breastmilk can tell us</h3>
              <p>
                Breastmilk composition changes in response to what is happening in the mammary
                gland. Our founders research this biology at the University of Cambridge, and
                mastitis tests are already routinely used in the dairy industry.
              </p>
              <p style={{ marginBottom: 0 }}>
                We are adapting this proven principle into a rapid, simple test for mothers, working
                much like the UTI tests that already help people reach care quickly.
              </p>
            </div>
            <ul>
              <li>
                <strong>Grounded in research</strong>
                Mammary gland biology at the University of Cambridge
              </li>
              <li>
                <strong>Access to samples</strong>
                The CAMB-MOM study gives access to over 200 breastmilk donors
              </li>
              <li>
                <strong>A proven model</strong>
                Rapid at-home tests already fast-track care in other areas of health
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="subhead">How it will work</h3>
          <ol className="steps">
            <li className="step">
              <h4>Take a sample</h4>
              <p>A simple, quick sample at home, whenever symptoms or worries arise.</p>
            </li>
            <li className="step">
              <h4>Run the test</h4>
              <p>Apply it to the test, designed to be easy and clear to use.</p>
            </li>
            <li className="step">
              <h4>Read the result</h4>
              <p>A rapid answer in minutes, helping you decide what to do next.</p>
            </li>
            <li className="step step--result">
              <h4>Take the next step</h4>
              <p>Contact a pharmacy or healthcare professional for support or treatment if needed.</p>
            </li>
          </ol>
          <p className="fineprint">
            Our test is in early development; the steps above are indicative and will be refined with
            mothers and clinicians.
          </p>
        </Reveal>

        <Reveal className="outcome">
          <h3>The Lactosense aim</h3>
          <p>
            Give mothers the confidence to initiate proactive care sooner, helping to reduce hospital
            admissions and the strain on mother and infant, and to build a wider set of tests for
            breastmilk biomarkers, including gestational diabetes.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Support() {
  const resources = [
    {
      name: 'NHS',
      href: 'https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/breastfeeding/',
      text: 'Trusted guidance on breastfeeding, including how to spot and manage mastitis.',
    },
    {
      name: 'NCT',
      href: 'https://www.nct.org.uk/baby-toddler/feeding',
      text: 'Feeding support, information and local groups for new parents.',
    },
    {
      name: 'The Breastfeeding Network',
      href: 'https://www.breastfeedingnetwork.org.uk/',
      text: 'Independent, evidence-based support, including a helpline and drug information.',
    },
  ]
  return (
    <section className="section section--paper" id="support">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Support</span>
          <h2>Help and resources for breastfeeding families</h2>
          <p className="lead">
            Every feeding journey is personal. These organisations offer friendly, expert support.
          </p>
        </Reveal>
        <Reveal className="resource-grid">
          {resources.map((r) => (
            <a key={r.name} className="card resource" href={r.href} target="_blank" rel="noreferrer">
              <h3>{r.name}</h3>
              <p>{r.text}</p>
              <span className="more">Visit website →</span>
            </a>
          ))}
        </Reveal>
        <Reveal className="facts">
          <div className="fact">
            <strong>6 months</strong>
            <p>The WHO recommends exclusive breastfeeding for the first 6 months of an infant's life.</p>
          </div>
          <div className="fact">
            <strong>1%</strong>
            <p>
              of mothers in the UK meet this recommendation, which shows how much more support
              families deserve.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Website enquiry from ${f.get('name')}`)
    const body = encodeURIComponent(`${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}`)
    // No backend yet: open the visitor's mail app addressed to us.
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }
  return (
    <section className="section section--cream" id="contact">
      <div className="container contact">
        <Reveal>
          <span className="eyebrow">Contact us</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.9rem)' }}>We'd love to hear from you</h2>
          <p className="lead">
            Questions, ideas or interested in collaborating? Send us a message.
          </p>
          <ul className="contact-list">
            <li>
              <small>Email</small>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            <li>
              <small>Address</small>
              Building 1000 Cambridge Research Park,
              <br />
              Waterbeach, Cambridge, England, CB25 9PD
            </li>
            <li>
              <small>Follow</small>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
              {' · '}
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
            </li>
          </ul>
        </Reveal>
        <Reveal>
          <form className="card form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="message">How can we help?</label>
              <textarea id="message" name="message" required />
            </div>
            <button className="btn btn--primary" type="submit">
              Send enquiry
            </button>
            {sent && (
              <p className="form-success" role="status">
                Your email app should have opened with your message ready to send.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <a href="#home" className="brand">
              <span>Lactosense</span>
            </a>
            <p>Rapid at-home diagnostics to improve postnatal care outcomes.</p>
          </div>
          <nav aria-label="Footer">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}>{n.label}</a>
            ))}
            <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© {YEAR} Lactosense. All rights reserved.</span>
          <span>Cambridge Research Park, Waterbeach, Cambridge CB25 9PD</span>
        </div>
      </div>
    </footer>
  )
}

/** Third waitlist call-to-action, placed after the support section. */
function WaitlistCard() {
  return (
    <section className="section section--paper" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal className="card science" >
          <div className="waitlist">
            <div>
              <h2 style={{ color: 'var(--cream)' }}>Be part of what comes next</h2>
              <p style={{ margin: 0 }}>
                Join the waitlist for updates, pilots and our upcoming newsletter.
              </p>
            </div>
            <WaitlistForm dark />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Team />
        <Waitlist />
        <News />
        <Product />
        <Support />
        <WaitlistCard />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
