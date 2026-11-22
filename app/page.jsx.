
const courses = [
  {
    id: 1,
    category: "FINANCE",
    title: "P2P",
    description: "Практическое обучение работе с P2P.",
    number: "01"
  },
  {
    id: 2,
    category: "COMMUNICATION",
    title: "CHATTING",
    description: "Обучение общению и работе в чатинге.",
    number: "02"
  }
];

export default function Home() {
  return (
    <main>
      <header style={{
        padding: "28px 7%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #222"
      }}>
        <h2 style={{letterSpacing: "4px", fontWeight: 800}}>
          SPEKTOR<span style={{color:"#c7ff4d"}}>.</span>
        </h2>
        <span style={{color:"#858585", fontSize:12}}>
          DIGITAL EDUCATION
        </span>
      </header>

      <section style={{
        padding: "100px 7% 80px",
        maxWidth: 1100,
        margin: "auto"
      }}>
        <p style={{
          color:"#c7ff4d",
          letterSpacing:4,
          fontSize:12,
          marginBottom:24
        }}>
          KNOWLEDGE. SKILLS. RESULTS.
        </p>

        <h1 style={{
          fontSize:"clamp(48px, 9vw, 100px)",
          lineHeight:0.98,
          letterSpacing:"-5px",
          maxWidth:850
        }}>
          LEVEL UP<br/>
          YOUR <span style={{color:"#c7ff4d"}}>MIND.</span>
        </h1>

        <p style={{
          color:"#999",
          fontSize:16,
          lineHeight:1.7,
          maxWidth:440,
          marginTop:30
        }}>
          Практические знания и навыки,
          которые открывают новые возможности.
        </p>

        <a href="#courses" style={{
          display:"inline-block",
          background:"#c7ff4d",
          color:"#090909",
          padding:"17px 28px",
          borderRadius:4,
          fontWeight:800,
          marginTop:35
        }}>
          СМОТРЕТЬ КУРСЫ ↗
        </a>
      </section>

      <section id="courses" style={{
        padding:"60px 7% 110px",
        maxWidth:1100,
        margin:"auto"
      }}>
        <p style={{
          color:"#858585",
          fontSize:12,
          letterSpacing:3,
          marginBottom:15
        }}>
          OUR PROGRAMS
        </p>

        <h2 style={{
          fontSize:36,
          marginBottom:35
        }}>
          Выбери своё направление.
        </h2>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",
          gap:18
        }}>
          {courses.map(course => (
            <article key={course.id} style={{
              background:"#141414",
              border:"1px solid #292929",
              borderRadius:8,
              padding:28,
              minHeight:230,
              transition:"border-color .3s"
            }}>
              <p style={{color:"#c7ff4d", fontSize:12}}>
                {course.category} / {course.number}
              </p>
              <h3 style={{
                fontSize:34,
                marginTop:35,
                letterSpacing:1
              }}>
                {course.title}
              </h3>
              <p style={{
                color:"#999",
                fontSize:14,
                marginTop:12,
                lineHeight:1.6
              }}>
                {course.description}
              </p>
              <p style={{
                color:"#c7ff4d",
                marginTop:25,
                fontSize:13
              }}>
                ПОДРОБНЕЕ ↗
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer style={{
        padding:"30px 7%",
        borderTop:"1px solid #222",
        color:"#666",
        fontSize:12,
        letterSpacing:2
      }}>
        © 2026 SPEKTOR. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
