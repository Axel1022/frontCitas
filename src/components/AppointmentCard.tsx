import { useNavigate } from 'react-router-dom';
import { Appointment, Patient } from '../data/types';

const statusStyles = {
  Confirmada: 'bg-emerald-100 text-emerald-800',
  Pendiente: 'bg-amber-100 text-amber-800',
  Cancelada: 'bg-rose-100 text-rose-800',
  Completada: 'bg-sky-100 text-sky-800',
};

interface AppointmentCardProps {
  appointment: Appointment;
  patient?: Patient;
  compact?: boolean;
}

function AppointmentCard({ appointment, patient, compact = false }: AppointmentCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/pacientes/${appointment.patientId}`)}
      className="h-full w-full rounded-xl border border-clinic-line bg-white p-3 text-left shadow-sm transition hover:shadow-md"
      aria-label={`Cita de ${patient?.name ?? appointment.patientId} de ${appointment.startTime} a ${appointment.endTime}. Estado ${appointment.status}.`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-clinic-soft">{appointment.startTime} - {appointment.endTime}</p>
        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${statusStyles[appointment.status]}`}>
          {appointment.status}
        </span>
      </div>
      <p className="text-sm font-semibold text-clinic-text">{patient?.name ?? 'Paciente sin registro'}</p>
      <p className="text-xs text-clinic-soft">{appointment.reason}</p>
      <p className="mt-2 text-[11px] font-medium text-clinic-primary">
        {appointment.isFirstVisit ? 'Primera vez' : 'Revisión'} · Ver perfil
      </p>
      {!compact && <p className="mt-1 text-[11px] text-clinic-soft">Nota: {appointment.notes}</p>}
    </button>
  );
}

export default AppointmentCard;
