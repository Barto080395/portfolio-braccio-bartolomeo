"use client";

import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

// Nodi desktop (layout orizzontale)
const desktopNodes = [
  {
    id: "1",
    position: { x: 0, y: 250 },
    data: { label: "🎓 Accademy Betacom\n500 ore Java\n(Maggio 2022)" },
  },
  {
    id: "2",
    position: { x: 300, y: 250 },
    data: { label: "💼 Enel Grid in Betacom\nPrimo progetto" },
  },
  {
    id: "3",
    position: { x: 600, y: 150 },
    data: { label: "🗺️ GISWrapper (Angular)\nTesting rete elettrica Enel" },
  },
  {
    id: "4",
    position: { x: 900, y: 150 },
    data: { label: "🌐 GISViewer (React)\nMicrofrontend per dati geospaziali" },
  },
  {
    id: "5",
    position: { x: 1200, y: 250 },
    data: {
      label:
        "🏨 Blastness (2025)\nSiti hotel di lusso\nUI curata e performante",
    },
  },
  {
    id: "6",
    position: { x: 1500, y: 250 },
    data: {
      label:
        "🚀 Portfolio personale\nNext.js + React\nGrafici, API, autenticazione",
    },
  },
  {
    id: "7",
    position: { x: 600, y: 400 },
    data: { label: "📚 Corsi\nJavaScript & React\nApprofondimenti front-end" },
  },
];

const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#FFD700" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#FFD700" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#FFD700" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
    style: { stroke: "#FFD700" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
    style: { stroke: "#FFD700" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
  },
  {
    id: "e2-7",
    source: "2",
    target: "7",
    animated: true,
    style: { stroke: "#FFA500" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FFA500" },
  },
  {
    id: "e7-4",
    source: "7",
    target: "4",
    animated: true,
    style: { stroke: "#FFA500" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#FFA500" },
  },
];

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(desktopNodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);
  const [isMobile, setIsMobile] = useState(false);

  const onConnect = useCallback(
    (params: any) =>
      setEdges(
        addEdge(
          {
            ...params,
            style: { stroke: "#FFD700" },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#FFD700" },
          },
          edgesState
        )
      ),
    [setEdges, edgesState]
  );

  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setIsMobile(isPortrait);
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
  

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(15,32,39,0.9), rgba(32,58,67,0.5), rgba(44,83,100,0.5))",
        padding: "20px",
        minHeight: "100vh",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#FFD700",
          marginBottom: "30px",
          fontSize: "2.2rem",
          fontWeight: 600,
          lineHeight: 1.3,
          textShadow: "0 4px 16px rgba(0,0,0,0.5)",
          background: "transparent",
        }}
      >
        Percorso conseguito in Betacom! 💼
      </h2>

      <div
        style={{
          width: "100%",
          height: "80vh",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 12px 24px rgba(0,0,0,1.5)",
        }}
      >
        {isMobile && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              color: "#FFD700",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "20px",
              zIndex: 10,
              boxSizing: "border-box",
            }}
          >
            <img
              src="/iphone.png"
              alt="Ruota il dispositivo"
              style={{
                width: "80px",
                height: "auto",
                marginBottom: "15px",
                animation: "rotateDevice 3s infinite ease-in-out",
                transformOrigin: "center center", // pivot al centro
              }}
            />
            <div
              style={{
                fontSize: "1rem",
                maxWidth: "90%",
                wordWrap: "break-word",
                lineHeight: 1.4,
                textShadow: "0 4px 16px rgba(0,0,0,1)",
              }}
            >
              Ruota il dispositivo per visualizzare correttamente il diagramma!
            </div>

            <style>
              {`
        @keyframes rotateDevice {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(90deg); }
          100% { transform: rotate(0deg); }
        }
      `}
            </style>
          </div>
        )}

        <ReactFlow
          nodes={nodes.map((n) => ({
            ...n,
            style: {
              background: "rgba(255, 255, 255, 0.08)",
              border: "2px solid #FFD700",
              borderRadius: "14px",
              padding: "12px 16px",
              color: "#f0e6d2",
              fontWeight: 500,
              fontSize: "0.95rem",
              boxShadow: "0 8px 20px rgba(0,0,0,1)",
              transition: "all 0.3s ease",
            },
          }))}
          edges={edgesState.map((e) => ({
            ...e,
            style: {
              stroke:
                e.source === "2" && e.target === "7" ? "#FFA500" : "#FFD700",
              strokeWidth: 2,
            },
            animated: true,
          }))}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          minZoom={0.2}
          maxZoom={2}
          style={{ width: "100%", height: "100%" }}
        >
          <Controls />
          <Background gap={20} color="#444" />
        </ReactFlow>
      </div>
    </div>
  );
}
