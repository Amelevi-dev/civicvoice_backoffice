import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

function CustomBarChart({ data }) {

  return (

    <div className="h-80 w-full">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <BarChart
          data={data}
          margin={{ left: -20 }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#999',
              fontSize: 12
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#999',
              fontSize: 12
            }}
          />

          <Bar
            dataKey="v1"
            fill="#3debc3"
            radius={[5, 5, 0, 0]}
            barSize={20}
          />

          <Bar
            dataKey="v2"
            fill="#ff7f50"
            radius={[5, 5, 0, 0]}
            barSize={20}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default CustomBarChart;