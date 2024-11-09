const statusColorMap: { [key: string]: string } = {
  created: "bg-blue-400",
  pending: "bg-yellow-400",
  completed: "bg-green-400",
  canceled: "bg-red-400",
};

export function getColorByStatus(status: string): string {
  return statusColorMap[status] || "bg-red-400"; // Default to gray if status is not found
}
