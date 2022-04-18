import React from 'react';
import { useSelector } from 'react-redux';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';
import { selectTheme } from '../../features/slices/themeSlice';

const data = [
    {
        name: 'Product A',
        ventas: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: 'Product B',
        ventas: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: 'Product C',
        ventas: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: 'Product D',
        ventas: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: 'Product E',
        ventas: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: 'Product F',
        ventas: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: 'Product G',
        ventas: 3490,
        pv: 4300,
        amt: 2100
    }
]

// function CustomTooltip({ payload, label, active }) {
//     if (active) {
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{label}</p>
//           <p className="desc">ventas: ${payload[0].value}</p>
//         </div>
//       );
//     }
  
//     return null;
// }

const BarComponent = () => {

    let isDark = useSelector(selectTheme);

  return (
    <ResponsiveContainer>
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
            barSize={20}
            style={{ color: isDark ? '#999' : '#666' }}
        >
            <XAxis 
                dataKey="name" 
                scale="point" 
                padding={{
                    left: 10,
                    right: 10
                }}
                stroke={isDark ? '#999' : '#666'}
            />
            <YAxis 
                stroke={isDark ? '#999' : '#666'}
            />
            <Tooltip 
                itemStyle={{ color: isDark ? '#999' : '#666', fontWeight: 'normal' }} 
                contentStyle={{ 
                    background: isDark ? '#282828' : '#DDD',
                    fontWeight: 'bold',
                    color: isDark ? '#999' : '#666',
                    border: 'none',
                    borderRadius: '10px'
                }}
            />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar 
                dataKey="ventas" 
                fill={ isDark ? '#213A4A' : '#417493'}
                // background={{ fill: '#eee' }}
            />
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarComponent