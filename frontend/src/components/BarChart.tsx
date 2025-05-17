import * as React from "react"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface BarChartProps {
  data: Record<string, number>;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const formattedData = React.useMemo(() => {
    return Object.entries(data)
      .map(([date, minutes]) => ({
        date,
        minutes: Number(minutes)
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  const total = React.useMemo(
    () => formattedData.reduce((acc, curr) => acc + curr.minutes, 0),
    [formattedData]
  );

  return (
    <div className="study-chart">
      <div className="chart-header">
        <h4>Minutos de Estudio</h4>
        <p>Total: {total} minutos</p>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <RechartsBarChart
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value) => [`${value} minutos`, 'Tiempo de estudio']}
              contentStyle={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
              }}
            />
            <Bar
              dataKey="minutes"
              fill="var(--component)"
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;