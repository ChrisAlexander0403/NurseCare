import { PieChart, Pie, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import React from 'react';
import { selectTheme } from '../../features/slices/themeSlice';
import { useSelector } from 'react-redux';

const data = [
  { name: 'Producto A', value: 530 },
  { name: 'Producto B', value: 300 },
  { name: 'Producto C', value: 300 },
  { name: 'Producto D', value: 200 }
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  )
}

const PieComponent = () => {

  let isDark = useSelector(selectTheme);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart width={350} height={350}>
        <Pie
          dataKey='value'
          data={data}
          cx='50%'
          cy='50%'
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={150}  
          fill={ isDark ? '#213A4A' : '#417493'}
          stroke={isDark ? '#181818' : '#EEE'}
        >
          <LabelList 
            dataKey="name" 
            position="outside" 
            stroke="none" 
            fill={isDark ? '#999' : '#666'}
            offset={20}
          />
        </Pie>
        <Tooltip 
          itemStyle={{ color: isDark ? '#999' : '#666', fontWeight: 'normal' }} 
          contentStyle={{ 
            background: isDark ? '#282828' : '#DDD', 
            color: isDark ? '#fff' : '#000',
            border: 'none',
            borderRadius: '10px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieComponent;