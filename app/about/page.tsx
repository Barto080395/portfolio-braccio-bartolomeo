"use client";

import { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import { useGlobalStore } from "../State/GlobalContext";
import Link from "next/link";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { state, dispatch } = useGlobalStore();
  const cursor = state.cursor;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabContent = [
    {
      label: "Chi sono",
      content: (
        <Box sx={{ lineHeight: 1.8 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, color: "#0b3d91", fontWeight: "bold" }}
          >
            Chi sono
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Ciao! Mi chiamo <b>Bartolomeo</b>, ho 30 anni e sono un{" "}
            <b>ingegnere informatico</b> appassionato di tecnologia.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            💼 Esperienza professionale
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Lavoro in <b>Betacom</b> da oltre 3 anni, dove ho maturato
            esperienza su progetti complessi che mi hanno reso completamente
            autonomo nello sviluppo.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            📚 Formazione
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography>
                Accademia intensiva di <b>500 ore su Java</b> (Maggio 2022).
              </Typography>
            </li>
            <li>
              <Typography>
                Corso completo di <b>Angular e TypeScript</b> (Betacom).
              </Typography>
            </li>
            <li>
              <Typography>
                Corsi di approfondimento su <b>JavaScript</b>: dal livello base
                fino al master.
              </Typography>
            </li>
            <li>
              <Typography>
                Corso avanzato su <b>React e Redux</b>.
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1 }}>
            🚀 Progetti personali
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Attualmente sto sviluppando un <b>progetto personale con Next.js</b>{" "}
            che racconta la mia carriera e le mie competenze. L’app utilizza{" "}
            <b>API interne</b>, <b>rendering ibrido</b> (SSR + SSG) e
            ottimizzazioni come <code>next/image</code> e prefetch automatico.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Inoltre, ho realizzato un{" "}
            <b>sistema di inviti con menu e countdown</b> utilizzando{" "}
            <b>NodeMailer</b> per inviare le email, perfetto per eventi o
            workshop personali.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            🛠️ Altri sviluppi
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Scopri la sezione{" "}
            <Link
              href="/projects"
              style={{
                textDecoration: "none",
                color: "#0b3d91",
                display: "inline-block",
              }}
            >
              progetti 📁
            </Link>
            , dove puoi vedere gli sviluppi per i clienti.
          </Typography>
        </Box>
      ),
    },
    {
      label: "Next Js",
      content: (
        <Box sx={{ lineHeight: 1.8 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, color: "#0b3d91", fontWeight: "bold" }}
          >
            Next.js: caratteristiche e motivazioni dell’uso
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Next.js è un framework full-stack basato su <b>React</b> che combina
            routing, API interne e varie modalità di rendering in un unico
            ambiente. L’ho scelto per il mio portfolio e per progetti clienti
            perché consente di creare applicazioni web performanti, SEO-friendly
            e moderne, con gestione ottimizzata di immagini, prefetch automatico
            dei link e middleware per autenticazione o redirect.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            🔹 Routing
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Next.js usa il <b>file-based routing</b>: la struttura delle
            cartelle definisce le pagine. Supporta rotte dinamiche, parametri e
            API routes, permettendomi di gestire logica backend direttamente nel
            progetto.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            🔹 Rendering
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography>
                SSR – contenuti aggiornati ad ogni richiesta, ottimo per SEO e
                dati dinamici.
              </Typography>
            </li>
            <li>
              <Typography>
                SSG – pagine statiche veloci per performance ottimali e
                caricamento immediato.
              </Typography>
            </li>
            <li>
              <Typography>
                ISR – rigenerazione programmata delle pagine per contenuti
                sempre aggiornati.
              </Typography>
            </li>
            <li>
              <Typography>
                CSR – interazioni lato client per funzionalità dinamiche e UI
                reattive.
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            🔹 Ottimizzazioni
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography>
                <code>next/image</code> – immagini responsive e lazy loading per
                velocità e risorse ottimizzate.
              </Typography>
            </li>
            <li>
              <Typography>
                <code>next/script</code> – caricamento intelligente degli script
                per migliorare le performance.
              </Typography>
            </li>
            <li>
              <Typography>
                Prefetch automatico dei link per navigazione fluida e tempi di
                risposta ridotti.
              </Typography>
            </li>
            <li>
              <Typography>
                Supporto per CSS Modules, Styled JSX e Tailwind, garantendo
                organizzazione e stile coerente.
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            🔹 Middleware
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Utilizzati per intercettare richieste e implementare funzionalità
            come autenticazione, redirect personalizzati o gestione della
            localizzazione nei progetti dei clienti.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            🔹 Deploy
          </Typography>
          <Typography variant="body1">
            Sviluppato localmente con <code>npm run dev</code> e distribuito
            facilmente su <b>Vercel</b>, che permette build e deploy
            ottimizzati, garantendo continuità e aggiornamenti rapidi.
          </Typography>
        </Box>
      ),
    },
    {
      label: "Documentazione",
      content: (
        <Box sx={{ lineHeight: 1.8 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, color: "#0b3d91", fontWeight: "bold" }}
          >
            Il mio Portfolio con React & Next.js
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Ho realizzato un <b>portfolio</b> con <b>React</b> e <b>Next.js</b>{" "}
            per mettere in pratica e dimostrare le mie competenze. Ho sfruttato
            i <b>middleware</b> di Next.js per proteggere le rotte sensibili e
            gestire l’autenticazione: l’utente con il token può accedere alla
            sezione <i>secret</i> e navigare nelle aree riservate.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            📌 Struttura del portfolio
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography>
                <b>Home</b> – Presentazione personale e overview del portfolio.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Certificati</b> – Componente card riutilizzabile per mostrare
                corsi e certificazioni.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Grafico personale</b> – Visualizzazione distribuzione del
                tempo tra lavoro, sport e hobby.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Scopri di più</b> – Sezione di documentazione, in cui spiego
                dettagliatamente il progetto.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Skill</b> – Visualizzazione interattiva delle competenze:
                <br />
                Il modulo mostra le mie competenze in modo chiaro, interattivo e
                completamente dinamico.
              </Typography>

              <Typography sx={{ textAlign: "center" }}>
                <b>Skill</b> – Visualizzazione interattiva delle competenze:
                <br />
                Il modulo mostra le mie competenze in modo chiaro, interattivo e
                completamente dinamico.
              </Typography>

              <Box
                component="ul"
                sx={{ pl: 0, mt: 2, textAlign: "center", listStyle: "none" }}
              >
                <li>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      <b>Visualizzazione</b> – Barre e cerchi animati per ogni
                      competenza. Il colore dell’icona e della barra è dinamico
                      e viene letto dal database:
                    </Typography>
                    <Typography component="span" sx={{ mt: 1 }}>
                      ad esempio <code>giallo</code> sotto 75%,{" "}
                      <code>dorato</code> sopra 75%, personalizzabile da
                      MongoDB.
                    </Typography>
                  </Box>
                </li>

                <li>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      <b>Gestione</b> – Aggiungi, modifica o elimina skill se
                      sei l’owner, autenticazione tramite token.
                    </Typography>
                  </Box>
                </li>

                <li>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      <b>Filtri e ricerca</b> – Trova rapidamente le skill
                      desiderate.
                    </Typography>
                  </Box>
                </li>

                <li>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      <b>Drag & Drop</b> – Permette all’utente di riordinare le
                      skill secondo le proprie preferenze lato client, senza
                      modificare i dati nel database.
                    </Typography>
                  </Box>
                </li>

                <li>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      <b>Dati backend</b> – Tutte le informazioni sulle skill
                      (nome, percentuale, colore icona) vengono salvate su{" "}
                      <b>MongoDB</b>. L’API permette di leggere, creare,
                      aggiornare o cancellare le skill.
                    </Typography>
                  </Box>
                </li>

                <li>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography>
                      <b>SSR / CSR</b> – Skill iniziali caricate lato server per
                      SEO e performance, interattività lato client per modifiche
                      e animazioni.
                    </Typography>
                  </Box>
                </li>
              </Box>
            </li>
          </Box>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            🌍 Gestione dello stato globale
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography>
                <b>Global Store</b> con Context API per gestire stato condiviso.
              </Typography>
            </li>
            <li>
              <Typography>
                Centralizzazione di <b>hover</b>, <b>cursor</b> e interazioni
                globali per coerenza UI.
              </Typography>
            </li>
            <li>
              <Typography>
                Miglioramento esperienza utente, codice scalabile e pulito.
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            🛠️ Strumenti e componenti principali
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li>
              <Typography>
                <b>React & Next.js</b> – Framework principale.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Context API</b> – Stato globale.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>MUI</b> – Componenti UI predefiniti e styling.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>API Routes</b> – Gestione dati dinamici e autenticazione.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Chart.js / D3.js</b> – Visualizzazione grafici circolari e
                lineari.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Next/Image & Next/Script</b> – Ottimizzazione immagini e
                script.
              </Typography>
            </li>
            <li>
              <Typography>
                <b>Widget interattivo</b> – Diagramma di flusso carriera, quiz e
                cambio avatar.
              </Typography>
            </li>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          p: 1,
          m: 2, // 👈 margine esterno su tutti i lati
          cursor: cursor ?? "default",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 1.5)",
          borderRadius: "15px",
          animation: "fadeIn 0.6s ease-out forwards",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(-20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Poppins', sans-serif",
            color: "white",
            width: "100%",
            margin: "0 auto",
            background: "rgba(63, 81, 181, 0.3)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 1.5)",
            borderRadius: "12px",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChange}
            variant="fullWidth"
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              background: "rgba(63, 81, 181, 0.5)",
              "& .MuiTab-root": {
                color: "#F5EEDC",
                fontWeight: "bold",
                fontSize: "1rem",
                "@media (max-width:480px)": {
                  fontSize: "10px",
                },
              },
              cursor: cursor ?? "default",
            }}
          >
            {tabContent.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                onMouseEnter={() =>
                  dispatch({ type: "SET_CURSOR", payload: "pointer" })
                }
                onMouseLeave={() =>
                  dispatch({ type: "SET_CURSOR", payload: "default" })
                }
              />
            ))}
          </Tabs>

          <Box
            sx={{
              flex: 1,
              p: 4,
              color: "white",
              animation: "fadeIn 0.5s ease",
              overflowY: "auto",
            }}
          >
            {tabContent[activeTab].content}
          </Box>
        </Paper>
      </Box>
    </>
  );
}
