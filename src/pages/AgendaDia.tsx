import { useMemo, useState } from 'react';
import { isAfter, parseISO } from 'date-fns';
import TimeGrid from '../components/TimeGrid';
import TopBar from '../components/TopBar';
import { mockAppointments } from '../data/mockAppointments';
import { mockPatients } from '../data/mockPatients';
import { AppointmentStatus } from '../data/types';
import { humanDate, moveDay, toIsoDate } from '../utils/date';

function AgendaDia() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'Todos' | AppointmentStatus>('Todos');

  const patientsMap = useMemo(() => Object.fromEntries(mockPatients.map((p) => [p.id, p])), []);

  const filtered = useMemo(() => {
    const dateKey = toIsoDate(selectedDate);

    return mockAppointments.filter((apt) => {
      if (apt.date !== dateKey) return false;

      const patient = patientsMap[apt.patientId];
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        patient?.name.toLowerCase().includes(q) ||
        patient?.phone.includes(q) ||
        apt.patientId.toLowerCase().includes(q);

      const matchesStatus = status === 'Todos' || apt.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [patientsMap, query, selectedDate, status]);

  const summary = useMemo(() => {
    const now = new Date();
    const upcoming = filtered
      .filter((apt) => isAfter(parseISO(`${apt.date}T${apt.startTime}:00`), now))
      .slice(0, 2);

    const availableGaps = Math.max(0, 20 - filtered.length);
    return { total: filtered.length, upcoming, availableGaps };
  }, [filtered]);

  return (
    <main className="mx-auto flex min-h-screen w-[min(1200px,95vw)] flex-col gap-4 py-4 md:py-6">
      <TopBar
        dateLabel={humanDate(selectedDate)}
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onPrevDay={() => setSelectedDate((d) => moveDay(d, -1))}
        onNextDay={() => setSelectedDate((d) => moveDay(d, 1))}
        onToday={() => setSelectedDate(new Date())}
      />

      <section className="grid gap-3 rounded-2xl border border-clinic-line bg-white p-4 shadow-clinic md:grid-cols-3">
        <article>
          <h2 className="text-xs uppercase tracking-wide text-clinic-soft">Total de citas</h2>
          <p className="text-2xl font-semibold text-clinic-primary">{summary.total}</p>
        </article>
        <article>
          <h2 className="text-xs uppercase tracking-wide text-clinic-soft">Próximas 2</h2>
          <ul className="text-sm text-clinic-text">
            {summary.upcoming.length === 0 ? <li>Sin próximas citas</li> : summary.upcoming.map((apt) => (
              <li key={apt.id}>{apt.startTime} · {patientsMap[apt.patientId]?.name}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2 className="text-xs uppercase tracking-wide text-clinic-soft">Huecos disponibles</h2>
          <p className="text-2xl font-semibold text-emerald-700">{summary.availableGaps}</p>
          <p className="text-xs text-clinic-soft">Estimado sobre 20 slots diarios.</p>
        </article>
      </section>

      <div className="hidden rounded-xl border border-clinic-line bg-white p-4 text-sm text-clinic-soft md:block">
        Tip: usa Tab para navegar entre citas y Enter para abrir el perfil del paciente.
      </div>

      <TimeGrid date={selectedDate} appointments={filtered} patientsMap={patientsMap} />

      <section className="rounded-2xl border border-clinic-line bg-white p-4 shadow-clinic md:hidden">
        <h3 className="mb-2 text-sm font-semibold text-clinic-text">Vista móvil (cards)</h3>
        <div className="space-y-2">
          {filtered.length === 0 && <p className="text-sm text-clinic-soft">No hay citas para este día.</p>}
          {filtered.map((apt) => (
            <div key={`mobile-${apt.id}`} className="rounded-lg border border-clinic-line p-3">
              <p className="text-xs text-clinic-soft">{apt.startTime} - {apt.endTime}</p>
              <p className="text-sm font-semibold">{patientsMap[apt.patientId]?.name}</p>
              <p className="text-xs">{apt.reason} · {apt.status}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AgendaDia;
