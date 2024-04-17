import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
   ssr: false,
});

interface Props {
   title?: string;
   data?: number[];
   height?: number;
   width?: number;
   colors?: string[];
   labels?: string[];
   className?: string;
}

const PieChart = ({
   title = 'PieChart',
   className,
   labels = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
   width = 200,
   height = 300,
   data = [44, 55, 13, 43, 22],
   colors = ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
}: Props) => {
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => {
      setIsMounted(true);
   });

   const pieChart: any = {
      series: data,
      options: {
         chart: {
            height: height,
            type: 'pie',
            zoom: {
               enabled: false,
            },
            toolbar: {
               show: false,
            },
         },
         labels: labels,
         colors: colors,
         responsive: [
            {
               breakpoint: 480,
               options: {
                  chart: {
                     width: width,
                  },
               },
            },
         ],
         stroke: {
            show: false,
         },
         legend: {
            position: 'bottom',
         },
      },
   };
   return (
      <div className="panel">
         <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white">{title}</h5>
         </div>
         <div className="mb-5">
            {isMounted && (
               <ReactApexChart
                  series={pieChart.series}
                  options={pieChart.options}
                  className={`rounded-lg bg-white dark:bg-black ${className}`}
                  type="pie"
                  height={300}
                  width={'100%'}
               />
            )}
         </div>
      </div>
   );
};

export default PieChart;
