
import Link from "next/link";
import { notFound } from "next/navigation";

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

        <Link href="/" className="back-button">
          ВЕРНУТЬСЯ В КАТАЛОГ
        </Link>
      </section>

      <footer className="course-footer">
        SPEKTOR © 2026
      </footer>

      <style jsx>{`
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
          padding: 100px 0;
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
            padding: 80px 0;
          }

          .course-status {
            margin-bottom: 40px;
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
