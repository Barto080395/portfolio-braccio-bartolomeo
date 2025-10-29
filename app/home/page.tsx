"use client";
import { useState } from "react";
import Image from "next/image";
import FilterSearch from "../Shared/components/FilterSearch";
import Card, { CardsGrid } from "../Shared/components/Cards";
import { styled } from "@mui/system";
import HobbySection from "./hobby/hobby";
import { useGlobalStore } from "../State/GlobalContext";
import Animated from "../Shared/components/Animated";

const Container = styled("div")({
  fontFamily: "'Poppins', sans-serif",
  padding: "10px",
  borderRadius: "10px",
  maxWidth: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxSizing: "border-box",

  "@media (min-width: 768px)": {
    padding: "20px",
    maxWidth: 1500,
  },
});

/* HEADER */
const Header = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  background: "rgba(63, 81, 181, 0.3)",
  padding: "15px",
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 1.5)",
  borderRadius: "10px",
  textAlign: "center",

  "@media (min-width: 768px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "left",
  },
});

const HeaderLeft = styled("div")({
  color: "#B8860B",
  fontWeight: 700,
  fontSize: "clamp(1rem, 1.6vw, 1.5rem)",
  letterSpacing: "0.5px",
});

const HeaderCenter = styled("div")({
  flex: 1,
  padding: "0 20px",
});

const HeaderRight = styled("div")({
  color: "#000",
  fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
  lineHeight: 1.5,
  textAlign: "right",
});

const Main = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  flexWrap: "wrap",
  "@media (min-width: 768px)": {
    flexDirection: "row",
    flexWrap: "nowrap", //forza per restare sulla stessa riga
    gap: "20px",
  },
});

const Hero = styled("div")<{ hovered: boolean }>(({ hovered }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // centra verticalmente tutto
  flex: "1 1 50%",
  padding: "30px",
  color: "#ffffff",
  textShadow: "0 2px 6px rgba(0,0,0,1.5)",
  borderRadius: "10px",
  overflow: "hidden",
  textAlign: "center", // centra orizzontalmente testo e bottoni
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: hovered ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)",
    zIndex: 1,
  },
  "& video": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    pointerEvents: "none",
    filter: "brightness(1) contrast(1.1)",
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

const HeroTitle = styled("h1")({
  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
  marginBottom: "15px",
  fontWeight: "bold",
});

const HeroText = styled("p")({
  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
  marginBottom: "20px",
  color: "#ffffff",
});

const ButtonWrapper = styled("div")({
  whiteSpace: "nowrap", // forza i bottoni sulla stessa riga
});

const HeroButton = styled("button")<{
  hovered: boolean;
  cursor: "default" | "pointer" | "grab" | "grabbing";
}>(({ hovered, cursor }) => ({
  display: "inline-block",
  margin: "0 10px",
  background: "none",
  border: "none",
  padding: 0,
  color: hovered ? "#FFD700" : "#B8860B", // colore oro chiaro di default
  fontWeight: "bold",
  fontSize: "clamp(0.9rem, 1vw, 1rem)",
  cursor: cursor ?? "pointer",
  textAlign: "center",
  transform: hovered ? "scale(1.1)" : "scale(1)",
  transition: "transform 0.2s ease, color 0.2s ease",
}));

const CvButton = styled("button")<{
  hovered: boolean;
  cursor: "default" | "pointer" | "grab" | "grabbing";
}>(({ hovered, cursor }) => ({
  display: "inline-block",
  margin: "0 10px",
  background: "none",
  border: "none",
  padding: 0,
  color: hovered ? "#FFD700" : "#B8860B", // colore oro chiaro di default
  fontWeight: "bold",
  fontSize: "clamp(0.9rem, 1vw, 1rem)",
  cursor: cursor ?? "pointer",
  textAlign: "center",
  transform: hovered ? "scale(1.1)" : "scale(1)",
  transition: "transform 0.2s ease, color 0.2s ease",
}));

const Projects = styled("div")({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "15px",
  maxWidth: "100%",
});

const Footer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  "@media (min-width: 1024px)": {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "30px",
  },
});

const ProfileCard = styled("div")({
  flexShrink: 0,
  background: "rgba(0,0,0,0.3)",
  padding: "40px",
  color: "#000",
  textAlign: "center",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 1.5)",
  borderRadius: "10px",
  transition: "all 0.2s ease",
});

const ProfileName = styled("div")({
  fontSize: "1.3rem",
  fontWeight: "bold",
  marginBottom: "5px",
});

const ProfileRole = styled("div")({
  fontSize: "0.95rem",
  color: "#FFD166",
  marginBottom: "15px",
});

const PersonalInfo = styled("div")({
  fontSize: "0.9rem",
  lineHeight: 1.5,
  marginBottom: "15px",
});

const ProfileImage = styled(Image)({
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #FFD166",
  marginBottom: "10px",
});

const ProfileLinks = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  flexWrap: "wrap",
});

const LinkButton = styled("a")({
  background: "#FFD166",
  padding: "6px 12px",
  borderRadius: "6px",
  color: "#000",
  textDecoration: "none",
  fontSize: "0.8rem",
  border: "1px solid black",
});

const InfoSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  flex: 1,
  "@media (min-width: 768px)": { flexDirection: "row", gap: "20px" },
});

const Description = styled("div")({
  flex: "1 1 300px",
  background: "rgba(0,0,0,0.35)",
  padding: "18px 20px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 1.5)",
  borderRadius: "10px",
  color: "#000",
  fontSize: "1.2rem",
  lineHeight: 1.6,
  "&::before": {
    content: '"📜 Descrizione"',
    display: "block",
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "10px",
    color: "#FFD166",
  },
});

const Skills = styled("div")({
  flex: "1 1 300px",
  background: "rgba(0,0,0,0.35)",
  padding: "18px 20px",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 1.5)",
  borderRadius: "10px",
  color: "#000",
  fontSize: "1.2rem",
  "&::before": {
    content: '"💡 Competenze Tecniche"',
    display: "block",
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "10px",
    color: "#FFD166",
  },
  "& ul": { paddingLeft: "20px", margin: 0 },
  "& li": { marginBottom: "5px" },
});

const HobbyWrapper = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "5px",
  "@media (min-width: 768px)": { flexDirection: "row", gap: "15px" },
});

const Portofolio = () => {
  const [searchInput, setSearchInput] = useState("");
  const { state, dispatch } = useGlobalStore();
  const videoSrc = "/videoCode.mp4";

  const cursor = state.cursor;

  const projects = [
    {
      title: "Corso Next.js",
      desc: "Corso svolto in autonomia, costruendo il mio portfolio personale per mettere in pratica le competenze acquisite.",
      link: "#",
    },
    {
      title: "Corso Angular",
      desc: "Corso seguito in Betacom su Angular, TypeScript e sviluppo di mini-progetti formativi.",
      link: "#",
    },
    {
      title: "Accademy Java",
      desc: "Academy svolta in Betacom, 500 ore di Java con esercizi e progetti reali",
      link: "#",
    },
    {
      title: "Corso React",
      desc: "Apprendimento di React, componenti, state management, routing e redux.",
      link: "/certificato corso react.pdf",
    },
    {
      title: "Corso JavaScript",
      desc: "Corso completo di JavaScript da base a livello avanzato",
      link: "/certificato corso javaScript.pdf",
    },
    {
      title: "Corso MongoDB",
      desc: "Operazioni CRUD, aggregazioni e design database",
      link: "/bartolomeo-braccio-certificate.pdf",
    },
    {
      title: "Intelligenza Artificiale",
      desc: "Corso completato su Udemy presso Betacom, con applicazioni pratiche di AI e ML.",
      link: "#",
    },
  ];

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <Container>
        {/* HEADER */}
        <Header>
          <HeaderLeft>💻 Il Mio Portfolio</HeaderLeft>
          <HeaderCenter>
            <FilterSearch
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </HeaderCenter>
          <HeaderRight>
            <div>💼 Lavoro in Betacom da 3 anni</div>
            <div>🎓 Laurea Triennale in Ingegneria Informatica</div>
            <div>🌍 Appassionato di tecnologia e innovazione</div>
          </HeaderRight>
        </Header>

        {/* MAIN */}
        <Main>
          <Hero
            hovered={state.hoveredId === "hero"}
            onMouseEnter={() => {
              dispatch({ type: "SET_HOVER", payload: "hero" });
            }}
            onMouseLeave={() => {
              dispatch({ type: "CLEAR_HOVER" });
            }}
          >
            <video autoPlay loop muted>
              <source src={videoSrc} type="video/mp4" />
            </video>
            <Animated>
              <HeroTitle>Benvenuto nel mio angolo digitale</HeroTitle>
              <HeroText>
                Qui condivido il mio viaggio nel mondo della tecnologia,
                esplorando nuove frontiere, realizzando progetti stimolanti,
                affrontando sfide complesse e trasformando idee innovative in
                soluzioni concrete. Ogni progetto rappresenta un’opportunità di
                crescita, apprendimento e sperimentazione, e spero che il mio
                percorso possa ispirare chi, come me, ama innovare e costruire
                esperienze digitali di valore.
              </HeroText>
              <ButtonWrapper>
                <HeroButton
                  hovered={state.hoveredId === "heroButton"}
                  cursor={cursor}
                  onClick={() => (window.location.href = "/about")}
                  onMouseEnter={() => {
                    dispatch({ type: "SET_HOVER", payload: "heroButton" });
                    dispatch({ type: "SET_CURSOR", payload: "pointer" });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: "CLEAR_HOVER" });
                    dispatch({ type: "SET_CURSOR", payload: "default" });
                  }}
                >
                  🔍 Scopri di più
                </HeroButton>

                <CvButton
                  hovered={state.hoveredId === "cvButton"}
                  cursor={cursor}
                  onClick={() => window.open("/Bartolomeo_B_CV.pdf", "_blank")}
                  onMouseEnter={() => {
                    dispatch({ type: "SET_HOVER", payload: "cvButton" });
                    dispatch({ type: "SET_CURSOR", payload: "pointer" });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: "CLEAR_HOVER" });
                    dispatch({ type: "SET_CURSOR", payload: "default" });
                  }}
                >
                  📄 Visualizza CV
                </CvButton>
              </ButtonWrapper>
            </Animated>
          </Hero>
          <ProfileCard>
            <ProfileImage
              src="/BartolomeoScrivania.png"
              alt="Foto Profilo"
              width={150}
              height={150}
            />
            <ProfileName>Bartolomeo Braccio</ProfileName>
            <ProfileRole>Full Stack Developer</ProfileRole>
            <PersonalInfo>
              📍 Portico di Caserta <br />
              📞 366 409 9541 <br />
              📧 bartolomeobraccio95@live.com <br />
              🎂 08/03/1995
            </PersonalInfo>
            <ProfileLinks>
              <LinkButton href="https://linkedin.com" target="_blank">
                LinkedIn
              </LinkButton>
              <LinkButton href="https://github.com" target="_blank">
                GitHub
              </LinkButton>
            </ProfileLinks>
          </ProfileCard>
        </Main>
        <CardsGrid>
          {filteredProjects.map((p) => (
            <Card key={p.title} title={p.title} desc={p.desc} link={p.link} />
          ))}
        </CardsGrid>

        {/* FOOTER */}
        <Footer>
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Animated>
              <InfoSection>
                <Description>
                  Costantemente motivato dal desiderio di acquisire nuove
                  competenze e di assumere responsabilità crescenti, sono
                  fortemente orientato a sviluppare la mia carriera affrontando
                  ogni sfida con impegno, curiosità e determinazione. Nel corso
                  delle mie esperienze professionali, ho avuto l’opportunità di
                  contribuire a progetti complessi e di rilievo, ricevendo
                  riconoscimenti concreti per il mio lavoro. Ho collaborato
                  attivamente all’interno di team di sviluppo altamente
                  qualificati, apprendendo costantemente dai colleghi e
                  contribuendo al miglioramento dei processi e della qualità del
                  prodotto. La mia capacità di adattarmi rapidamente a nuove
                  tecnologie e di proporre soluzioni innovative mi permette di
                  affrontare compiti sfidanti con efficacia e responsabilità,
                  continuando a crescere professionalmente giorno dopo giorno.
                </Description>
                <Skills>
                  <ul>
                    <li>
                      <strong>Linguaggi di programmazione:</strong> JavaScript
                      (ES6+), TypeScript, Java
                    </li>
                    <li>
                      <strong>Markup / Styling:</strong> HTML5, CSS3/SCSS
                    </li>
                    <li>
                      <strong>Framework & Librerie:</strong> React (Hooks,
                      componenti riutilizzabili, Redux, Context API), Next.js
                      (Server/Client components, SSR, ottimizzazione
                      performance, middleware), Angular (Standalone Components,
                      Decoratori, Ciclo di vita, Data Binding, Observable &
                      RxJS, Angular Forms, Routing), Material UI, Styled
                      Components, deck.gl, Leaflet, Axios, Spring, JPA, JSP, JSF
                    </li>
                    <li>
                      <strong>Database:</strong> MongoDB, Oracle, SQL
                    </li>
                    <li>
                      <strong>Testing & Debug:</strong> Postman, Chrome
                      DevTools, JUnit, Debugging manuale e ottimizzazione
                      prestazioni frontend/backend
                    </li>
                    <li>
                      <strong>Versionamento & DevOps:</strong> Git, GitHub,
                      Bitbucket, Bamboo, CI/CD
                    </li>
                    <li>
                      <strong>Design & UI/UX:</strong> Figma, Lokalise
                    </li>
                    <li>
                      <strong>Project Management:</strong> Jira, Confluence
                    </li>
                    <li>
                      <strong>Dev Tools & IDE:</strong> Visual Studio Code,
                      Lens, Eclipse
                    </li>
                  </ul>
                </Skills>
              </InfoSection>
            </Animated>
            <HobbyWrapper>
              <HobbySection />
            </HobbyWrapper>
          </div>
        </Footer>
      </Container>
    </>
  );
};

export default Portofolio;
