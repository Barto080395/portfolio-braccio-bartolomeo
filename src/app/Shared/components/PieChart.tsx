"use client";

import styled from "@emotion/styled";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, PieLabelRenderProps, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;

  @media (max-width: 768px) {
    flex-direction: column; /* Pie sopra, Bar sotto su mobile */
    gap: 20px;
  }
`;
type PieData = {
  name: string;
  value: number;
};

type SkillPieChartProps = {
  data: PieData[];
};

const COLORS = ["#FF8A00", "#FFE066", "#FF4D6D", "#4DA6FF", "#00CC99"];

const PieChartComponent = ({ data }: SkillPieChartProps) => {
  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;

    const cxNum = Number(cx);
    const cyNum = Number(cy);
    const midAngleNum = Number(midAngle);
    const innerRadiusNum = Number(innerRadius);
    const outerRadiusNum = Number(outerRadius);

    const RADIAN = Math.PI / 180;
    const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) / 2;
    const x = cxNum + radius * Math.cos(-midAngleNum * RADIAN);
    const y = cyNum + radius * Math.sin(-midAngleNum * RADIAN);

    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={500}>
        {`${value}%`}
      </text>
    );
  };

  return (
    <ChartWrapper>
      {/* Pie Chart a sinistra */}
      <PieChart width={300} height={300}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={renderCustomizedLabel} labelLine={false}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any, name: string) => [`${value}%`, name]}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: 6,
            border: "1px solid #ccc",
            padding: "8px 12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            fontSize: 12,
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={40} // leggermente più alto per più spazio
          iconType="line"
          wrapperStyle={{
            fontSize: 15, // più leggibile
            fontWeight: 600,
            color: "#ffffff", // bianco visibile su sfondo scuro
            display: "flex",
            justifyContent: "center",
            gap: "15px", // spazio tra elementi
            textTransform: "capitalize", // se vuoi iniziali maiuscole
          }}
          iconSize={15} // icone leggermente più grandi
        />
      </PieChart>

      <BarChart width={250} height={250} data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="number" domain={[0, 100]} hide />

        <Tooltip
          formatter={(value: any, name: string, props: any) => [`${value}%`, props.payload.name]}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: 12,
            border: "1px solid #ccc",
            padding: "8px 12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            fontSize: 12,
            textAlign: "center",
          }}
        />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList dataKey="value" position="insideRight" fill="#fff" fontSize={10} fontWeight={500} formatter={(value) => `${value}%`} />
        </Bar>
      </BarChart>
    </ChartWrapper>
  );
};

export default PieChartComponent;
