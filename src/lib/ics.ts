/**
 * Generates and triggers download of an .ics calendar invitation file.
 */
export function downloadIcs(event: {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationHours?: number;
}) {
  const [year, month, day] = event.startDate.split('-').map(Number);
  const [hour, minute] = event.startTime.split(':').map(Number);

  const start = new Date(Date.UTC(year, month - 1, day, hour - 5, minute - 30)); // Adjusted from IST (+5:30) to UTC
  const end = new Date(start.getTime() + (event.durationHours || 2) * 60 * 60 * 1000);

  const formatUtc = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Birds & Bees Cafeto//Table Reservation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:bb-${Date.now()}@birdsandbees.cafeto`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(start)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'birds-and-bees-reservation.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
