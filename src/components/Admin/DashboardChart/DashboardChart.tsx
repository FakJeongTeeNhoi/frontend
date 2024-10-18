import RefreshIcon from "@/components/Common/Icons/RefreshIcon";
import { DownloadReportButton } from "./DownloadReportButton/DownloadReportButton";
import NumberOfUserStackChart from "./NumberOfUserChart/NumberOfUserStackChart";
import TypeOfUserChart from "./PieChart/PieChart";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import NumberOfReservationChart from "./NumberOfReservationChart/NumberOfReservationChart";

export type UserPieChartType = "User Type" | "Faculty";
export default function DashboardChart() {
  const userTypeLabel = ["Student", "Professor", "Staff"];
  const userFacultyLabel = ["Engineering", "Art", "Science"];
  const mostReserveRoomLabel = ["Room 1", "Room 2", "Room 3"];

  const [typeOfUserLabels, setTypeOfUserLabels] =
    useState<string[]>(userTypeLabel);
  const [typeOfUserSeries, setTypeOfUserSeries] = useState<number[]>([
    72, 15, 13,
  ]);
  const [userPieChartType, setUserPieChartType] =
    useState<UserPieChartType>("User Type");

  const onUserPieChartSelected = (event: SelectChangeEvent) => {
    const value = event.target.value as UserPieChartType;
    setUserPieChartType(value);
    if (value === "User Type") {
      setTypeOfUserLabels(userTypeLabel);
      setTypeOfUserSeries([72, 15, 13]);
    } else {
      setTypeOfUserLabels(userFacultyLabel);
      setTypeOfUserSeries([72, 15, 13]);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row items-center space-x-6">
            <span className="rounded-full bg-red-400 p-2 w-8 h-8"></span>
            <div className="font-md text-xl flex flex-row space-x-4">
              Last Updated: 17:01 11-20-2024
            </div>
            <div className="cursor-pointer">
              <RefreshIcon width={35} height={35} color="#6B7280" />
            </div>
          </div>
          <DownloadReportButton
            onClick={() => {
              console.log("Download Report");
            }}
          />
        </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-md p-4 space-y-8">
        <div className="flex flex-row space-x-8 w-full">
          <div className="flex flex-col w-full p-8 space-y-4 bg-white border-gray-100 border-2 shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">
              Number of User
            </div>
            <NumberOfUserStackChart />
          </div>
          <div className="flex flex-col p-8 space-y-4 bg-white border-gray-100 border-2 shadow-lg">
            <div className="flex flex-row w-full items-center justify-between">
              <div className="text-2xl font-semibold text-gray-800">
                Type of User
              </div>

              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userPieChartType}
                  label="PieChartType"
                  onChange={onUserPieChartSelected}
                  displayEmpty
                  renderValue={(selected) =>
                    selected.length === 0 ? "Select Space" : selected
                  }
                >
                  <MenuItem key={"userType"} value={"User Type"}>
                    User Type
                  </MenuItem>
                  <MenuItem key={"Faculty"} value={"Faculty"}>
                    Faculty
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <TypeOfUserChart
              seriesList={typeOfUserSeries}
              labelsList={typeOfUserLabels}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-8 w-full">
          <div className="flex flex-col w-full p-8 space-y-4 bg-white border-gray-100 border-2 shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">
              Number of Reservation
            </div>
            <NumberOfReservationChart />
          </div>
          <div className="flex flex-col p-8 space-y-4 bg-white border-gray-100 border-2 shadow-lg">
            <div className="flex flex-row w-full items-center justify-between">
              <div className="text-2xl font-semibold text-gray-800">
                Most Reserved Room
              </div>
            </div>
            <TypeOfUserChart
              seriesList={typeOfUserSeries}
              labelsList={mostReserveRoomLabel}
            />
          </div>
        </div>
      </div>
    </>
  );
}
