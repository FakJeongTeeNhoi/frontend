export const generateTimeLabels = (startTime: number, endTime: number): string[] => {
    const labels: string[] = [];

    for (let hour = startTime; hour <= endTime; hour++) {
      const suffix = hour >= 12 ? "PM" : "AM";
      const hourIn12HrFormat = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      labels.push(`${hourIn12HrFormat} ${suffix}`);
    }

    return labels;
  };