"use client";

import { useState } from "react";
import { ISkill } from "../skills/ISkill";
import CircularSkillChart from "../Shared/components/CircularSkillChart";
import { DragDropList } from "../Shared/components/DragDrop";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import PieChartComponent from "../Shared/components/PieChart";
import LazyLoading from "../Shared/components/LazyLoading";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin: 2rem;
  background: rgba(255, 255, 255, 0.1); /* vetro trasparente */
  backdrop-filter: blur(3px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 1.5);
  border-radius: 20px;
`;

const Card = styled.div`
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* trasparente per far vedere il background globale */
  backdrop-filter: blur(15px) saturate(180%);
  -webkit-backdrop-filter: blur(15px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15); /* bordo leggero per definire il vetro */
  padding: 2.5rem 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem;
    max-width: 95%;
  }
  @media (max-width: 480px) {
    padding: 0.5rem;
    max-width: 100%;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  color: #0b3d91;
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const ProjectTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #f0f8ff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.7s ease-out forwards;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #e6e6fa;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.7s ease-out forwards;
`;

const SkillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  animation: ${fadeIn} 0.7s ease-out forwards;
`;

const Projects = () => {
  const skills = [
    { name: "GisWrapper", percent: 43.9 },
    { name: "GisViewer", percent: 36.6 },
    { name: "Blastness", percent: 12.2 },
    { name: "Portfolio", percent: 7.3 },
  ];

  const [skill, setSkill] = useState<ISkill[]>(skills);

  return (
    <>
      <Container>
        <Card>
          <Title>📁 Progetti</Title>

          {/* GISWrapper */}
          <ProjectTitle>
            GISWrapper - Applicativo di testing per rete elettrica Enel (2023)
          </ProjectTitle>
          <Paragraph>
            Ho lavorato su un progetto chiamato <strong>GISWrapper</strong>,
            un’applicazione web dedicata al testing degli elementi di rete
            elettrica di Enel. Questo strumento era fondamentale per la verifica
            e il monitoraggio dei componenti di rete, permettendo agli ingegneri
            e tecnici di eseguire test accurati e tempestivi.
          </Paragraph>
          <Paragraph>
            Una delle funzionalità principali di GISWrapper era la
            visualizzazione tramite una mappa interattiva, che mostrava diversi
            layer geografici e dati in tempo reale relativi agli elementi di
            rete. I dati venivano archiviati su MongoDB e venivano estratti
            tramite API, consentendo una gestione efficiente e scalabile delle
            informazioni.
          </Paragraph>
          <Paragraph>
            Il mio ruolo nel progetto includeva la risoluzione di bug critici
            per migliorare la stabilità dell’applicazione, così come la
            progettazione e lo sviluppo di nuove funzionalità per arricchire
            l’esperienza utente e aumentare la produttività del team.
          </Paragraph>

          {/* Microfrontend GIS */}
          <ProjectTitle>
            GisViewer- Visualizzazione dati geospaziali (2024)
          </ProjectTitle>
          <Paragraph>
            Da gennaio 2024 sono stato responsabile di un componente chiave, un
            microfrontend nato agli albori della room GIS con l’obiettivo di
            visualizzare in modo efficiente e intuitivo i dati disponibili,
            offrendo una soluzione performante per la rappresentazione grafica
            di informazioni geospaziali.
          </Paragraph>
          <Paragraph>
            Il componente è stato sviluppato in React, utilizzando librerie
            avanzate come <strong>Deck.gl</strong>. Deck.gl è una libreria
            potente per la visualizzazione di grandi dataset geospaziali con
            WebGL, ideale per creare mappe interattive ad alte prestazioni.
          </Paragraph>
          <Paragraph>
            Grazie a queste tecnologie, ho implementato numerose funzionalità,
            tra cui:
          </Paragraph>
          <ul style={{ marginRight: "20px", color: "#FCE77D" }}>
            <li>
              Gestione e visualizzazione di coordinate geografiche
              personalizzate.
            </li>
            <li>
              Personalizzazione avanzata del GisViewer per una maggiore
              flessibilità.
            </li>
            <li>
              Inserimento e disegno di geometrie direttamente sulla mappa.
            </li>
            <li>
              Funzionalità di centratura della mappa per facilitare la
              navigazione.
            </li>
            <li>
              Componenti con transizioni fluide per una migliore resa visiva.
            </li>
            <li>
              Implementazione di componenti RGBA, permettendo di cambiare
              dinamicamente il colore dei layer in base alle esigenze visive.
            </li>
          </ul>

          {/* Blastness */}
          <ProjectTitle>
            Blastness - Sviluppo moduli per siti di hotel di lusso (2025)
          </ProjectTitle>
          <Paragraph>
            Ho lavorato su <strong>Blastness</strong> per 5 mesi, assumendo la
            responsabilità della creazione di moduli personalizzati per siti web
            di hotel a 5 stelle. Il progetto era ben strutturato, stimolante ed
            emozionante, permettendomi di unire competenze tecniche avanzate a
            un forte senso estetico e attenzione all’esperienza utente.
          </Paragraph>
          <Paragraph>
            Il mio ruolo includeva la progettazione e lo sviluppo di componenti
            interattivi e performanti, garantendo coerenza visiva e funzionale
            tra i diversi moduli. Questo lavoro mi ha permesso di affrontare
            sfide complesse e di contribuire significativamente alla qualità
            complessiva del progetto.
          </Paragraph>

          {/* Portfolio personale */}
          <ProjectTitle>Portfolio Personale (2025)</ProjectTitle>
          <Paragraph>
            Ho realizzato il mio portfolio personale con grande passione e
            dedizione, utilizzando <strong>React</strong> e{" "}
            <strong>Next.js</strong>. L’obiettivo principale era creare un sito
            che rappresentasse al meglio il mio percorso, le mie competenze e il
            mio approccio al lavoro.
          </Paragraph>
          <Paragraph>
            Ogni dettaglio è stato curato per garantire un’esperienza utente
            fluida e intuitiva: dalla struttura delle pagine all’estetica
            visiva, fino alla disposizione dei contenuti e alla navigazione tra
            le varie sezioni. Ho voluto che il sito fosse pulito, elegante e
            facilmente fruibile, mantenendo un design coerente e responsivo.
          </Paragraph>
          <Paragraph>
            Il portfolio include sezioni dedicate alla presentazione personale,
            ai certificati, alle skill interattive e ai progetti, con elementi
            dinamici che rendono la navigazione coinvolgente. Ogni componente è
            stato pensato per offrire chiarezza e immediatezza, senza
            sacrificare lo stile.
          </Paragraph>
          <Paragraph>
            Questo progetto è il frutto di un impegno costante e di un percorso
            di crescita: il sito continua a evolversi giorno dopo giorno,
            migliorando grafica, logica e adattabilità su diversi dispositivi.
            Rappresenta non solo le mie competenze tecniche, ma anche la mia
            attenzione ai dettagli e alla qualità dell’esperienza digitale.
          </Paragraph>

          {/* Skills */}
          <SkillContainer>
            {/* Paragrafo visibile subito */}
            <Paragraph
              style={{
                color: "#FFD700",
                textShadow: "2px 2px 6px rgba(0, 0, 0, 1.5)",
                fontWeight: 600,
                fontSize: "1.1rem",
                border: "1px solid #FFD700",
                textAlign: "center",
                marginBottom: "1rem",
                width: "100%",
              }}
            >
              Qui vengono mostrati i grafici che evidenziano la percentuale di
              tempo trascorso su ciascun progetto nei miei tre anni di
              esperienza.
            </Paragraph>

            {/* Grafici con lazy loading */}
            <LazyLoading>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <PieChartComponent
                  data={skill.map((s) => ({ name: s.name, value: s.percent }))}
                />
              </div>
            </LazyLoading>
          </SkillContainer>
        </Card>
      </Container>
    </>
  );
};

export default Projects;
