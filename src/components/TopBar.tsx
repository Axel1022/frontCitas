import { AppointmentStatus } from '../data/types';

interface TopBarProps {
  dateLabel: string;
  query: string;
  status: 'Todos' | AppointmentStatus;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: 'Todos' | AppointmentStatus) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

function TopBar({
  dateLabel,
  query,
  status,
  onQueryChange,
  onStatusChange,
  onPrevDay,
  onNextDay,
  onToday,
}: TopBarProps) {
  return (
    <header className="rounded-2xl border border-clinic-line bg-white p-4 shadow-clinic md:p-5">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold text-clinic-text md:text-2xl">Agenda del Día · {dateLabel}</h1>
        <div className="flex gap-2">
          <button aria-label="Día anterior" className="rounded-lg border border-clinic-line px-3 py-2 text-sm hover:bg-slate-50" onClick={onPrevDay}>◀</button>
          <button aria-label="Ir a hoy" className="rounded-lg bg-clinic-primary px-4 py-2 text-sm font-medium text-white hover:brightness-110" onClick={onToday}>Hoy</button>
          <button aria-label="Día siguiente" className="rounded-lg border border-clinic-line px-3 py-2 text-sm hover:bg-slate-50" onClick={onNextDay}>▶</button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium text-clinic-soft">
          Buscar paciente (nombre/teléfono/ID)
          <input
            aria-label="Buscar por nombre, teléfono o ID"
            className="mt-1 w-full rounded-lg border border-clinic-line px-3 py-2"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Ej: María / 809-555 / pat_001"
          />
        </label>

        <label className="text-sm font-medium text-clinic-soft">
          Filtrar por estado
          <select
            aria-label="Filtrar por estado"
            className="mt-1 w-full rounded-lg border border-clinic-line px-3 py-2"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as 'Todos' | AppointmentStatus)}
          >
            <option>Todos</option>
            <option>Confirmada</option>
            <option>Pendiente</option>
            <option>Cancelada</option>
            <option>Completada</option>
          </select>
        </label>
      </div>
    </header>
  );
}

export default TopBar;
