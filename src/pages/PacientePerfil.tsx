import { Link, useParams } from 'react-router-dom';
import { compareAsc, parseISO } from 'date-fns';
import { mockAppointments } from '../data/mockAppointments';
import { mockPatients } from '../data/mockPatients';

function PacientePerfil() {
  const { id } = useParams();
  const patient = mockPatients.find((p) => p.id === id);

  if (!patient) {
    return (
      <main className="mx-auto w-[min(900px,94vw)] py-8">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="font-medium text-rose-900">Paciente no encontrado.</p>
          <Link to="/" className="mt-2 inline-block text-sm text-clinic-primary underline">Volver a agenda</Link>
        </div>
      </main>
    );
  }

  const nextAppointment = mockAppointments
    .filter((apt) => apt.patientId === patient.id)
    .sort((a, b) => compareAsc(parseISO(`${a.date}T${a.startTime}:00`), parseISO(`${b.date}T${b.startTime}:00`)))
    .find((apt) => parseISO(`${apt.date}T${apt.startTime}:00`) > new Date());

  return (
    <main className="mx-auto grid w-[min(1000px,95vw)] gap-4 py-6">
      <section className="rounded-2xl border border-clinic-line bg-white p-5 shadow-clinic">
        <h1 className="text-2xl font-semibold">Perfil del Paciente</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p><span className="font-medium">Nombre:</span> {patient.name}</p>
          <p><span className="font-medium">Edad:</span> {patient.age} años</p>
          <p><span className="font-medium">Teléfono:</span> {patient.phone}</p>
          <p><span className="font-medium">Email:</span> {patient.email}</p>
        </div>
        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm">
          <p className="font-medium">Próxima cita:</p>
          <p>
            {nextAppointment
              ? `${nextAppointment.date} ${nextAppointment.startTime} · ${nextAppointment.reason} (${nextAppointment.status})`
              : 'No hay próxima cita agendada.'}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-clinic-line bg-white p-5 shadow-clinic">
        <h2 className="text-lg font-semibold">Historial clínico (BETA)</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <article className="rounded-lg border border-clinic-line p-3">
            <h3 className="text-sm font-semibold">Alergias</h3>
            <ul className="mt-2 list-inside list-disc text-sm text-clinic-soft">
              {patient.clinicalHistoryBeta.allergies.length === 0 ? <li>Sin alergias registradas</li> : patient.clinicalHistoryBeta.allergies.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </article>
          <article className="rounded-lg border border-clinic-line p-3">
            <h3 className="text-sm font-semibold">Condiciones</h3>
            <ul className="mt-2 list-inside list-disc text-sm text-clinic-soft">
              {patient.clinicalHistoryBeta.conditions.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </article>
          <article className="rounded-lg border border-clinic-line p-3">
            <h3 className="text-sm font-semibold">Notas</h3>
            <p className="mt-2 text-sm text-clinic-soft">{patient.clinicalHistoryBeta.notes}</p>
          </article>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-clinic-line px-3 py-2 text-left">Fecha</th>
                <th className="border border-clinic-line px-3 py-2 text-left">Tratamiento</th>
                <th className="border border-clinic-line px-3 py-2 text-left">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {patient.clinicalHistoryBeta.lastProcedures.map((proc) => (
                <tr key={`${proc.date}-${proc.procedure}`}>
                  <td className="border border-clinic-line px-3 py-2">{proc.date}</td>
                  <td className="border border-clinic-line px-3 py-2">{proc.procedure}</td>
                  <td className="border border-clinic-line px-3 py-2">{proc.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold">Archivos / imágenes (simuladas)</h3>
          <div className="mt-2 grid gap-2 md:grid-cols-3">
            {patient.files.map((f) => (
              <div key={f} className="rounded-md border border-dashed border-clinic-line bg-slate-50 p-3 text-xs text-clinic-soft">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Link to="/" className="inline-flex w-fit rounded-lg bg-clinic-primary px-4 py-2 text-sm font-medium text-white hover:brightness-110">
        Volver a agenda
      </Link>
    </main>
  );
}

export default PacientePerfil;
