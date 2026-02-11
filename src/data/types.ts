export type AppointmentStatus = 'Confirmada' | 'Pendiente' | 'Cancelada' | 'Completada';

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: AppointmentStatus;
  isFirstVisit: boolean;
  notes: string;
}

export interface Procedure {
  date: string;
  procedure: string;
  notes: string;
}

export interface ClinicalHistoryBeta {
  allergies: string[];
  conditions: string[];
  notes: string;
  lastProcedures: Procedure[];
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  clinicalHistoryBeta: ClinicalHistoryBeta;
  files: string[];
}
