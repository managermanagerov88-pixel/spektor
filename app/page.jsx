
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const courseSettings = {
  p2p: {
    subtitle: "ФИНАНСЫ И КРИПТОВАЛЮТА",
    status: "СКОРО",
    active: false,
    visual: "p2p"
  },
  chatting: {
    subtitle: "COMMUNICATION",
    status: "ДОСТУПЕН",
    active: true,
    visual: "chatting"
  },
  ubt: {
    subtitle: "АРБИТРАЖ ТРАФИКА",
    status: "СКОРО",
    active: false,
    visual: "ubt"
  },
  goods: {
    subtitle: "МЕЖДУНАРОДНАЯ ТОРГОВЛЯ",
    status: "ДОСТУПЕН",
    active: true,
    visual: "goods"
  }
};

export default function Home() {
  const [logoOpacity, setLogoOpacity] = useState(0.9);
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("ПРОВЕРКА TELEGRAM...");
  const [courses, setCourses] = useState([]);
  const [coursesStatus, setCoursesStatus] = useState("ЗАГРУЗКА КУРСОВ...");

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 450, 1);
      setLogoOpacity(0.9 - progress * 0.78);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();

        if (!response.ok || !data.success || !Array.isArray(data.courses)) {
          throw new Error("Не удалось загрузить курсы");
        }

        const loadedCourses = data.courses
          .filter((course) => courseSettings[course.slug])
          .map((course) => {
            const settings = courseSettings[course.slug];

            return {
              id: String(course.id).padStart(2, "0"),
              title: course.title,
              description: course.description,
              price: course.price,
              subtitle: settings.subtitle,
              status: settings.status,
              active: settings.active,
              visual: settings.visual
            };
          });

        if (!cancelled) {
          setCourses(loadedCourses);
          setCoursesStatus("");
        }
      } catch (error) {
        console.error("Courses loading error:", error);

        if (!cancelled) {
          setCoursesStatus("НЕ УДАЛОСЬ ЗАГРУЗИТЬ КУРСЫ");
        }
      }
    };

    loadCourses();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let timer = null;
    let attempts = 0;
    let cancelled = false;
    let requestStarted = false;

    const authenticate = async () => {
      if (cancelled || requestStarted) return;

      const initData = window.Telegram?.WebApp?.initData;

      if (!initData) {
        attempts += 1;

        if (attempts < 40) {
          timer = setTimeout(authenticate, 250);
        } else if (!cancelled) {
          setAuthStatus("ОТКРОЙТЕ ЧЕРЕЗ TELEGRAM");
        }

        return;
      }

      requestStarted = true;
      setAuthStatus("АВТОРИЗАЦИЯ...");

      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ initData })
        });

        let data;

        try {
          data = await response.json();
        } catch {
          throw new Error(
            `СЕРВЕР ВЕРНУЛ НЕВЕРНЫЙ ОТВЕТ: ${response.status}`
          );
        }

        if (!response.ok || !data.success || !data.user) {
          throw new Error(
            data.error || `ОШИБКА СЕРВЕРА: ${response.status}`
          );
        }

        if (!cancelled) {
          setUser(data.user);
          setAuthStatus("АВТОРИЗОВАН");
        }
      } catch (error) {
        if (!cancelled) {
          setAuthStatus(
            error.message || "ОШИБКА СЕТИ"
          );
        }
      }
    };

    authenticate();

    return () => {
      cancelled = true;

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <main className="site">
      <style>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: #080808;
          color: #f5f5f5;
          font-family: Arial, sans-serif;
        }

        .site {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          isolation: isolate;
        }

        .background-logo {
          position: fixed;
          z-index: 0;
          pointer-events: none;
          top: 95px;
          left: 50%;
          transform: translateX(-50%);
          width: min(82vw, 850px);
          height: min(65vh, 650px);
          object-fit: contain;
          object-position: center;
          border: 0;
          background: transparent;
          transition: opacity 0.15s linear;
        }

        .header, .hero, .catalog, .footer {
          position: relative;
          z-index: 1;
        }

        .header {
          padding: 28px 7%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #242424;
        }

        .logo {
          font-size: 27px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        .logo span { color: #c7ff4d; }

        .header-label {
          color: #777;
          font-size: 10px;
          letter-spacing: 3px;
          text-align: right;
        }

        .auth-label {
          color: #c7ff4d;
          font-size: 9px;
          letter-spacing: 1px;
          margin-top: 7px;
          text-align: right;
          overflow-wrap: anywhere;
          max-width: 220px;
        }

        .hero {
          padding: 390px 7% 85px;
          max-width: 1200px;
          margin: auto;
        }

        .eyebrow {
          color: #c7ff4d;
          font-size: 11px;
          letter-spacing: 5px;
          margin-bottom: 25px;
        }

        .hero h1 {
          font-size: clamp(48px, 9vw, 94px);
          line-height: .98;
          letter-spacing: -5px;
          margin: 0;
          max-width: 850px;
        }

        .hero h1 span { color: #c7ff4d; }

        .hero p {
          color: #929292;
          font-size: 16px;
          line-height: 1.7;
          max-width: 430px;
          margin-top: 28px;
        }

        .catalog {
          padding: 35px 7% 110px;
          max-width: 1200px;
          margin: auto;
        }

        .catalog-label {
          color: #777;
          font-size: 11px;
          letter-spacing: 4px;
          margin-bottom: 16px;
        }

        .catalog h2 {
          font-size: clamp(30px, 5vw, 48px);
          margin: 0 0 38px;
          letter-spacing: -1.5px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .card {
          background: #111;
          border: 1px solid #292929;
          border-radius: 8px;
          overflow: hidden;
          color: inherit;
          text-decoration: none;
          transition: border-color .3s, transform .3s;
        }

        .card:hover {
          border-color: #c7ff4d;
          transform: translateY(-4px);
        }

        .cover {
          aspect-ratio: 16 / 9;
          position: relative;
          overflow: hidden;
          background: #101010;
          border-bottom: 1px solid #292929;
        }

        .cover-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #101010;
        }

        .card-content { padding: 25px; }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .category {
          color: #c7ff4d;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .status {
          font-size: 9px;
          letter-spacing: 1px;
          color: #c7ff4d;
          border: 1px solid #536b25;
          padding: 7px 9px;
          white-space: nowrap;
        }

        .status.soon {
          color: #888;
          border-color: #444;
        }

        .card h3 {
          font-size: 30px;
          margin: 28px 0 10px;
          letter-spacing: -1px;
        }

        .card-description {
          color: #888;
          font-size: 13px;
          line-height: 1.6;
          min-height: 42px;
        }

        .card-link {
          display: inline-block;
          margin-top: 23px;
          color: #c7ff4d;
          font-size: 11px;
          letter-spacing: 2px;
        }

        .soon-section {
          margin-top: 65px;
          padding: 30px;
          border: 1px solid #292929;
          background: #101010;
        }

        .soon-section h3 {
          font-size: 25px;
          margin: 0 0 12px;
        }

        .soon-section p {
          color: #888;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .footer {
          border-top: 1px solid #242424;
          padding: 30px 7%;
          color: #666;
          font-size: 10px;
          letter-spacing: 2px;
        }

        @media (max-width: 650px) {
          .header { padding: 24px 6%; }
          .logo { font-size: 23px; }
          .header-label { font-size: 8px; }

          .background-logo {
            top: 90px;
            width: 94vw;
            height: 250px;
          }

          .hero {
            padding: 275px 7% 65px;
          }

          .hero h1 { letter-spacing: -3px; }

          .catalog { padding: 25px 7% 80px; }
          .grid { grid-template-columns: 1fr; gap: 18px; }
          .card-content { padding: 22px; }
          .soon-section { padding: 24px; }
        }
      `}</style>

      <img
        src="/courses/58436AA0-2DCE-4060-A6F0-9A6E1CC46E8A.png"
        alt=""
        className="background-logo"
        style={{ opacity: logoOpacity }}
      />

      <header className="header">
        <div className="logo">
          SPEKTOR<span>.</span>
        </div>

        <div>
          <div className="header-label">DIGITAL EDUCATION</div>
          <div className="auth-label">
            {user ? `ПРИВЕТ, ${user.first_name}` : authStatus}
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">KNOWLEDGE. SKILLS. RESULTS.</div>

        <h1>
          LEVEL UP
          <br />
          YOUR <span>MIND.</span>
        </h1>

        <p>
          Практические знания и навыки,
          которые открывают новые возможности.
        </p>
      </section>

      <section className="catalog" id="courses">
        <div className="catalog-label">OUR PROGRAMS / 2026</div>
        <h2>Выбери своё направление.</h2>

        {coursesStatus ? (
          <p style={{ color: "#888", fontSize: "13px" }}>
            {coursesStatus}
          </p>
        ) : (
          <div className="grid">
            {courses.map((course) => (
              <Link
                className="card"
                key={course.id}
                href={`/courses/${course.visual}`}
              >
                <div className="cover">
                  <img
                    src={`/courses/${course.visual}.jpg`}
                    alt={course.title}
                    className="cover-image"
                  />
                </div>

                <div className="card-content">
                  <div className="card-top">
                    <div className="category">{course.subtitle}</div>
                    <div className={`status ${course.active ? "" : "soon"}`}>
                      {course.status}
                    </div>
                  </div>

                  <h3>{course.title}</h3>

                  <div className="card-description">
                    {course.description}
                  </div>

                  <div className="card-link">
                    {course.active ? "ПОДРОБНЕЕ" : "СКОРО"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="soon-section" id="coming-soon">
          <h3>Новые направления уже готовятся.</h3>
          <p>
            Мы работаем над программами P2P и УБТ.
            Информация о запуске появится здесь.
          </p>
        </div>

        <div id="chatting"></div>
        <div id="goods"></div>
      </section>

      <footer className="footer">
        © 2026 SPEKTOR. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
