const appointments = [
  {
    cliente: "Ana García",
    servicio: "Consulta general",
    fecha: "2026-02-14",
    hora: "09:00",
    estado: "Confirmada",
  },
  {
    cliente: "Luis Herrera",
    servicio: "Control mensual",
    fecha: "2026-02-14",
    hora: "10:30",
    estado: "Pendiente",
  },
  {
    cliente: "Carla Núñez",
    servicio: "Revisión de resultados",
    fecha: "2026-02-15",
    hora: "11:15",
    estado: "Cancelada",
  },
  {
    cliente: "María Rodríguez",
    servicio: "Primera valoración",
    fecha: "2026-02-16",
    hora: "15:00",
    estado: "Confirmada",
  },
  {
    cliente: "Jorge Pineda",
    servicio: "Seguimiento",
    fecha: "2026-02-16",
    hora: "16:20",
    estado: "Pendiente",
  },
];

const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const appointmentsBody = document.querySelector("#appointmentsBody");
const emptyState = document.querySelector("#emptyState");

const totalCount = document.querySelector("#totalCount");
const confirmedCount = document.querySelector("#confirmedCount");
const pendingCount = document.querySelector("#pendingCount");

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function createRow(appointment) {
  return `
    <tr>
      <td>${appointment.cliente}</td>
      <td>${appointment.servicio}</td>
      <td>${formatDate(appointment.fecha)}</td>
      <td>${appointment.hora}</td>
      <td>
        <span class="status-pill status-pill--${appointment.estado}">${appointment.estado}</span>
      </td>
    </tr>
  `;
}

function getFilteredAppointments() {
  const term = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;

  return appointments.filter((appointment) => {
    const matchesTerm =
      appointment.cliente.toLowerCase().includes(term) ||
      appointment.servicio.toLowerCase().includes(term);
    const matchesStatus = status === "all" || appointment.estado === status;
    return matchesTerm && matchesStatus;
  });
}

function renderStats(visibleAppointments) {
  totalCount.textContent = String(visibleAppointments.length);
  confirmedCount.textContent = String(
    visibleAppointments.filter((item) => item.estado === "Confirmada").length,
  );
  pendingCount.textContent = String(
    visibleAppointments.filter((item) => item.estado === "Pendiente").length,
  );
}

function renderAppointments() {
  const filtered = getFilteredAppointments();

  appointmentsBody.innerHTML = filtered.map(createRow).join("");
  emptyState.hidden = filtered.length !== 0;
  renderStats(filtered);
}

searchInput.addEventListener("input", renderAppointments);
statusFilter.addEventListener("change", renderAppointments);

renderAppointments();
