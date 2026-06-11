import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, CalendarDays, Disc3, Mail, MapPin, Music2, Sparkles, Star, UsersRound } from 'lucide-react';
import './styles.css';

const wixMedia = {
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

const showcases = [
  {
    eyebrow: 'Latest Event',
    title: 'Cursed Beats: our latest event with the best DJ in PA, DJ Eli.',
    image: wixMedia.eventA,
    tags: ['DJ Eli', 'PA nightlife', 'Event planning']
  },
  {
    eyebrow: 'Featured Theme',
    title: 'In Valentine: The Art Of Entertainment.',
    image: wixMedia.eventB,
    tags: ['Entertainment', 'Atmosphere', 'Celebration']
  },
  {
    eyebrow: 'Guest Flow',
    title: 'Event details and registration built around doors-open energy.',
    image: wixMedia.eventC,
    tags: ['Registration', 'Doors open', 'Guest flow']
  },
  {
    eyebrow: 'LifeStyle Media',
    title: 'Real visuals from the original LifeStyle Entertainment site.',
    image: wixMedia.eventD,
    tags: ['Media', 'Promotion', 'Brand presence']
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
          <img src={wixMedia.logo} alt="LifeStyle Entertainment" />
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
        <img className="hero-media" src={wixMedia.hero} alt="LifeStyle Entertainment event visual" />
        <div className="hero-content">
          <p className="kicker">LifeStyle Entertainment | Event planning</p>
          <h1><span>Promote</span><span>and plan</span><span>events.</span></h1>
          <p className="hero-copy">
            Looking for top-notch entertainment for your next event? LifeStyle Entertainment brings performers, musicians, DJs, venues, catering, and planning support together for occasions that feel complete.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">Contact us <ArrowUpRight size={18} /></a>
            <a className="button ghost" href="#events">View events</a>
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
        <h2 id="intro-title">The original content, rebuilt as a richer digital experience.</h2>
        <p>
          The Wix site’s event planning, services, about, contact, and LifeStyle Solutions content now lives in GitHub with real media from the source site and a more immersive interaction layer.
        </p>
      </section>

      <section id="services" className="services section-light" aria-labelledby="services-title">
        <div className="section-heading">
          <p className="section-label">Services</p>
          <h2 id="services-title">Entertainment, venue selection, catering, and event planning.</h2>
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
          <p className="section-label">Events</p>
          <h2 id="events-title">Media-led moments from the LifeStyle site.</h2>
          <p>The old site had the pieces. This version gives them movement, scale, and a reason to keep scrolling.</p>
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
          <img src={wixMedia.eventD} alt="LifeStyle Entertainment visual from original website" loading="lazy" />
        </div>
        <div>
          <p className="section-label">About Us</p>
          <h2 id="about-title">Experienced and creative professionals.</h2>
          <p>
            At LifeStyle Entertainment, we have a team of experienced and creative professionals who are dedicated to making your event a success. Our team consists of event planners, designers, and coordinators who work together to bring your vision to life. We are passionate about what we do and we strive to exceed your expectations at every stage of the planning process.
          </p>
        </div>
      </section>

      <section id="solutions" className="solutions section-dark" aria-labelledby="solutions-title">
        <img className="solutions-media" src={wixMedia.solutions} alt="LifeStyle Solutions visual" loading="lazy" />
        <div className="section-heading split">
          <div>
            <p className="section-label">LifeStyle Solutions</p>
            <h2 id="solutions-title">Digital services for your online world.</h2>
          </div>
          <p>
            Welcome to LifeStyle Solutions, where we help you grow your online business like never before. With digital services, you can take your online presence to the next level, attracting more customers and increasing revenue.
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
          <h2 id="contact-title">Get in touch.</h2>
          <p>Looking for top-notch entertainment for your next event? Contact LifeStyle Entertainment today for any question about events or any service request.</p>
        </div>
        <div className="contact-panel">
          <a href="mailto:info@lifestyleentertainmentllc.com"><Mail size={20} /> info@lifestyleentertainmentllc.com</a>
          <a href="https://rikoshahoud.wixsite.com/lifestyle-entertainm/contact-2" target="_blank" rel="noreferrer"><ArrowUpRight size={20} /> Current contact page</a>
          <a href="https://rikoshahoud.wixsite.com/lifestyle-entertainm/event-details" target="_blank" rel="noreferrer"><CalendarDays size={20} /> Event details and registration</a>
          <span><MapPin size={20} /> Available for event planning and service requests</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
