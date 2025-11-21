import useFetch from "../../utils/hooks/useFetch";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

import "./PerformanceInfo.css";

export default function PerformanceInfo({ id }) {
  const { data, error } = useFetch(`http://localhost:3000/user/${id}/performance`);

  let perfData = null;

  if (data) {
    const kind = data.kind;
    perfData = data.data
      .map((item) => {
        let name = "";
        const itemKind = kind[item.kind];
        switch (itemKind) {
          case "cardio":
            name = "Cardio";
            break;
          case "energy":
            name = "Energie";
            break;
          case "endurance":
            name = "Endurance";
            break;
          case "strength":
            name = "Force";
            break;
          case "speed":
            name = "Vitesse";
            break;
          case "intensity":
            name = "Intensité";
            break;
        }
        return { name, value: item.value };
      })
      .toReversed();
  }

  if (error) {
    return (
      <div className="performance-info">
        <div className="performance-info__error">
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="performance-info">
      {perfData && (
        <RadarChart
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: 1,
          }}
          responsive
          data={perfData}
          margin={{
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
          }}
        >
          <PolarGrid
            style={{ stroke: "#ffffff", strokeWidth: 1.5 }}
            radialLines={false}
          />
          <PolarAngleAxis
            dataKey="name"
            tick={{
              fill: "#ffffff",
              fontWeight: "500",
              fontFamily: "Roboto",
              fontSize: 12,
            }}
          />
          <PolarRadiusAxis tickCount={6} tick={false} axisLine={false} />
          <Radar name="perf" dataKey="value" fill="#ff0101" fillOpacity={0.7} />
        </RadarChart>
      )}
    </div>
  );
}
