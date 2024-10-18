import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PieChart({
  seriesList,
  labelsList,
}: {
  seriesList: number[];
  labelsList: string[];
}) {
  const [series, setSeries] = useState<number[]>(seriesList);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labelsList,
    colors: ["#58A9FB", "#FDE68A", "#D1D5DB", "#34D399"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "right",
            offsetY: 40,
            fontSize: "16px",
          },
        },
      },
    ],
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
