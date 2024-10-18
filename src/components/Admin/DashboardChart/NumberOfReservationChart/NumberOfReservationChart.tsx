import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function NumberOfReservationChart() {
  const [series, setSeries] = useState([
    {
      name: "Number of Reservations",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148,12,4],
    },
  ]);
  const startTime = 8; // 8 AM
  const endTime = 18; // 6 PM (24-hour format)

  const generateTimeLabels = (startTime: number, endTime: number): string[] => {
    const labels: string[] = [];

    for (let hour = startTime; hour <= endTime; hour++) {
      const suffix = hour >= 12 ? "PM" : "AM";
      const hourIn12HrFormat = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      labels.push(`${hourIn12HrFormat} ${suffix}`);
    }

    return labels;
  };

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], 
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: generateTimeLabels(startTime, endTime),
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}
