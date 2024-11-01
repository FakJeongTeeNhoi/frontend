import dayjs, { Dayjs } from "dayjs";

export function combineDateAndTime(date: Dayjs | null | undefined, time: Dayjs | null) {
  if (!date || !time) {
    return undefined;
  }

  return dayjs(date)
    .hour(time.hour())
    .minute(time.minute())
    .second(time.second())
    .millisecond(time.millisecond());
}
