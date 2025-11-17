import { RadialBarChart, RadialBar, Text } from "recharts";

export default function ScoreInfo({ score }) {
  let scoreData = null;
  if (score) {
    scoreData = [
      {
        name: "score",
        score: score,
        fill: "#FF0000",
      },
    ];
  }
  return (
    <div className="score-info">
      {scoreData && (
        <RadialBarChart
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: 1,
          }}
          data={scoreData}
          responsive
          barSize={8}
          outerRadius="140%"
          startAngle={0 + 90}
          endAngle={scoreData[0].score * 360 + 90}
        >
          <Text
            style={{
              fontFamily: "Roboto",
              fontWeight: 500,
              fill: "#20253A",
              fontSize: 15,
            }}
            verticalAnchor="start"
            x={20}
            y={20}
          >
            Score
          </Text>
          <RadialBar
            cornerRadius={3}
            dataKey="score"
            label={<CustomLabel score={score} />}
          />
        </RadialBarChart>
      )}
    </div>
  );
}

function CustomLabel(props) {
  const {
    score,
    viewBox: { cx, cy },
    offset,
  } = props;
  const percent = score * 100;
  return (
    <text textAnchor="middle" x={cx} y={cy} offset={offset}>
      <tspan
        x={cx}
        dy={0}
        style={{ fontSize: 26, fontFamily: "Roboto", fontWeight: "bold" }}
      >
        {percent}%
      </tspan>
      <tspan
        x={cx}
        dy={20}
        style={{ fontSize: 14, fill: "#74798C", fontFamily: "Roboto", fontWeight: 500 }}
      >
        de votre
      </tspan>
      <tspan
        x={cx}
        dy={18}
        style={{ fontSize: 14, fill: "#74798C", fontFamily: "Roboto", fontWeight: 500 }}
      >
        objectif
      </tspan>
    </text>
  );
}
