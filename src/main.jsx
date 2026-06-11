import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, CalendarDays, Disc3, Mail, MapPin, Music2, Sparkles, Star, UsersRound } from 'lucide-react';
import './styles.css';

const brandMedia = {
  hero: 'https://static.wixstatic.com/media/b0bbc9_ddaae8d400114763af7f8fd6b90cd310~mv2.jpg',
  logo: 'https://static.wixstatic.com/media/0da768_863eb85f0dd04fe9b4ea3d5372da3b25~mv2.png',
  solutions: 'https://static.wixstatic.com/media/11062b_b0567c877fda4a66ad4037866f93473d~mv2.jpg',
  eventA: 'https://static.wixstatic.com/media/b0bbc9_00e4b7da2d7540c1afee12fab6943dbbf000.jpg',
  eventB: 'https://static.wixstatic.com/media/b0bbc9_363fb77b179b4aaaac460c5b3eda62dff000.jpg',
  eventC: 'https://static.wixstatic.com/media/b0bbc9_4b16517247f94385aa5eff8db3976a4bf000.jpg',
  eventD: 'https://static.wixstatic.com/media/b0bbc9_7f29f9ac47da4e9f8704a792feea59baf000.jpg'
};

const services = [
  {
    title: 'Entertainment Direction',
    copy: 'Curated performers, musicians, DJs, live acts, specialty entertainment, and interactive moments selected to match the occasion, audience, and energy of the room.',
    icon: Music2
  },
  {
    title: 'Venue Coordination',
    copy: 'Thoughtful venue support for private gatherings, nightlife concepts, and large celebrations, with options aligned to your budget, guest count, and event style.',
    icon: Star
  },
  {
    title: 'Catering Experiences',
    copy: "Custom food and beverage planning that reflects the tone of the event, from passed hors d'oeuvres and curated menus to desserts and late-night service.",
    icon: Sparkles
  },
  {
    title: 'Event Promotion and Planning',
    copy: 'Full event support across concept, promotion, vendors, guest flow, entertainment, and execution so every touchpoint feels intentional and professionally managed.',
    icon: CalendarDays
  }
];

const showcases = [
  {
    eyebrow: 'Featured Event',
    title: 'Cursed Beats, an elevated nightlife experience featuring DJ Eli.',
    image: brandMedia.eventA,
    tags: ['DJ Eli', 'Nightlife', 'Event production']
  },
  {
    eyebrow: 'Signature Concept',
    title: 'In Valentine, a celebration of atmosphere, music, and visual impact.',
    image: brandMedia.eventB,
    tags: ['Entertainment', 'Design', 'Celebration']
  },
  {
    eyebrow: 'Guest Experience',
    title: 'A seamless arrival-to-finale flow built around timing, access, and energy.',
    image: brandMedia.eventC,
    tags: ['Registration', 'Guest flow', 'Production']
  },
  {
    eyebrow: 'Brand Presence',
    title: 'Promotional visuals and event moments crafted to stand out across every channel.',
    image: brandMedia.eventD,
    tags: ['Media', 'Promotion', 'Brand presence']
  }
];

const solutions = [
  {
    title: 'Website Design',
    copy: 'Professional, responsive websites shaped around your brand, business goals, and customer experience.'
  },
  {
    title: 'Graphic Design',
    copy: 'Polished creative assets for promotions, announcements, campaigns, social content, and event marketing.'
  },
  {
    title: 'Instagram',
    copy: 'Social media support designed to strengthen your online presence, attract attention, and convert interest into action.'
  }
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}

function PointerGlow() {
  useEffect(() => {
    const update = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', update, { passive: true });
    return () => window.removeEventListener('pointermove', update);
  }, []);

  return <div className="pointer-glow" aria-hidden="true" />;
}

function StageCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frame;
    let particles = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: 58 }, (_, index) => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: 1 + Math.random() * 4,
        speed: 0.16 + Math.random() * 0.45,
        phase: index * 0.42
      }));
    };

    const draw = (time) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      context.clearRect(0, 0, width, height);

      const sweep = context.createRadialGradient(width * 0.54, height * 0.28, 20, width * 0.52, height * 0.32, width * 0.82);
      sweep.addColorStop(0, 'rgba(255, 255, 255, 0.24)');
      sweep.addColorStop(0.26, 'rgba(255, 49, 95, 0.2)');
      sweep.addColorStop(0.58, 'rgba(255, 194, 71, 0.1)');
      sweep.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = sweep;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += Math.sin(time * 0.001 + particle.phase) * 0.3;
        if (particle.y < -12) particle.y = height + 12;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 0.46)';
        context.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas aria-hidden="true" className="stage-canvas" ref={canvasRef} />;
}

function App() {
  const progress = useScrollProgress();

  return (
    <main>
      <PointerGlow />
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="LifeStyle Entertainment home">
          <img src={brandMedia.logo} alt="LifeStyle Entertainment" />
          <strong>LifeStyle Entertainment</strong>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="hero section-dark">
        <StageCanvas />
        <img className="hero-media" src={brandMedia.hero} alt="LifeStyle Entertainment event visual" />
        <div className="hero-content">
          <p className="kicker">Event planning, entertainment, and brand experiences</p>
          <h1><span>Plan the</span><span>moment.</span><span>Own the night.</span></h1>
          <p className="hero-copy">
            LifeStyle Entertainment designs memorable events with the right mix of music, talent, venue coordination, catering, promotion, and production detail.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Start planning <ArrowUpRight size={18} /></a>
            <a className="button ghost" href="#events">View experiences</a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span>Events</span>
          <span>DJs</span>
          <span>Venues</span>
          <span>Catering</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          <span>The Art Of Entertainment</span>
          <span>Promote and Plan Events</span>
          <span>Cursed Beats</span>
          <span>LifeStyle Solutions</span>
        </div>
      </div>

      <section className="intro section-light" aria-labelledby="intro-title">
        <p className="section-label">What we do</p>
        <h2 id="intro-title">We create event experiences with atmosphere, structure, and momentum.</h2>
        <p>
          From intimate private gatherings to high-energy nightlife concepts, every event is shaped around guest experience, brand presence, and a clear plan from start to finish.
        </p>
      </section>

      <section id="services" className="services section-light" aria-labelledby="services-title">
        <div className="section-heading">
          <p className="section-label">Services</p>
          <h2 id="services-title">Entertainment, venue support, catering, and full-service planning.</h2>
        </div>
        <div className="service-grid">
          {services.map(({ title, copy, icon: Icon }) => (
            <article className="service-card kinetic-card" key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="showcase section-dark" aria-labelledby="events-title">
        <div className="sticky-copy">
          <p className="section-label">Experiences</p>
          <h2 id="events-title">Designed for rooms that need energy, flow, and impact.</h2>
          <p>Every event deserves a visual identity, a strong sound, a smooth arrival, and a room that feels alive from the first guest to the final song.</p>
        </div>
        <div className="showcase-rail">
          {showcases.map((item, index) => (
            <article className="showcase-card" key={item.eyebrow} style={{ '--offset': index }}>
              <img src={item.image} alt={item.title} loading={index === 0 ? 'eager' : 'lazy'} />
              <div>
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <div className="tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about section-light" aria-labelledby="about-title">
        <div className="about-media">
          <img src={brandMedia.eventD} alt="LifeStyle Entertainment event atmosphere" loading="lazy" />
        </div>
        <div>
          <p className="section-label">About Us</p>
          <h2 id="about-title">Creative professionals focused on bringing your vision to life.</h2>
          <p>
            LifeStyle Entertainment is built around experienced event planners, designers, and coordinators who care about every stage of the planning process. The team brings creativity, organization, and attention to detail together to help each event feel polished, personal, and memorable.
          </p>
        </div>
      </section>

      <section id="solutions" className="solutions section-dark" aria-labelledby="solutions-title">
        <img className="solutions-media" src={brandMedia.solutions} alt="LifeStyle Solutions visual" loading="lazy" />
        <div className="section-heading split">
          <div>
            <p className="section-label">LifeStyle Solutions</p>
            <h2 id="solutions-title">Digital services that strengthen your online presence.</h2>
          </div>
          <p>
            LifeStyle Solutions helps businesses present themselves with stronger visuals, clearer messaging, and digital experiences designed to attract attention and support growth.
          </p>
        </div>
        <div className="solution-list">
          {solutions.map((solution) => (
            <article className="solution-row" key={solution.title}>
              <span>{solution.title}</span>
              <p>{solution.copy}</p>
              <ArrowUpRight size={24} />
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section-dark" aria-labelledby="contact-title">
        <div>
          <p className="section-label">Contact Us</p>
          <h2 id="contact-title">Let’s build your next event.</h2>
          <p>Share your date, location, guest count, and event goals. LifeStyle Entertainment will help shape the right plan, entertainment, and atmosphere for the occasion.</p>
        </div>
        <div className="contact-panel">
          <a href="mailto:info@lifestyleentertainmentllc.com"><Mail size={20} /> info@lifestyleentertainmentllc.com</a>
          <a href="mailto:info@lifestyleentertainmentllc.com?subject=Event%20planning%20request"><ArrowUpRight size={20} /> Request event planning</a>
          <a href="mailto:info@lifestyleentertainmentllc.com?subject=LifeStyle%20Solutions%20request"><CalendarDays size={20} /> Ask about digital services</a>
          <span><MapPin size={20} /> Available for event planning, entertainment, and brand experiences</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
