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

const DonutChart = ({
   width = 200,
   height = 300,
   colors = ['#4361ee', '#805dca', '#e2a03f'],
   labels = ['Team A', 'Team B', 'Team C'],
   data = [44, 55, 13],
}: Props) => {
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => {
      setIsMounted(true);
   });
   const donutChart: any = {
      series: data,
      options: {
         chart: {
            height: height,
            type: 'donut',
            zoom: {
               enabled: false,
            },
            toolbar: {
               show: false,
            },
         },
         stroke: {
            show: false,
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
         legend: {
            position: 'bottom',
         },
      },
   };

   return (
      <div className="panel">
         <div className="mb-5">
            {isMounted && (
               <ReactApexChart
                  series={donutChart.series}
                  options={donutChart.options}
                  className="rounded-lg bg-white dark:bg-black"
                  type="donut"
                  height={height}
                  width={'100%'}
               />
            )}
         </div>
      </div>
   );
};

export default DonutChart;
