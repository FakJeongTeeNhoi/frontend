import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ReservationDataType = {
  name: string;
  data: number[];
}
export default function NumberOfReservationChart({
  seriesList,
  labelsList,
}: {
  seriesList: number[];
  labelsList: string[];
}) {
  const [series, setSeries] = useState<ReservationDataType[]>([
    {
      name: "Number of Reservations",
      data: [],
    },
  ]);

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
      categories: [],
    },
  });

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: labelsList,
    }));
    setSeries([
      {
        name: "Number of Reservations",
        data: seriesList,
      },
    ]);
  }, [seriesList, labelsList]);

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
