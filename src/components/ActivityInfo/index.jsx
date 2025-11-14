import useFetch from "../../utils/hooks/useFetch";

import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
  CartesianGrid,
  Tooltip,
  Text,
} from "recharts";

export default function ActivityInfo({ id }) {
  const { data } = useFetch(`http://localhost:3000/user/${id}/activity`);

  let activityData = null;

  if (data) {
    activityData = data.sessions.map((session) => {
      const date = new Date(session.day);
      const day = date.getDate();
      return {
        day: day,
        "Poids (kg)": session.kilogram,
        "Calories brûlées (kCal)": session.calories,
      };
    });
  }

  const textStyle = {
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 500,
    fill: "#9B9EAC",
  };

  return (
    <div className="activity-info">
      {data && (
        <BarChart
          data={activityData}
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: "20/7",
          }}
          responsive
          barGap="8"
        >
          <Tooltip content={CustomTooltip} cursor={{ fill: "#C4C4C480" }} />
          <Text
            style={{
              fontSize: "15px",
              fill: "#20253A",
              fontFamily: "Roboto",
              fontWeight: 500,
            }}
            y={6}
            verticalAnchor="start"
          >
            Activité quotidienne
          </Text>
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            itemSorter={(a, b) => b - a}
            wrapperStyle={{
              top: "0px",
              paddingBottom: "40px",
            }}
            formatter={(value) => (
              <span style={{ ...textStyle, color: "#74798C", marginRight: "20px" }}>
                {value}
              </span>
            )}
          />
          <CartesianGrid vertical={false} strokeDasharray="2" yAxisId="right" />
          <YAxis
            orientation="right"
            tickCount={3}
            tick={textStyle}
            axisLine={false}
            tickLine={false}
            dataKey="Poids (kg)"
            domain={["dataMin - 5", "dataMax + 5"]}
            yAxisId="right"
          />
          <YAxis
            orientation="left"
            hide={true}
            dataKey="Calories brûlées (kCal)"
            domain={[0, "dataMax + 10"]}
            yAxisId="left"
          />
          <XAxis
            dataKey="day"
            style={textStyle}
            axisLine={{ stroke: "#DEDEDE" }}
            tickLine={false}
            dy={12}
          />
          <Bar
            dataKey="Poids (kg)"
            fill="#282D30"
            barSize="8"
            radius={[10, 10, 0, 0]}
            yAxisId="right"
          />
          <Bar
            dataKey="Calories brûlées (kCal)"
            fill="#E60000"
            barSize="8"
            radius={[10, 10, 0, 0]}
            yAxisId="left"
          />
        </BarChart>
      )}
    </div>
  );
}

function CustomTooltip({ payload, active }) {
  const textStyle = {
    fontFamily: "Roboto",
    color: "rgba(255, 255, 255, 1)",
    fontSize: "10px",
  };

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#E60000",
          padding: "12px 7px",
          textAlign: "center",
        }}
      >
        <p style={{ ...textStyle, margin: "0" }}>{payload[0].value}kg</p>
        <p style={{ ...textStyle, margin: "24px 0 0 0" }}>{payload[1].value}kCal</p>
      </div>
    );
  }
  return null;
}
