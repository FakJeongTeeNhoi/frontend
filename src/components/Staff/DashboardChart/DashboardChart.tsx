import RefreshIcon from "@/components/Common/Icons/RefreshIcon";
import { DownloadReportButton } from "./DownloadReportButton/DownloadReportButton";
import NumberOfUserStackChart, {
  NumberOfUserChartData,
} from "./NumberOfUserChart/NumberOfUserStackChart";
import TypeOfUserChart from "./PieChart/PieChart";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import NumberOfReservationChart from "./NumberOfReservationChart/NumberOfReservationChart";
import { DayFormatter } from "@/utils/DayFormatter";
import { generateTimeLabels } from "@/utils/GenerateTimeLabels";
import dayjs from "dayjs";
import { SpaceWorkingHour } from "../SpaceCard/SpaceCardDashboard";
import { downloadReport, getReport, ReportResponseBody } from "@/api/report";

export type UserPieChartType = "User Type" | "Faculty";

export default function DashboardChart({
  spaceId,
  openingTime,
}: {
  spaceId: string;
  openingTime: SpaceWorkingHour;
}) {
  //mock (must get from getSpaceById)
  const openingDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  //

  const now = new Date();

  const [numberOfUserSeries, setNumberOfUserSeries] = useState<
    NumberOfUserChartData[]
  >(new Array(openingDay.length).fill(0));

  const [userTypeList, setUserTypeList] = useState<string[]>([]);
  const [userTypeSeries, setUserTypeSeries] = useState<number[]>([]);
  const [facultyList, setFacultyList] = useState<string[]>([]);
  const [facultySeries, setFacultySeries] = useState<number[]>([]);
  const [userPieChartType, setUserPieChartType] =
    useState<UserPieChartType>("User Type");

  const reservationLabels = generateTimeLabels(
    Math.floor(parseFloat(openingTime.startTime)),
    Math.floor(parseFloat(openingTime.endTime))
  );
  const [reservationSeries, setReservationSeries] = useState<number[]>([]);

  const [roomList, setRoomList] = useState<string[]>([]);
  const [roomSeries, setRoomSeries] = useState<number[]>([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reports = await getReport(spaceId);

        //Number of user
        const numOfUserDay: NumberOfUserChartData[] = [];
        //Type of user
        const userTypeLabels: string[] = [];
        const facultyLabels: string[] = [];
        const userTypeData: number[] = [];
        const facultyData: number[] = [];
        //Number of reservation
        const reservationData: number[] = new Array(
          reservationLabels.length
        ).fill(0);
        //Most reserved room
        const roomLabels: string[] = [];
        const roomData: number[] = [];

        reports.forEach((report:ReportResponseBody) => {
          const day_index = openingDay.findIndex(
            (day) => day == DayFormatter(report.start_datetime)
          );

          //Find number of reservation
          let currentTime = new Date(report.start_datetime);
          let endTime = new Date(report.end_datetime);

          while (currentTime <= endTime) {
            const formattedTime = currentTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            });
            const time_pos = reservationLabels.findIndex(
              (time) => time == formattedTime
            );
            if (time_pos != -1) {
              reservationData[time_pos] += 1;
            }

            currentTime.setHours(currentTime.getHours() + 1);
          }

          //Find room
          const room_pos = roomLabels.findIndex(
            (room) => room == report.room_name
          );
          if (room_pos != -1) {
            roomData[room_pos] += 1;
          } else {
            roomLabels.push(report.room_name);
            roomData.push(1);
          }

          //Find Type of User
          report.participant.forEach((participant) => {
            const type_pos = numOfUserDay.findIndex(
              (type) => type.name == participant.role
            );
            if (type_pos != -1) {
              numOfUserDay[type_pos].data[day_index] += 1;
              userTypeData[type_pos] += 1;
            } else {
              const initDayValue = new Array(openingDay.length).fill(0);
              initDayValue[day_index] += 1;
              numOfUserDay.push({ name: participant.role, data: initDayValue });
              userTypeLabels.push(participant.role);
              userTypeData.push(1);
            }
            const faculty_pos = facultyLabels.findIndex(
              (faculty) => faculty == participant.faculty
            );
            if (faculty_pos != -1) {
              facultyData[faculty_pos] += 1;
            } else {
              facultyLabels.push(participant.faculty);
              facultyData.push(1);
            }
          });
        });
        setNumberOfUserSeries(numOfUserDay);
        setUserTypeList(userTypeLabels);
        setUserTypeSeries(userTypeData);
        setFacultyList(facultyLabels);
        setFacultySeries(facultyData);
        setReservationSeries(reservationData);
        setRoomList(roomLabels);
        setRoomSeries(roomData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReport();
  }, [refresh]);

  const onUserPieChartSelected = (event: SelectChangeEvent) => {
    const value = event.target.value as UserPieChartType;
    setUserPieChartType(value);
  };

  return (
    <>
      <div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row items-center space-x-6">
            <span className="rounded-full bg-red-400 p-2 w-8 h-8"></span>
            <div className="font-md text-xl flex flex-row space-x-4">
              Last Updated: {dayjs(now).format("HH:mm MM-DD-YYYY")}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setRefresh(!refresh);
              }}
            >
              <RefreshIcon width={35} height={35} color="#6B7280" />
            </div>
          </div>
          <DownloadReportButton
            onClick={async () => {
              await downloadReport(spaceId);
            }}
          />
        </div>
      </div>

      <div className="bg-gray-50 border-2 border-gray-300 rounded-md p-4 space-y-8">
        <div className="grid grid-cols-[70%_30%] gap-8 w-full">
          <div className="flex flex-col w-full p-8 bg-white border-gray-100 border-2 shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">
              Number of User
            </div>
            <div className="flex-grow">
              {numberOfUserSeries.length > 0 ? (
                <NumberOfUserStackChart
                  numberOfUserLabels={openingDay}
                  numberOfUserSeries={numberOfUserSeries}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-fit p-8 bg-white border-gray-100 border-2 shadow-lg">
            <div className="flex flex-row  items-center justify-between">
              <div className="text-2xl font-semibold text-gray-800">
                Type of User
              </div>

              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Select
                  labelId="user-pie-chart-select"
                  id="user-pie-chart-select"
                  value={userPieChartType}
                  label="PieChartType"
                  onChange={onUserPieChartSelected}
                  displayEmpty
                >
                  <MenuItem value={"User Type"}>User Type</MenuItem>
                  <MenuItem value={"Faculty"}>Faculty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex-grow">
              {userTypeSeries.length > 0 ? (
                <TypeOfUserChart
                  seriesList={
                    userPieChartType == "User Type"
                      ? userTypeSeries
                      : facultySeries
                  }
                  labelsList={
                    userPieChartType == "User Type" ? userTypeList : facultyList
                  }
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[70%_30%] gap-8 w-full">
          <div className="flex flex-col w-full p-8 bg-white border-gray-100 border-2 shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">
              Number of Reservation
            </div>
            <div className="flex-grow">
              {reservationSeries.length > 0 ? (
                <NumberOfReservationChart
                  seriesList={reservationSeries}
                  labelsList={reservationLabels}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-fit p-8 bg-white border-gray-100 border-2 shadow-lg">
            <div className="text-2xl font-semibold text-gray-800">
              Most Reserved Room
            </div>
            <div className="flex-grow">
              {roomSeries.length > 0 ? (
                <TypeOfUserChart
                  seriesList={roomSeries}
                  labelsList={roomList}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
