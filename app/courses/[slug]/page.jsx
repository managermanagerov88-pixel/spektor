
import Link from "next/link";
import { notFound } from "next/navigation";
import PurchaseButton from "./PurchaseButton";

const courses = {
  p2p: {
    title: "P2P",
    status: "СКОРО",
    description: "Практическое обучение работе с P2P."
  },
  ubt: {
    title: "УБТ",
    status: "СКОРО",
    description: "Обучение арбитражу трафика и работе с рекламными источниками."
  },
  chatting: {
    title: "ЧАТТИНГ",
    status: "ДОСТУПЕН",
    description: "Практический курс для тех, кто хочет освоить профессию чаттера с нуля.\n\nТы узнаешь, как устроена работа на OnlyFans, научишься общаться с мемберами, выстраивать эффективные переписки, работать с платным контентом, проводить рассылки и увеличивать продажи.\n\nВ курсе разобраны основные инструменты чаттера, рабочие процессы, поиск вакансий и особенности заработка. Обучение подойдёт даже тем, кто раньше не сталкивался с этой сферой.\n\nВсё необходимое для старта в профессии чаттера в одном обучении."
  },
  goods: {
    title: "ТОВАРКА",
    status: "ДОСТУПЕН",
    description: "Обучение по заказу товаров в Россию из разных стран.\n\nВ курс также входит гайд по разблокировке аккаунта на Avito."
  }
};

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = courses[slug];

  if (!course) notFound();

  const isSoon = course.status === "СКОРО";

  return (
    <main className="course-page">
      <header className="course-header">
        <Link href="/" className="logo">SPEKTOR</Link>
        <Link href="/" className="back-link">КАТАЛОГ ↗</Link>
      </header>

      <section className="course-content">

        {isSoon ? (
          <div className="maintenance-visual">
            <div className="maintenance-glow" />
            <svg
              className="wrench-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94L14.7 6.3Z"
                stroke="#c7ff4d"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="maintenance-text">COMING SOON</div>
          </div>
        ) : (
          <div className="course-cover">
            <img
              src={`/courses/${slug}.jpg`}
              alt={course.title}
              className="course-cover-image"
            />
          </div>
        )}

        <div className="course-status">
          <span className={isSoon ? "status-dot soon" : "status-dot"} />
          {course.status}
        </div>

        <p className="course-label">ОБУЧЕНИЕ SPEKTOR</p>
        <h1>{course.title}</h1>

        {isSoon ? (
          <p className="course-description">
            Этот курс находится в разработке. Информация о запуске появится позже.
          </p>
        ) : (
          <p className="course-description">
            {course.description}
          </p>
        )}

        {!isSoon && <PurchaseButton courseSlug={slug} />}

        <Link href="/" className="back-button">
          ВЕРНУТЬСЯ В КАТАЛОГ
        </Link>
      </section>

      <footer className="course-footer">
        SPEKTOR © 2026
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .course-page {
          min-height: 100vh;
          background: #0b0c0f;
          color: #f5f5f5;
          padding: 0 7%;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
        }

        .course-header {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #25272c;
        }

        .logo {
          color: #f5f5f5;
          font-size: 25px;
          font-weight: 800;
          letter-spacing: 3px;
          text-decoration: none;
        }

        .back-link {
          color: #c7ff4d;
          font-size: 12px;
          letter-spacing: 1px;
          text-decoration: none;
        }

        .course-content {
          width: 100%;
          max-width: 850px;
          margin: auto;
          padding: 75px 0 100px;
        }

        .course-cover,
        .maintenance-visual {
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-bottom: 50px;
          overflow: hidden;
          position: relative;
          background: #101010;
          border: 1px solid #292929;
          border-radius: 8px;
        }

        .course-cover-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .maintenance-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 18px;
          background:
            radial-gradient(
              ellipse at center,
              #1b2610 0%,
              #101010 55%,
              #090909 100%
            );
        }

        .maintenance-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: #c7ff4d;
          opacity: .07;
          filter: blur(65px);
        }

        .wrench-icon {
          position: relative;
          width: 85px;
          height: 85px;
          filter: drop-shadow(0 0 15px rgba(199,255,77,.25));
        }

        .maintenance-text {
          position: relative;
          color: #777;
          font-size: 10px;
          letter-spacing: 5px;
        }

        .course-status {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #c7ff4d;
          font-size: 12px;
          letter-spacing: 2px;
          margin-bottom: 55px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c7ff4d;
        }

        .status-dot.soon {
          background: #777;
        }

        .course-label {
          color: #777;
          font-size: 11px;
          letter-spacing: 3px;
          margin-bottom: 15px;
        }

        h1 {
          font-size: clamp(48px, 10vw, 100px);
          line-height: 1;
          letter-spacing: -4px;
          margin: 0 0 35px;
          font-weight: 800;
        }

        .course-description {
          color: #b5b5b5;
          font-size: 17px;
          line-height: 1.8;
          white-space: pre-line;
          max-width: 700px;
          margin-bottom: 45px;
        }

        .back-button {
          display: inline-block;
          padding: 17px 24px;
          background: #c7ff4d;
          color: #10110d;
          text-decoration: none;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          transition: opacity 0.2s;
        }

        .back-button:hover {
          opacity: 0.8;
        }

        .course-footer {
          border-top: 1px solid #25272c;
          padding: 25px 0;
          color: #666;
          font-size: 11px;
          letter-spacing: 2px;
        }

        @media (max-width: 600px) {
          .course-page {
            padding: 0 6%;
          }

          .course-header {
            height: 75px;
          }

          .course-content {
            padding: 55px 0 80px;
          }

          .course-cover,
          .maintenance-visual {
            margin-bottom: 40px;
          }

          .course-status {
            margin-bottom: 40px;
          }

          .wrench-icon {
            width: 65px;
            height: 65px;
          }

          h1 {
            letter-spacing: -2px;
          }

          .course-description {
            font-size: 15px;
          }
        }
      `}</style>
    </main>
  );
}
