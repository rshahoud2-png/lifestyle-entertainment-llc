import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, CalendarDays, Disc3, Instagram, Mail, MapPin, Music2, Sparkles, Star, UsersRound } from 'lucide-react';
import './styles.css';

const services = [
  {
    title: 'Private Celebrations',
    copy: 'Birthdays, graduations, weddings, and milestone nights shaped with crisp production and warm hospitality.',
    icon: Sparkles
  },
  {
    title: 'Nightlife Experiences',
    copy: 'Club nights, lounges, pop-ups, and weekend programs with the right sound, flow, and room energy.',
    icon: Disc3
  },
  {
    title: 'Talent and Music',
    copy: 'DJ coordination, artist moments, hosting, and live entertainment that keep the room moving.',
    icon: Music2
  },
  {
    title: 'Brand Events',
    copy: 'Launches, community activations, and sponsor-friendly events designed to feel elevated and memorable.',
    icon: Star
  }
];

const experiences = [
  {
    eyebrow: '01 / Signature Night',
    title: 'A room that feels designed from the first arrival.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
    tags: ['Venue direction', 'Guest flow', 'Music programming']
  },
  {
    eyebrow: '02 / Social Moment',
    title: 'Entertainment that gives people something to talk about.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80',
    tags: ['DJ booking', 'Lighting mood', 'VIP details']
  },
  {
    eyebrow: '03 / Brand Energy',
    title: 'A polished atmosphere for launches and local culture.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=80',
    tags: ['Production plan', 'Creative direction', 'Audience experience']
  }
];

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
      particles = Array.from({ length: 42 }, (_, index) => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: 1 + Math.random() * 3,
        speed: 0.12 + Math.random() * 0.35,
        phase: index * 0.35
      }));
    };

    const draw = (time) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      context.clearRect(0, 0, width, height);

      const sweep = context.createRadialGradient(width * 0.5, height * 0.25, 10, width * 0.5, height * 0.28, width * 0.9);
      sweep.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      sweep.addColorStop(0.32, 'rgba(224, 46, 86, 0.15)');
      sweep.addColorStop(0.62, 'rgba(255, 193, 7, 0.08)');
      sweep.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = sweep;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += Math.sin(time * 0.001 + particle.phase) * 0.18;
        if (particle.y < -10) particle.y = height + 10;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 0.48)';
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

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Lifestyle Entertainment home">
          <span>LE</span>
          <strong>Lifestyle Entertainment LLC</strong>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#work">Experiences</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="hero section-dark">
        <StageCanvas />
        <div className="hero-media" />
        <div className="hero-content">
          <p className="kicker">Lifestyle led events and entertainment</p>
          <h1>
            Create the night people remember.
          </h1>
          <p className="hero-copy">
            Lifestyle Entertainment LLC plans polished celebrations, nightlife moments, talent-driven events, and brand experiences with atmosphere, rhythm, and detail.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              Plan an event <ArrowUpRight size={18} />
            </a>
            <a className="button ghost" href="#work">
              Explore the vibe
            </a>
          </div>
        </div>
        <div className="hero-meta" aria-label="Company strengths">
          <span>Events</span>
          <span>Music</span>
          <span>Production</span>
          <span>Culture</span>
        </div>
      </section>

      <section className="intro section-light" aria-labelledby="intro-title">
        <p className="section-label">What we do</p>
        <h2 id="intro-title">We turn a good plan into a full-room feeling.</h2>
        <p>
          From the first invite to the last song, every detail is shaped around how guests move, connect, celebrate, and remember the moment.
        </p>
      </section>

      <section id="services" className="services section-light" aria-labelledby="services-title">
        <div className="section-heading">
          <p className="section-label">Services</p>
          <h2 id="services-title">Entertainment built around the room.</h2>
        </div>
        <div className="service-grid">
          {services.map(({ title, copy, icon: Icon }) => (
            <article className="service-card" key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="experience section-dark" aria-labelledby="experience-title">
        <div className="section-heading split">
          <div>
            <p className="section-label">Experiences</p>
            <h2 id="experience-title">Premium pace. Local energy. Real presence.</h2>
          </div>
          <p>
            Inspired by cinematic digital storytelling, this site presents Lifestyle Entertainment as a modern event partner with strong visual impact and clear booking momentum.
          </p>
        </div>
        <div className="experience-list">
          {experiences.map((item) => (
            <article className="experience-card" key={item.eyebrow}>
              <img src={item.image} alt="Crowd and live event atmosphere" loading="lazy" />
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

      <section className="process section-light" aria-labelledby="process-title">
        <div className="section-heading">
          <p className="section-label">How it works</p>
          <h2 id="process-title">A clean path from idea to event night.</h2>
        </div>
        <div className="process-grid">
          <article>
            <CalendarDays size={26} />
            <h3>Define the occasion</h3>
            <p>We clarify the guest list, date, venue needs, budget range, and the feeling the event should carry.</p>
          </article>
          <article>
            <UsersRound size={26} />
            <h3>Shape the experience</h3>
            <p>Music, talent, timing, hosting, room layout, and service details come together as one plan.</p>
          </article>
          <article>
            <Sparkles size={26} />
            <h3>Deliver the moment</h3>
            <p>On event day, the focus is simple: smooth flow, happy guests, and a night that lands.</p>
          </article>
        </div>
      </section>

      <section id="contact" className="contact section-dark" aria-labelledby="contact-title">
        <div>
          <p className="section-label">Contact</p>
          <h2 id="contact-title">Bring Lifestyle Entertainment LLC into your next event.</h2>
          <p>
            Share the date, city, estimated guest count, and the kind of night you want to create.
          </p>
        </div>
        <div className="contact-panel">
          <a href="mailto:info@lifestyleentertainmentllc.com">
            <Mail size={20} /> info@lifestyleentertainmentllc.com
          </a>
          <a href="https://rikoshahoud.wixsite.com/lifestyle-entertainm" target="_blank" rel="noreferrer">
            <ArrowUpRight size={20} /> Current website
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Instagram size={20} /> Instagram
          </a>
          <span><MapPin size={20} /> Available for private and brand events</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
