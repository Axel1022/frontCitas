# FrontCitas · Agenda Odontológica (Frontend)

Aplicación frontend construida con **React + TypeScript + TailwindCSS + React Router** para gestionar citas odontológicas con datos simulados.

## Ejecutar en local

```bash
npm install
npm run dev
```

Luego abre la URL mostrada por Vite (por defecto `http://localhost:5173`).

## Scripts

- `npm run dev`: entorno de desarrollo
- `npm run build`: compilación de producción
- `npm run preview`: previsualizar build

## Estructura principal

- `src/pages/AgendaDia.tsx`: agenda diaria por horas
- `src/pages/PacientePerfil.tsx`: perfil del paciente (beta)
- `src/components/TopBar.tsx`: barra superior (fecha, navegación, búsqueda, filtro)
- `src/components/TimeGrid.tsx`: grilla de horarios con línea de hora actual y superposición
- `src/components/AppointmentCard.tsx`: tarjeta de cita
- `src/data/mockAppointments.ts`: mock de citas
- `src/data/mockPatients.ts`: mock de pacientes

## Nota de arquitectura

Los datos mock están separados de los componentes para facilitar migración futura a backend real (reemplazando el origen de datos por llamadas API).
