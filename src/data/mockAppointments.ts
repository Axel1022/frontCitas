import { format } from 'date-fns';
import { Appointment } from './types';

const today = format(new Date(), 'yyyy-MM-dd');

export const mockAppointments: Appointment[] = [
  { id: 'apt_001', patientId: 'pat_001', date: today, startTime: '09:00', endTime: '10:00', reason: 'Limpieza dental', status: 'Confirmada', isFirstVisit: false, notes: 'Sensibilidad leve' },
  { id: 'apt_002', patientId: 'pat_002', date: today, startTime: '09:30', endTime: '10:30', reason: 'Control ortodoncia', status: 'Pendiente', isFirstVisit: false, notes: 'Revisión de brackets' },
  { id: 'apt_003', patientId: 'pat_003', date: today, startTime: '10:30', endTime: '12:00', reason: 'Dolor molar', status: 'Confirmada', isFirstVisit: true, notes: 'Posible endodoncia' },
  { id: 'apt_004', patientId: 'pat_004', date: today, startTime: '12:00', endTime: '12:30', reason: 'Ajuste de arco', status: 'Completada', isFirstVisit: false, notes: 'Buen progreso' },
  { id: 'apt_005', patientId: 'pat_005', date: today, startTime: '13:00', endTime: '14:30', reason: 'Blanqueamiento', status: 'Cancelada', isFirstVisit: false, notes: 'Reprogramar próxima semana' },
  { id: 'apt_006', patientId: 'pat_006', date: today, startTime: '14:00', endTime: '15:00', reason: 'Evaluación periodontal', status: 'Pendiente', isFirstVisit: true, notes: 'Solicitar laboratorios' },
  { id: 'apt_007', patientId: 'pat_001', date: today, startTime: '15:00', endTime: '15:30', reason: 'Control post limpieza', status: 'Confirmada', isFirstVisit: false, notes: 'Sin complicaciones' },
  { id: 'apt_008', patientId: 'pat_003', date: today, startTime: '16:00', endTime: '17:30', reason: 'Extracción', status: 'Pendiente', isFirstVisit: false, notes: 'Revisar presión arterial' },
  { id: 'apt_009', patientId: 'pat_002', date: today, startTime: '17:00', endTime: '18:00', reason: 'Revisión final', status: 'Confirmada', isFirstVisit: false, notes: 'Entrega de indicaciones' },
  { id: 'apt_010', patientId: 'pat_005', date: today, startTime: '08:00', endTime: '08:30', reason: 'Chequeo rápido', status: 'Completada', isFirstVisit: true, notes: 'Diagnóstico inicial' },
  { id: 'apt_011', patientId: 'pat_006', date: '2026-03-25', startTime: '10:00', endTime: '11:00', reason: 'Seguimiento', status: 'Confirmada', isFirstVisit: false, notes: 'Control glucémico' },
  { id: 'apt_012', patientId: 'pat_004', date: '2026-03-23', startTime: '11:30', endTime: '12:30', reason: 'Ortodoncia', status: 'Pendiente', isFirstVisit: false, notes: 'Cambio de ligas' },
];
