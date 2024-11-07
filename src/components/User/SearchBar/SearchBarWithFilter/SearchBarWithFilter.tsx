import { getSpace, GetSpaceData } from "@/api/space";
import TextInput from "@/app/staff/signUp/components/TextInput";
import { SpaceData } from "@/app/user/search/page";
import DatePickerInput from "@/components/Common/DatePicker/DatePickerInput";
import Dropdown from "@/components/Common/Dropdown/Dropdown";
import SearchIcon from "@/components/Common/Icons/SearchIcon";
import { NumberInput } from "@/components/Common/NumberInput/NumberInput";
import TimePickerInput from "@/components/Common/TimePicker/TimePickerInput";
import { combineDateAndTime } from "@/utils/CombineDateAndTime";
import { getCurrentLocation } from "@/utils/GetCurrentLocation";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

export type Pair<T, U> = [T, U];

export default function SearchBarWithFilter({
  onSearchChange,
}: {
  onSearchChange: (value: SpaceData[]) => void;
}) {
  //mock
  const facultyList = [
    {
      value: "Engineering",
      label: "Engineering",
    },

    {
      value: "Office of Academic Resource",
      label: "Office of Academic Resource",
    },
    {
      value: "Communication Arts Library",
      label: "Communication Arts Library",
    },
  ];

  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [reservedDate, setReservedDate] = useState<Dayjs | null>();
  const [reservedTime, setReservedTime] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [capacity, setCapacity] = useState<number | null>(1);
  const [range, setRange] = useState<number | null>(10);
  const [currentLocation, setCurrentLocation] =
    useState<Pair<number, number>>();

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const data = await getCurrentLocation();
        if (data) {
          setCurrentLocation([data.latitude, data.longitude]);
        }
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };
    fetchCurrentLocation();
  }, []);
  
  function calculateBoundingBox(rangeInKm: number) {
    if (!currentLocation) {
      return null;
    }
    const latitude = currentLocation[0];
    const longitude = currentLocation[1];

    const latitudeDelta = rangeInKm / 111.32;
    const longitudeDelta =
      rangeInKm / (111.32 * Math.cos((latitude * Math.PI) / 180));

    const minLatitude = latitude - latitudeDelta;
    const maxLatitude = latitude + latitudeDelta;

    const minLongitude = longitude - longitudeDelta;
    const maxLongitude = longitude + longitudeDelta;

    const latitude_range: Pair<number, number> = [minLatitude, maxLatitude];
    const longitude_range: Pair<number, number> = [minLongitude, maxLongitude];

    return {
      latitude_range: latitude_range,
      longitude_range: longitude_range,
    };
  }

  const onSearch = async () => {
    try {
      const start_datetime = combineDateAndTime(reservedDate, reservedTime[0]);
      const end_datetime = combineDateAndTime(reservedDate, reservedTime[1]);

      const location = range ? calculateBoundingBox(range) : null;

      const searchParams = {
        name: name,
        faculty: faculty,
        start_datetime: start_datetime ? start_datetime.toDate() : null,
        end_datetime: end_datetime ? end_datetime.toDate() : null,
        capacity: capacity,
        latitude_range: location ? location.latitude_range : null,
        longitude_range: location ? location.longitude_range : null,
      };

      const data = await getSpace(searchParams);

      const spaces: SpaceData[] = [];
      data.forEach((space: GetSpaceData) => {
        spaces.push({
          spaceId: space.ID.toString(),
          name: space.name,
          description: space.description,
          workingHours: space.working_hour,
          latitude: space.latitude,
          longitude: space.longitude,
          faculty: space.faculty,
          floor: space.floor,
          building: space.building,
          isAvailable: space.is_available,
          createAt: new Date(space.CreatedAt),
          createBy: "",
          updateAt: new Date(space.UpdatedAt),
          updateBy: "",
          opening_day: space.opening_day,
          faculty_access_list: space.faculty_access_list,
          room_list: space.room_list,
        });
      });
      onSearchChange(spaces);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const onTimeChanged = (value: Dayjs | null, isStartTime: boolean) => {
    if (isStartTime) {
      setReservedTime([value, reservedTime[1]]);
    } else {
      setReservedTime([reservedTime[0], value]);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-8">
      <div className="flex flex-row items-center w-full mt-16 space-x-8">
        <div className="flex flex-row items-center min-w-[300px] space-x-4">
          <SearchIcon width={40} height={40} color="#1F2937" />
          <div className="text-2xl font-semibold text-gray-800">
            Co-working Space:
          </div>
        </div>
        <div className="relative w-full">
          <TextInput
            id="name"
            label=""
            type="text"
            placeholder="Co-working space name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
            onClick={onSearch}
          >
            <SearchIcon width={20} height={20} color="#9CA3AF" />
          </button>
        </div>
      </div>

      <div className="flex flex-row w-full space-x-8 items-start">
        <div className="flex flex-row items-center space-x-4">
          <div className="font-semibold">Faculty:</div>
          <Dropdown
            id="faculty"
            placeholder="Faculty"
            value={faculty}
            onChange={setFaculty}
            options={facultyList}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="font-semibold min-w-[150px]">Reserved Date:</div>
            <DatePickerInput onChange={(value) => setReservedDate(value)} />
          </div>

          <div className="flex items-center col-span-2">
            <div className="font-semibold min-w-[150px]">Reserved Time:</div>
            <TimePickerInput
              onChange={(value) => onTimeChanged(value, true)}
              disabled={!reservedDate}
            />
            <div className="font-light text-gray-400 mx-2">To</div>
            <TimePickerInput
              onChange={(value) => onTimeChanged(value, false)}
              disabled={!reservedDate || !reservedTime[0]}
              minTime={combineDateAndTime(reservedDate, reservedTime[0])}
            />
          </div>

          <div className="flex items-center col-span-2">
            <div className="font-semibold  min-w-[150px]">Capacity:</div>
            <NumberInput
              aria-label="Demo number input"
              placeholder="Type a number…"
              value={capacity}
              onChange={(event, val) => setCapacity(val)}
            />
            <div className="font-semibold mx-2">Distance Range (km):</div>
            <NumberInput
              aria-label="Demo number input"
              placeholder="Type a number…"
              value={range}
              onChange={(event, val) => setRange(val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
