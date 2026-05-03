import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function DoughnutChart({ data }) {

  return (

    <>
      <div className="h-64 w-full" style={{ minHeight: '256px' }}>

        <ResponsiveContainer
          width="100%"
          height="100%"
          debounce={100}
        >

          <PieChart>

            <Pie
              data={data}
              innerRadius="65%"
              outerRadius="90%"
              paddingAngle={5}
              dataKey="value"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={entry.color}
                  stroke="none"
                />

              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="flex justify-between mt-10 px-4">

        {data.map((item) => (

          <div
            key={item.name}
            className="flex items-start gap-3"
          >

            <div
              className="w-3 h-3 rounded-full mt-1.5"
              style={{
                backgroundColor: item.color
              }}
            />

            <div>

              <p className="text-gray-600 font-medium">
                {item.name}
              </p>

              <p className="text-gray-400 text-sm">
                ({item.value}%)
              </p>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}

export default DoughnutChart;