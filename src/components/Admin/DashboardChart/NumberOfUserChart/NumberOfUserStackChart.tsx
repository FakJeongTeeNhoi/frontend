import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ApexChartProps = {
  // Define any props here if necessary
};

export default function NumberOfUserStackChart() {
  const [series, setSeries] = useState([
    {
      name: "Student",
      data: [44, 55, 41, 67, 22],
      color: "#58A9FB",
    },
    {
      name: "Professor",
      data: [13, 23, 20, 8, 13],
      color: "#FDE68A",
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 160,
      width: 400,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    colors: ['#58A9FB', '#FDE68A', '#34D399'], 
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "16px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "category",
      categories: ["MON", "TUE", "WED", "THU", "FRI"],
      labels: {
        show: true,
        style: {
          colors: [],
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    legend: {
      position: "right",
      offsetY: 40,
      fontSize: '16px',
    },
    fill: {
      opacity: 1,
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}