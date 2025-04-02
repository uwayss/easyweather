export function formatTimeStringToHour(dateString: string | undefined): string | undefined {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(
    2,
    "0",
  )}`;
}
