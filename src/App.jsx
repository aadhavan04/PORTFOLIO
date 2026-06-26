import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const g1Ref = useRef(null);

  useEffect(() => {
    // ── Navbar Scroll Handler ──
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // ── Custom Interactive Cursor Mechanics ──
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = `${mx}px`;
        curRef.current.style.top = `${my}px`;
      }
      if (g1Ref.current) {
        g1Ref.current.style.left = `${mx - 250}px`;
        g1Ref.current.style.top = `${my - 250}px`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Smooth physics loop frame execution via requestAnimationFrame
    let animationId;
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);

    // Hover Scaling Animations listeners
    const handleMouseEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '46px';
        ringRef.current.style.height = '46px';
        ringRef.current.style.opacity = '0.25';
      }
    };
    const handleMouseLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '28px';
        ringRef.current.style.height = '28px';
        ringRef.current.style.opacity = '0.5';
      }
    };

    const interactiveSelectors = document.querySelectorAll('a, button, .proj-card, .cert-card');
    interactiveSelectors.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // ── Intersection Observer for Skill Progress Bars ──
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.w;
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.bar-fill').forEach(b => barObserver.observe(b));

    // ── Intersection Observer for Section Fade Up Effects ──
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // Clean up memory allocations upon components unmounting cycle stage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      barObserver.disconnect();
      fadeObserver.disconnect();
      interactiveSelectors.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3200);
  };

  // ── Handle Secure Form Submission via FormSubmit AJAX Endpoint ──
  const onFormSubmit = async (e) => {
    e.preventDefault(); // Browser external page-ku refresh/redirect aavadha intercept panrom bro
    triggerToast("⏳ Sending message... please wait.");

    try {
      const response = await fetch("https://formsubmit.co/ajax/aadhavan142@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Contact Form Submission",
          message: formData.message
        })
      });

      const result = await response.json();

      if (response.ok) {
        triggerToast("✅ Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' }); // Form fields clean up reset
      } else {
        triggerToast("❌ Error sending message. Please try again.");
        console.error("FormSubmit Processing Error:", result);
      }
    } catch (error) {
      triggerToast("❌ Connection error! Check network thread.");
      console.error("Fetch Exception Hook Thread:", error);
    }
  };

  return (
    <>
      {/* Dynamic Ambient Graphics Layout */}
      <div className="glow-orb" id="g1" ref={g1Ref} style={{ top: '-150px', left: '-100px' }}></div>
      <div className="glow-orb" id="g2"></div>
      <div id="cur" ref={curRef}></div>
      <div id="cur-ring" ref={ringRef}></div>
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.message}</div>

      {/* ── NAVBAR SECTION ── */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-logo"><span>//</span>Aadhavan Portfolio</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#certifications">Certs</a>
          <a href="#contact" className="nav-hire">Hire Me ↗</a>
        </div>
      </nav>

      {/* ── HERO HERO HERO ── */}
      <div className="hero">
        <div className="hero-inner">
          <div>
            <div className="pill">
              <div className="dot-live"></div>
              <span className="pill-text">Open to Full Stack roles — 2026</span>
            </div>
            <h1 className="hero-name">
              Aadhavan<br />
              <em>R.</em>
            </h1>
            <p className="hero-sub">
              MERN Stack Developer based in Chennai, Tamil Nadu.<br />
              I build full-stack web apps — clean APIs, React UIs, and MongoDB schemas from idea to deployment.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-fill">View My Work →</a>
              <a href="#resume" className="btn-outline">📄 Resume</a>
              <a href="#contact" className="btn-outline">Let's Talk</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="profile-photo-placeholder">
              <img 
      src="/dp.jpeg" 
      alt="Aadhavan R Profile" 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        borderRadius: '50%'
      }}
      onError={(e) => { 
        // Image local-la load aagalana custom letter/emoji backup fallback
        e.target.style.display = 'none';
      }} 
    />
              <div className="photo-badge">✓</div>
            </div>
            <div className="card-name">Aadhavan R</div>
            <div className="card-role">MERN_STACK_DEVELOPER</div>
            <div className="card-divider"></div>
            <div className="card-stats">
              <div className="cs"><div className="cs-n">3+</div><div className="cs-l">Projects</div></div>
              <div className="cs"><div className="cs-n">4</div><div className="cs-l">Core Tech</div></div>
              <div className="cs"><div className="cs-n">∞</div><div className="cs-l">Learning</div></div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </div>

      <div className="sec-divider"></div>

      {/* ── ABOUT SECTION ── */}
      <section className="section" id="about">
        <div className="section-inner fade-up">
          <div className="eyebrow">Who I Am</div>
          <h2 className="sec-h">About <em>Me</em></h2>
          <div className="about-grid">
            <div className="about-photo-frame">
              {/* Ensure your profile photo exists in public/ folder */}
              <img src="/dp.jpeg" alt="Aadhavan R" onError={(e) => { e.target.style.display='none' }} />
              <div className="about-frame-glow"></div>
            </div>
            
            <div className="about-content">
              <p>
                Hey! I'm <strong>Aadhavan R</strong> — a passionate MERN FULL STACK DEVELOPER from <strong>Chennai, Tamil Nadu</strong>. I recently completed my <strong>B.Com (Corporate Secretaryship)</strong> at Kumararani Meena Muthiah College of Arts & Science (2026) and have been deep in the MERN stack ever since.
              </p>
              <p>
                I specialize in building end-to-end web applications with <strong>MongoDB, Express.js, React.js, and Node.js</strong>. My Capstone project — a full Health & Wellness platform with JWT auth and REST API — captures exactly what I love: putting all the pieces together and seeing something live.
              </p>
              <p>
                I'm actively seeking my <strong>first Full Stack Developer role</strong> where I can contribute meaningfully, learn fast, and grow with a great team.
              </p>
              <div className="about-facts">
                <div className="fact-item">
                  <div className="fact-label">Education</div>
                  <div className="fact-val">B.Com (CS) · 2026</div>
                </div>
                <div className="fact-item">
                  <div className="fact-label">Location</div>
                  <div className="fact-val">Chennai, Tamil Nadu</div>
                </div>
                <div className="fact-item">
                  <div className="fact-label">Status</div>
                  <div className="fact-val" style={{ color: 'var(--neon)' }}>✦ Open to Work</div>
                </div>
              </div>
              <div className="tags-row">
                <span className="tag">Full Stack Dev</span>
                <span className="tag">REST APIs</span>
                <span className="tag">React.js</span>
                <span className="tag">Node.js</span>
                <span className="tag">MongoDB</span>
                <span className="tag">Express.js</span>
                <span className="tag">JWT Auth</span>
                <span className="tag">Git & GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      {/* ── TECH SKILLS SECTION ── */}
      <section className="section" id="skills">
        <div className="section-inner fade-up">
          <div className="eyebrow">What I Know</div>
          <h2 className="sec-h">Tech <em>Stacks</em></h2>
          <div className="skills-layout">
            <div className="skill-box">
              <div className="skill-box-title">Technical Skills</div>
              <div className="skill-rows">
                <div className="skill-row">
                  <div className="skill-emoji">⚛</div>
                  <div className="skill-info">
                    <div className="skill-name">React.js <span className="skill-pct">85%</span></div>
                    <div className="bar-bg"><div className="bar-fill" data-w="85%"></div></div>
                  </div>
                </div>
                <div className="skill-row">
                  <div className="skill-emoji">⬡</div>
                  <div className="skill-info">
                    <div className="skill-name">Node.js <span className="skill-pct">78%</span></div>
                    <div className="bar-bg"><div className="bar-fill" data-w="78%"></div></div>
                  </div>
                </div>
                <div className="skill-row">
                  <div className="skill-emoji">🍃</div>
                  <div className="skill-info">
                    <div className="skill-name">MongoDB <span className="skill-pct">75%</span></div>
                    <div className="bar-bg"><div className="bar-fill" data-w="75%"></div></div>
                  </div>
                </div>
                <div className="skill-row">
                  <div className="skill-emoji">🔁</div>
                  <div className="skill-info">
                    <div className="skill-name">Express.js <span className="skill-pct">80%</span></div>
                    <div className="bar-bg"><div className="bar-fill" data-w="80%"></div></div>
                  </div>
                </div>
                <div className="skill-row">
                  <div className="skill-emoji">🌐</div>
                  <div className="skill-info">
                    <div className="skill-name">HTML / CSS / JavaScript <span className="skill-pct">90%</span></div>
                    <div className="bar-bg"><div className="bar-fill" data-w="90%"></div></div>
                  </div>
                </div>
                <div className="skill-row">
                  <div className="skill-emoji">🔧</div>
                  <div className="skill-info">
                    <div className="skill-name">Git & GitHub <span className="skill-pct">72%</span></div>
                    <div className="bar-bg"><div className="bar-fill" data-w="72%"></div></div>
                  </div>
                </div>
              </div>
              <div className="tools-row">
                <span className="tool-chip">VS Code</span>
                <span className="tool-chip">Postman</span>
                <span className="tool-chip">Netlify</span>
                <span className="tool-chip">Render</span>
                <span className="tool-chip">REST APIs</span>
                <span className="tool-chip">JWT</span>
              </div>
            </div>
            
            <div className="skill-box">
              <div className="skill-box-title">Soft Skills</div>
              <div className="soft-tiles">
                <span className="soft-tile">Team Collaboration</span>
                <span className="soft-tile">Fast Learner</span>
                <span className="soft-tile">Communication</span>
                <span className="soft-tile">Time Management</span>
                <span className="soft-tile">Adaptability</span>
                <span className="soft-tile">Critical Thinking</span>
                <span className="soft-tile">Self-Motivated</span>
                <span className="soft-tile">Open to Feedback</span>
                <span className="soft-tile">Data Accuracy</span>
                <span className="soft-tile">Documentation</span>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div className="skill-box-title" style={{ marginBottom: '1rem' }}>Languages</div>
                <div className="soft-tiles">
                  <span className="soft-tile">Tamil (Native)</span>
                  <span className="soft-tile">English (Professional)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      {/* ── SELECTED PROJECTS ── */}
      <section className="section" id="projects">
        <div className="section-inner fade-up">
          <div className="eyebrow">What I've Built</div>
          <h2 className="sec-h">Selected <em>Projects</em></h2>
          <div className="proj-grid">
            
            {/* CAPSTONE PLATFORM */}
            <div className="proj-card capstone">
              <div className="proj-body">
                <div className="proj-badge-row">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="proj-badge badge-cap">Capstone</span>
                    <span className="proj-badge badge-mern">Full Stack · MERN</span>
                  </div>
                  <div className="proj-links-row">
                    <a href="https://project3-health-and-wellness.netlify.app/" target="_blank" rel="noreferrer" className="plink">🌐 Live Demo</a>
                    <a href="https://github.com/aadhavan04/FRONTEND.." target="_blank" rel="noreferrer" className="plink">⌥ Frontend</a>
                    <a href="https://github.com/aadhavan04/BACKEND.." target="_blank" rel="noreferrer" className="plink">⎔ Backend</a>
                  </div>
                </div>
                <div className="proj-title">Health & Wellness Platform</div>
                <div className="proj-desc">
                 Health & Wellness Web Application is a full-stack web application built using the MERN stack 
                 (MongoDB, Express, React, Node.js), designed to help users track and manage their personal health and wellness routines. 
                 The platform features secure user authentication, personalized dashboards, and tools for tracking health metrics, goals, and activities, all backed by RESTful APIs and a responsive, user-friendly interface. 
                 The application is fully deployed end-to-end, showcasing strong full-stack development skills across frontend design, backend architecture, database management, and production deployment.
                </div>
                <div className="proj-stack">
                  <span className="stack-chip">React.js</span>
                  <span className="stack-chip">Node.js</span>
                  <span className="stack-chip">Express.js</span>
                  <span className="stack-chip">MongoDB</span>
                  <span className="stack-chip">JWT Auth</span>
                  <span className="stack-chip">REST API</span>
                  <span className="stack-chip">Netlify</span>
                  <span className="stack-chip">Render</span>
                </div>
              </div>
              <div className="capstone-visual">
                <div className="cv-title">Project Details</div>
                <div className="cv-stats">
                  <div className="cv-stat"><span className="cv-stat-label">Type</span><span className="cv-stat-val">Full Stack</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Auth</span><span className="cv-stat-val">JWT</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">DB</span><span className="cv-stat-val">MongoDB</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Deployed</span><span className="cv-stat-val">✓ Live</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Status</span><span className="cv-stat-val" style={{ color: 'var(--neon)' }}>Active</span></div>
                </div>
              </div>
            </div>

            {/* PROJECT 2 */}
            <div className="proj-card">
              <div className="proj-badge-row">
                <span className="proj-badge badge-fe">Full Stack · MERN</span>
              </div>
              <div className="proj-links-row">
                <a href="https://b2b-billing-software-frontend.onrender.com" target="_blank" rel="noreferrer" className="plink">🌐 Live</a>
                <a href="https://github.com/aadhavan04/B2B-BILLING-SOFTWARE-FRONTEND" target="_blank" rel="noreferrer" className="plink">⌥ Frontend</a>
                <a href="https://github.com/aadhavan04/B2B-BILLING-SOFTWARE-BACKEND" target="_blank" rel="noreferrer" className="plink">⎔ Backend</a>
              </div>
              <div className="proj-title">B2B BILLING SOFTWARE Web App</div>
              <div className="proj-desc">
                B2B Billing Software is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js), 
                designed to streamline invoicing and inventory management between manufacturers and retailers/suppliers — a true Business-to-Business (B2B) solution. 
                The platform supports company and customer/supplier management, product inventory tracking, sales and purchase transactions with return handling, expense tracking, and a dashboard with date-range-filtered analytics.
                 It features secure JWT-based authentication, RESTful APIs for all core modules, and Excel export functionality for reports. 
                 The application is deployed using Render for both backend and frontend, with MongoDB Atlas as the cloud database, demonstrating end-to-end full-stack development and deployment skills.
              </div>
              <div className="proj-stack">
                <span className="stack-chip">React.js</span>
                <span className="stack-chip">JavaScript</span>
                <span className="stack-chip">CSS3</span>
                <span className="stack-chip">React Hooks</span>
                <span className="stack-chip">Netlify</span>
              </div>
              <div className="capstone-visual">
                <div className="cv-title">Project Details</div>
                <div className="cv-stats">
                  <div className="cv-stat"><span className="cv-stat-label">Type</span><span className="cv-stat-val">Full Stack</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Auth</span><span className="cv-stat-val">JWT</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">DB</span><span className="cv-stat-val">MongoDB</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Deployed</span><span className="cv-stat-val">✓ Live</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Status</span><span className="cv-stat-val" style={{ color: 'var(--neon)' }}>Active</span></div>
                </div>
              </div>
            </div>

            {/* PROJECT 3 */}
            <div className="proj-card">
              <div className="proj-badge-row">
                <span className="proj-badge badge-fe">Full Stack · MERN</span>
              </div>
              <div className="proj-links-row">
                <a href="https://meghacabs-frontend.onrender.com/" target="_blank" rel="noreferrer" className="plink">🌐 Live</a>
                <a href="https://github.com/aadhavan04/meghacabs-frontend" target="_blank" rel="noreferrer" className="plink">⌥ GitHub</a>
                <a href="https://github.com/aadhavan04/meghacabs-backend" target="_blank" rel="noreferrer" className="plink">⎔ Backend</a>
              </div>
              <div className="proj-title">CAB SERVICE WEB APP</div>
              <div className="proj-desc">
              Megha Cabs is a full-stack cab booking web application built using the MERN stack (MongoDB, Express, React, Node.js), 
              designed to provide a seamless ride-booking experience similar to popular cab aggregator platforms.
              The platform allows users to search for rides, book cabs, and manage bookings through a clean, responsive interface, backed by RESTful APIs and secure authentication.
              The application is deployed in production with the frontend hosted on Vercel and the backend on Render, connected to a 
              custom domain (meghacabs.co.in), and integrated with Google Search Console for SEO indexing — demonstrating real-world deployment, domain configuration, and full-stack development skills.
              </div>
              <div className="proj-stack">
                <span className="stack-chip">React.js</span>
                <span className="stack-chip">JavaScript</span>
                <span className="stack-chip">CSS3</span>
                <span className="stack-chip">Component Design</span>
                <span className="stack-chip">Netlify</span>
              </div>
              <div className="capstone-visual">
                <div className="cv-title">Project Details</div>
                <div className="cv-stats">
                  <div className="cv-stat"><span className="cv-stat-label">Type</span><span className="cv-stat-val">Full Stack</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Auth</span><span className="cv-stat-val">JWT</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">DB</span><span className="cv-stat-val">MongoDB</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Deployed</span><span className="cv-stat-val">✓ Live</span></div>
                  <div className="cv-stat"><span className="cv-stat-label">Status</span><span className="cv-stat-val" style={{ color: 'var(--neon)' }}>Active</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      {/* ── RESUME HUB ── */}
      <section className="section" id="resume" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="section-inner fade-up">
          <div className="eyebrow">Career</div>
          <h2 className="sec-h" style={{ marginBottom: '1.5rem' }}>My <em>Resume</em></h2>
          <div className="resume-card">
            <div className="resume-info">
              <h3>Aadhavan R — MERN Stack Developer</h3>
              <p>B.Com (CS) · GUVI Full Stack Certified<br />
              Available for Full Stack Developer roles — Chennai, Tamil Nadu (Remote / Hybrid / On-site)</p>
              <div className="resume-skills-row">
                <span className="rs-chip">React.js</span>
                <span className="rs-chip">Node.js</span>
                <span className="rs-chip">MongoDB</span>
                <span className="rs-chip">Express.js</span>
                <span className="rs-chip">REST APIs</span>
                <span className="rs-chip">JWT</span>
                <span className="rs-chip">Git</span>
              </div>
            </div>
            <div className="resume-actions">
              <a href="/UPDATED RESUME.pdf" download="UPDATED RESUME.pdf" className="btn-resume-dl">
                ⬇ Download PDF
              </a>
              <a href="https://drive.google.com/file/d/1CLb_Mmd23eYP9ShFi-9UU9gH3amt1fqT/" target="_blank" rel="noreferrer" className="btn-resume-vw">
                👁 View Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      {/* ── CERTIFICATIONS ── */}
      <section className="section" id="certifications">
        <div className="section-inner fade-up">
          <div className="eyebrow">Credentials</div>
          <h2 className="sec-h">Certifi<em>cations</em></h2>
          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-icon ci-guvi">🎓</div>
              <div className="cert-name">MERN Stack Development</div>
              <div className="cert-issuer">GUVI Geek Networks · IIT-M Pravartak</div>
              <div className="cert-date">2024 — 2025</div>
              <div className="cert-verified">✓ Verified</div>
            </div>

            <div className="cert-card">
              <div className="cert-icon ci-guvi">⚛</div>
              <div className="cert-name">React.js Frontend Development</div>
              <div className="cert-issuer">GUVI Geek Networks</div>
              <div className="cert-date">2024</div>
              <div className="cert-verified">✓ Verified</div>
            </div>

            <div className="cert-card">
              <div className="cert-icon ci-guvi">🌐</div>
              <div className="cert-name">Full Stack Web Development</div>
              <div className="cert-issuer">GUVI Geek Networks</div>
              <div className="cert-date">2025</div>
              <div className="cert-verified">✓ Verified</div>
            </div>

            <div className="cert-card">
              <div className="cert-icon ci-ibm">🤖</div>
              <div className="cert-name">Fundamentals of Artificial Intelligence</div>
              <div className="cert-issuer">IBM SkillsBuild</div>
              <div className="cert-date">2024</div>
              <div className="cert-verified">✓ Verified</div>
            </div>

            <div className="cert-card">
              <div className="cert-icon ci-nm">💳</div>
              <div className="cert-name">Fintech — Financial Technology</div>
              <div className="cert-issuer">Naan Mudhalvan · Govt. of Tamil Nadu</div>
              <div className="cert-date">2024</div>
              <div className="cert-verified">✓ Verified</div>
            </div>

            <div className="cert-card">
              <div className="cert-icon ci-ms">📊</div>
              <div className="cert-name">Microsoft Office Fundamentals</div>
              <div className="cert-issuer">Naan Mudhalvan · Microsoft</div>
              <div className="cert-date">2024</div>
              <div className="cert-verified">✓ Verified</div>
            </div>

            <div className="cert-card">
              <div className="cert-icon ci-nm">🏦</div>
              <div className="cert-name">Banking & Back Office Operations</div>
              <div className="cert-issuer">Naan Mudhalvan · Govt. of Tamil Nadu</div>
              <div className="cert-date">2023</div>
              <div className="cert-verified">✓ Verified</div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      {/* ── CONTACT FORM MANAGE ── */}
      <section className="section" id="contact">
        <div className="section-inner fade-up">
          <div className="eyebrow">Let's Connect</div>
          <h2 className="sec-h">Get In <em>Touch</em></h2>
          <div className="contact-layout">
            <div>
              <div className="contact-left-title">Looking for my first <em>professional role.</em></div>
              <p>I'm actively open to Full Stack Developer opportunities. Whether you have a project, a job opening, or just want to say hi — my inbox is always open!</p>
              <div className="social-stack">
                <a href="mailto:aadhavan142@gmail.com" className="soc-link">
                  <div className="soc-icon">✉</div>
                  <div className="soc-info">
                    <div className="soc-label">Email</div>
                    <div className="soc-val">aadhavan142@gmail.com</div>
                  </div>
                  <span className="soc-arr">↗</span>
                </a>
                <a href="https://github.com/aadhavan04" target="_blank" rel="noreferrer" className="soc-link">
                  <div className="soc-icon">⌥</div>
                  <div className="soc-info">
                    <div className="soc-label">GitHub</div>
                    <div className="soc-val">github.com/aadhavan04</div>
                  </div>
                  <span className="soc-arr">↗</span>
                </a>
                <a href="https://linkedin.com/in/aadhavan-r-b64456289/" target="_blank" rel="noreferrer" className="soc-link">
                  <div className="soc-icon">💼</div>
                  <div className="soc-info">
                    <div className="soc-label">LinkedIn</div>
                    <div className="soc-val">Aadhavan R</div>
                  </div>
                  <span className="soc-arr">↗</span>
                </a>
              </div>
            </div>

            {/* Server-less Form Submissions connected natively via AJAX/Fetch Hook Layer */}
            <form className="contact-form" onSubmit={onFormSubmit}>
              <div className="form-heading">Send me a message ✉</div>

              <div className="form-row">
                <div className="fg">
                  <label>Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="fg">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="your@email.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="fg">
                <label>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Job opportunity" 
                  value={formData.subject} 
                  onChange={handleChange} 
                />
              </div>

              <div className="fg">
                <label>Message</label>
                <textarea 
                  name="message" 
                  placeholder="Tell me about the role or project..." 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-send">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <span className="f-left">© 2026 Aadhavan R · All rights reserved.</span>
        <span className="f-right">Built with <span className="f-heart">♥</span> · Chennai, TN</span>
      </footer>
    </>
  );
}