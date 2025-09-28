import React, { useEffect, useState } from "react";
import "./App.css";
import SunIcon from "./assets/sun.png";
import MoonIcon from "./assets/moon.png";
import ProjectGrid from "./ProjectGrid";

function App() {
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    const fadeDelay = 1200;
    const fadeDuration = 800;
    const titleTimer = setTimeout(() => setTitleAnimated(true), 80);
    const fadeTimer = setTimeout(() => setSplashFading(true), fadeDelay);
    const hideTimer = setTimeout(
      () => setSplashVisible(false),
      fadeDelay + fadeDuration
    );

    document.documentElement.style.overflow = "hidden";

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <div id="root">
      {/* Splash Screen */}
      {splashVisible && (
        <div
          className={`splash-overlay ${splashFading ? "splash-hidden" : ""}`}
          aria-hidden={!splashVisible}
        >
          <div className={`splash-title ${titleAnimated ? "enter" : ""}`}>
            LITYO PUTRA SUDARSO
          </div>
        </div>
      )}

      {/* Header */}
      <header className="top-bar">
        <div className="brand">
          <a href="#about">LITYO PUTRA SUDARSO</a>
        </div>
        <div className={`island`} role="toolbar">
          <nav>
            <ul className="island-list">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-pressed={theme === "dark"}
                title={
                  theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <img
                  src={theme === "dark" ? SunIcon : MoonIcon}
                  className="theme-icon"
                  width="18"
                  height="18"
                  alt="theme toggle"
                />
              </button>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section id="about" className="portfolio-section">
          <div className="section-inner">
            <div className="section-index">01</div>
            <h2 className="section-title">About Me</h2>
            <div>
              <div className="about-hero">
                <div className="hero-left">
                  <div className="eyebrow">HELLO</div>
                  <h1 className="hero-title">
                    I'm Lityo Putra
                    <br />
                    Sudarso
                  </h1>
                  <p className="hero-text">
                    A driven Computer Science student that is hungry to learn and to improve through continuous learning and development. With a strong foundation to problem-solving and attention to detail, I am eager to contribute to impactful projects and deliver meaningful results.
                  </p>
                </div>
                <div className="hero-right">
                  <img
                    className="hero-photo"
                    src="/profile.jpg"
                    alt="Lityo Putra Sudarso"
                    width="160"
                    height="160"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="portfolio-section">
          <div className="section-inner">
            <div className="section-index">02</div>
            <h2 className="section-title">Academic Projects</h2>
            <div className="section-body">
              <p>
                Below are a few highlights from my academic projects.
              </p>
              <ProjectGrid />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
