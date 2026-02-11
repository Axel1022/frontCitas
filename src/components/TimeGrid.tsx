import { Appointment, Patient } from '../data/types';
import { isToday, minutesToLabel, timeToMinutes } from '../utils/date';
import AppointmentCard from './AppointmentCard';

interface LayoutItem {
  appointment: Appointment;
  col: number;
  cols: number;
}

interface TimeGridProps {
  date: Date;
  appointments: Appointment[];
  patientsMap: Record<string, Patient>;
}

const startMinute = 8 * 60;
const endMinute = 18 * 60;
const pxPerMinute = 1.35;

const slots = Array.from({ length: (endMinute - startMinute) / 30 + 1 }, (_, i) => startMinute + i * 30);

const overlapLayout = (items: Appointment[]): LayoutItem[] => {
  const sorted = [...items].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  const positioned: LayoutItem[] = [];

  sorted.forEach((apt) => {
    const aptStart = timeToMinutes(apt.startTime);
    const aptEnd = timeToMinutes(apt.endTime);

    const overlapping = positioned.filter((p) => {
      const pStart = timeToMinutes(p.appointment.startTime);
      const pEnd = timeToMinutes(p.appointment.endTime);
      return aptStart < pEnd && aptEnd > pStart;
    });

    let col = 0;
    while (overlapping.some((o) => o.col === col)) col += 1;
    const cols = Math.max(col + 1, overlapping.length + 1);

    positioned.push({ appointment: apt, col, cols });

    overlapping.forEach((item) => {
      item.cols = Math.max(item.cols, cols);
    });
  });

  return positioned;
};

function TimeGrid({ date, appointments, patientsMap }: TimeGridProps) {
  const positioned = overlapLayout(appointments);
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const showNowLine = isToday(date) && nowMinutes >= startMinute && nowMinutes <= endMinute;

  return (
    <section className="rounded-2xl border border-clinic-line bg-white shadow-clinic">
      <div className="relative flex overflow-x-auto">
        <div className="sticky left-0 z-20 w-20 border-r border-clinic-line bg-white">
          {slots.map((minute) => (
            <div key={minute} className="h-[40.5px] border-b border-dashed border-slate-200 pr-2 pt-1 text-right text-[11px] text-clinic-soft">
              {minutesToLabel(minute)}
            </div>
          ))}
        </div>

        <div className="relative min-w-[700px] flex-1" style={{ height: (endMinute - startMinute) * pxPerMinute }}>
          {slots.map((minute) => (
            <div
              key={`line-${minute}`}
              className="absolute inset-x-0 border-b border-dashed border-slate-200"
              style={{ top: (minute - startMinute) * pxPerMinute }}
              aria-hidden="true"
            />
          ))}

          {showNowLine && (
            <div className="absolute inset-x-0 z-30 border-t-2 border-rose-500" style={{ top: (nowMinutes - startMinute) * pxPerMinute }}>
              <span className="-mt-3 ml-2 inline-block rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">Ahora</span>
            </div>
          )}

          {positioned.map(({ appointment, col, cols }) => {
            const top = (timeToMinutes(appointment.startTime) - startMinute) * pxPerMinute;
            const height = (timeToMinutes(appointment.endTime) - timeToMinutes(appointment.startTime)) * pxPerMinute;
            const width = `${100 / cols}%`;
            const left = `${(100 / cols) * col}%`;

            return (
              <div
                key={appointment.id}
                className="absolute z-10 p-1"
                style={{ top, height, left, width }}
              >
                <AppointmentCard appointment={appointment} patient={patientsMap[appointment.patientId]} compact={height < 95} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TimeGrid;
