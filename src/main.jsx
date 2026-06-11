import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, CalendarDays, Disc3, Mail, MapPin, Music2, Sparkles, Star, UsersRound } from 'lucide-react';
import './styles.css';

const services = [
  {
    title: 'Entertainment',
    copy: "Entertainment is a key component of any event. LifeStyle Entertainment has an extensive network of performers, musicians, and DJs to suit any occasion, from live bands and magicians to photo booth moments.",
    icon: Music2
  },
  {
    title: 'Venue Selection',
    copy: 'Finding the perfect venue can make all the difference in creating a successful event. The team works with you to find an ideal location that fits your budget and style, from intimate spaces to grand ballrooms.',
    icon: Star
  },
  {
    title: 'Catering',
    copy: "Food is an essential part of any event. The catering team helps create a customized menu that reflects your tastes and preferences, from hors d'oeuvres to desserts.",
    icon: Sparkles
  },
  {
    title: 'Promote and Plan Events',
    copy: 'LifeStyle Entertainment brings planning, promotion, entertainment, venue support, and event-day coordination together so your occasion feels polished from first invite to final song.',
    icon: CalendarDays
  }
];

const events = [
  {
    eyebrow: 'Latest event',
    title: 'Cursed Beats: our latest event with the best DJ in PA, DJ Eli.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80',
    tags: ['DJ Eli', 'PA nightlife', 'Event planning']
  },
  {
    eyebrow: 'Featured theme',
    title: 'In Valentine: The Art Of Entertainment.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80',
    tags: ['Entertainment', 'Atmosphere', 'Celebration']
  },
  {
    eyebrow: 'Registration',
    title: 'Event details and registration with doors open information.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1400&q=80',
    tags: ['Event details', 'Guest flow', 'Doors open']
  }
];

const solutions = [
  {
    title: 'Website Design',
    copy: 'A professional and visually appealing website tailored to your business needs, using current design trends and technologies to create a user-friendly and responsive online presence.'
  },
  {
    title: 'Graphic Design',
    copy: 'Creative digital assets that help your brand, promotion, or event look sharp across social media, announcements, and campaigns.'
  },
  {
    title: 'Instagram',
    copy: 'Social content support that helps you grow your online business, attract more customers, and increase revenue.'
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
        <a className="brand" href="#top" aria-label="LifeStyle Entertainment home">
          <span>LE</span>
          <strong>LifeStyle Entertainment</strong>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="hero section-dark">
        <StageCanvas />
        <div className="hero-media" />
        <div className="hero-content">
          <p className="kicker">LifeStyle Entertainment | Event planning</p>
          <h1>Promote and plan events.</h1>
          <p className="hero-copy">
            Looking for top-notch entertainment for your next event? LifeStyle Entertainment brings performers, musicians, DJs, venues, catering, and planning support together for occasions that feel complete.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              Contact us <ArrowUpRight size={18} />
            </a>
            <a className="button ghost" href="#events">
              View events
            </a>
          </div>
        </div>
        <div className="hero-meta" aria-label="Company strengths">
          <span>Events</span>
          <span>DJs</span>
          <span>Venues</span>
          <span>Catering</span>
        </div>
      </section>

      <section className="intro section-light" aria-labelledby="intro-title">
        <p className="section-label">What we do</p>
        <h2 id="intro-title">The art of entertainment, planned with care.</h2>
        <p>
          LifeStyle Entertainment supports events from concept to execution, combining creative planning with the practical details that make guests feel taken care of.
        </p>
      </section>

      <section id="services" className="services section-light" aria-labelledby="services-title">
        <div className="section-heading">
          <p className="section-label">Services</p>
          <h2 id="services-title">Entertainment, venues, catering, and event planning.</h2>
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

      <section id="events" className="experience section-dark" aria-labelledby="events-title">
        <div className="section-heading split">
          <div>
            <p className="section-label">Events</p>
            <h2 id="events-title">Featured moments from the LifeStyle site.</h2>
          </div>
          <p>
            The original site highlights event promotion, registration, and themed entertainment moments including Cursed Beats and In Valentine.
          </p>
        </div>
        <div className="experience-list">
          {events.map((item) => (
            <article className="experience-card" key={item.eyebrow}>
              <img src={item.image} alt="Live event atmosphere" loading="lazy" />
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

      <section id="about" className="process section-light" aria-labelledby="about-title">
        <div className="section-heading split">
          <div>
            <p className="section-label">About Us</p>
            <h2 id="about-title">Experienced and creative professionals.</h2>
          </div>
          <p>
            At LifeStyle Entertainment, we have a team of experienced and creative professionals who are dedicated to making your event a success. Our team consists of event planners, designers, and coordinators who work together to bring your vision to life. We are passionate about what we do and we strive to exceed your expectations at every stage of the planning process.
          </p>
        </div>
        <div className="process-grid">
          <article>
            <UsersRound size={26} />
            <h3>Planning team</h3>
            <p>Event planners, designers, and coordinators work together around the same vision.</p>
          </article>
          <article>
            <Disc3 size={26} />
            <h3>Entertainment network</h3>
            <p>Performers, musicians, DJs, magicians, live bands, and photo booth options for different occasions.</p>
          </article>
          <article>
            <Sparkles size={26} />
            <h3>Guest experience</h3>
            <p>Venue, food, timing, and entertainment details are planned to keep guests satisfied and impressed.</p>
          </article>
        </div>
      </section>

      <section id="solutions" className="services section-dark" aria-labelledby="solutions-title">
        <div className="section-heading split">
          <div>
            <p className="section-label">LifeStyle Solutions</p>
            <h2 id="solutions-title">Digital services for your online world.</h2>
          </div>
          <p>
            Welcome to LifeStyle Solutions, where we help you grow your online business like never before. With digital services, you can take your online presence to the next level, attracting more customers and increasing revenue.
          </p>
        </div>
        <div className="service-grid dark-grid">
          {solutions.map((solution) => (
            <article className="service-card dark-card" key={solution.title}>
              <ArrowUpRight size={28} />
              <h3>{solution.title}</h3>
              <p>{solution.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section-dark" aria-labelledby="contact-title">
        <div>
          <p className="section-label">Contact Us</p>
          <h2 id="contact-title">Get in touch.</h2>
          <p>
            Looking for top-notch entertainment for your next event? Contact LifeStyle Entertainment today for any question about events or any service request.
          </p>
        </div>
        <div className="contact-panel">
          <a href="mailto:info@lifestyleentertainmentllc.com">
            <Mail size={20} /> info@lifestyleentertainmentllc.com
          </a>
          <a href="https://rikoshahoud.wixsite.com/lifestyle-entertainm/contact-2" target="_blank" rel="noreferrer">
            <ArrowUpRight size={20} /> Current contact page
          </a>
          <a href="https://rikoshahoud.wixsite.com/lifestyle-entertainm/event-details" target="_blank" rel="noreferrer">
            <CalendarDays size={20} /> Event details and registration
          </a>
          <span><MapPin size={20} /> Available for event planning and service requests</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
