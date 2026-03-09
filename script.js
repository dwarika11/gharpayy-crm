
const api = "http://localhost:5000/leads";

async function loadLeads() {
  const res = await fetch(api);
  const leads = await res.json();

  const container = document.getElementById("leads");
  container.innerHTML = "";

  leads.forEach(l => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <b>${l.name}</b> (${l.phone}) <br>
      Status: ${l.status} <br>

      Property: <input id="prop-${l._id}" value="${l.property || ""}">
      Date: <input id="date-${l._id}" type="date" value="${l.visitDate || ""}">
      Time: <input id="time-${l._id}" type="time" value="${l.visitTime || ""}">

      <br><br>

      <select id="status-${l._id}">
        <option>New Lead</option>
        <option>Contacted</option>
        <option>Requirement Collected</option>
        <option>Property Suggested</option>
        <option>Visit Scheduled</option>
        <option>Visit Completed</option>
        <option>Booked</option>
        <option>Lost</option>
      </select>

      <button onclick="updateLead('${l._id}')">Update</button>
    `;

    container.appendChild(div);
  });
}

async function addLead() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone })
  });

  loadLeads();
}

async function updateLead(id) {
  const status = document.getElementById("status-" + id).value;
  const property = document.getElementById("prop-" + id).value;
  const visitDate = document.getElementById("date-" + id).value;
  const visitTime = document.getElementById("time-" + id).value;

  await fetch(api + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, property, visitDate, visitTime })
  });

  loadLeads();
}

loadLeads();
