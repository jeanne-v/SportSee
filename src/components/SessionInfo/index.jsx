import useFetch from "../../utils/hooks/useFetch";

import { LineChart, Line, XAxis, Tooltip, Text, Rectangle } from "recharts";

import "./SessionInfo.scss";

export default function SessionInfo({ id }) {
  const { data, error } = useFetch(`http://localhost:3000/user/${id}/average-sessions`);

  const textStyle = {
    fill: "#FFFFFF80",
    fontFamily: "Roboto",
    fontWeight: 500,
  };

  if (error) {
    return (
      <div className="session-info">
        <div className="session-info__error">
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="session-info">
      {data && (
        <LineChart
          style={{
            width: "100%",
            height: "100%",
          }}
          margin={{
            top: 55,
            left: 15,
            right: 15,
            bottom: 7,
          }}
          responsive
          data={data.sessions}
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#fff" stopOpacity={0.4}></stop>
              <stop offset="80%" stopColor="#fff" stopOpacity={1}></stop>
            </linearGradient>
          </defs>
          <Text
            style={{ ...textStyle, fontSize: 15 }}
            verticalAnchor="start"
            y={20}
            x={20}
            width={150}
          >
            Durée moyenne des sessions
          </Text>
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            strokeWidth={2}
            stroke="url(#gradient)"
            dot={false}
            activeDot={{ fill: "#fff" }}
          />
          <XAxis
            interval={0}
            dataKey="day"
            tickLine={false}
            axisLine={false}
            style={{ ...textStyle, fontSize: 12 }}
            tickFormatter={getDayInitial}
            dy={2}
          />
        </LineChart>
      )}
    </div>
  );
}

function CustomTooltip({ payload, active }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "7px",
        }}
      >
        <p style={{ margin: "0", color: "#000000", fontSize: 10, fontWeight: 500 }}>
          {payload[0].value}min
        </p>
      </div>
    );
  }
  return null;
}

function CustomCursor(props) {
  const { width, height, top, bottom, left, right, points } = props;
  const containerHeight = height + top + bottom;
  const pointX = points[0].x;
  const containerWidth = width + left + right;
  const currentWidth = containerWidth - pointX;
  return (
    <Rectangle
      fill="#0000001A"
      x={pointX}
      y={0}
      width={currentWidth}
      height={containerHeight}
    />
  );
}

function getDayInitial(day) {
  const daysArr = ["L", "M", "M", "J", "V", "S", "D"];
  return daysArr[day - 1];
}
