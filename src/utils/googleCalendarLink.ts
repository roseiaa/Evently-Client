     import type { CalendarEvent } from "../interfaces/index";


export function generateGoogleCalendarLink(event: CalendarEvent): string {
  const start = new Date(event.date);
  const end = new Date(start.getTime() + (event.durationMinutes || 60) * 60000);

  const formatDateLocal = (date: Date): string => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  };

  const formattedStart = formatDateLocal(start);
  const formattedEnd = formatDateLocal(end);

  const baseUrl = `https://calendar.google.com/calendar/r/eventedit`;
  const queryParams = new URLSearchParams({
    text: event.name,
    dates: `${formattedStart}/${formattedEnd}`,
    details: event.description || '',
    location: event.location || '',
  });

  // Add guests
  if (event.guests && event.guests.length > 0) {
    console.log("hit")
    queryParams.append('add', event.guests.join(','));
  }
  console.log(queryParams.toString())
  return `${baseUrl}?${queryParams.toString()}`;
}