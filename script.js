```javascript
"use strict";

// Demonstration records only. Do not store real patient information here.
const demoPatients = [
    {
        id: "PAT-1001",
        name: "Ama Mensah",
        age: 28,
        gender: "Female",
        condition: "Routine check-up",
        department: "General Medicine",
        status: "Outpatient"
    },
    {
        id: "PAT-1002",
        name: "Kojo Asare",
        age: 45,
        gender: "Male",
        condition: "Observation",
        department: "Emergency",
        status: "Admitted"
    },
    {
        id: "PAT-1003",
        name: "Akua Owusu",
        age: 34,
        gender: "Female",
        condition: "Follow-up visit",
        department: "Maternity",
        status: "Discharged"
    },
    {
        id: "PAT-1004",
        name: "Yaw Boateng",
        age: 12,
        gender: "Male",
        condition: "General examination",
        department: "Paediatrics",
        status: "Outpatient"
    }
];

const STORAGE_KEY = "carepoint_demo_patients";

// Load saved demo records when available, otherwise use the sample array.
function loadPatients() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved !== null) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (error) {
        console.warn("Could not load saved demo records.", error);
    }

    return demoPatients.map(patient => ({ ...patient }));
}

// Main array containing patient objects.
let patients = loadPatients();

const patientTableBody = document.getElementById("patientTableBody");
const totalPatients = document.getElementById("totalPatients");
const admittedPatients = document.getElementById("admittedPatients");
const outpatients = document.getElementById("outpatients");
const dischargedPatients = document.getElementById("dischargedPatients");
const recordCount = document.getElementById("recordCount");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const emptyMessage = document.getElementById("emptyMessage");

const patientDialog = document.getElementById("patientDialog");
const patientForm = document.getElementById("patientForm");
const dialogTitle = document.getElementById("dialogTitle");
const patientIdInput = document.getElementById("patientId");
const patientNameInput = document.getElementById("patientName");
const patientAgeInput = document.getElementById("patientAge");
const patientGenderInput = document.getElementById("patientGender");
const patientConditionInput = document.getElementById("patientCondition");
const patientDepartmentInput = document.getElementById("patientDepartment");
const patientStatusInput = document.getElementById("patientStatus");
const toast = document.getElementById("toast");

let nextId = 1001;
let toastTimer;

function savePatients() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch (error) {
        console.warn("Could not save demo records.", error);
        showToast("Changes are temporary in this browser session.");
    }
}

function generatePatientId() {
    let id;

    // Ensure a generated ID does not already exist in the array.
    do {
        nextId += 1;
        id = `PAT-${nextId}`;
    } while (patients.some(patient => patient.id === id));

    return id;
}

function getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part.charAt(0).toUpperCase())
        .join("");
}

function createCell() {
    return document.createElement("td");
}

function createTextElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
}

function renderPatients() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    // filter() returns a new array of records matching the search and status.
    const visiblePatients = patients.filter(patient => {
        const matchesSearch = [
            patient.id,
            patient.name,
            patient.condition,
            patient.department
        ].some(value => String(value).toLowerCase().includes(query));

        const matchesStatus =
            selectedStatus === "All" || patient.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    patientTableBody.replaceChildren();

    visiblePatients.forEach(patient => {
        const row = document.createElement("tr");

        // Patient name and initials
        const patientCell = createCell();
        const patientInfo = document.createElement("div");
        patientInfo.className = "patient-cell";

        patientInfo.appendChild(
            createTextElement("span", "avatar", getInitials(patient.name))
        );

        const details = document.createElement("div");
        details.appendChild(
            createTextElement("div", "patient-name", patient.name)
        );
        details.appendChild(
            createTextElement("div", "patient-id", patient.id)
        );

        patientInfo.appendChild(details);
        patientCell.appendChild(patientInfo);
        row.appendChild(patientCell);

        // Other patient fields
        row.appendChild(createTextCell(patient.age));
        row.appendChild(createTextCell(patient.condition));
        row.appendChild(createTextCell(patient.department));

        // Status badge
        const statusCell = createCell();
        const statusClass = patient.status.toLowerCase();
        statusCell.appendChild(
            createTextElement("span", `status status-${statusClass}`, patient.status)
        );
        row.appendChild(statusCell);

        // Action buttons
        const actionCell = createCell();
        const actions = document.createElement("div");
        actions.className = "action-buttons";

        const editButton = createTextElement("button", "action-btn", "Edit");
        editButton.type = "button";
        editButton.addEventListener("click", () => editPatient(patient.id));

        const deleteButton = createTextElement(
            "button",
            "action-btn delete",
            "Delete"
        );
        deleteButton.type = "button";
        deleteButton.addEventListener("click", () => deletePatient(patient.id));

        actions.append(editButton, deleteButton);
        actionCell.appendChild(actions);
        row.appendChild(actionCell);

        patientTableBody.appendChild(row);
    });

    emptyMessage.hidden = visiblePatients.length > 0;

    recordCount.textContent =
        `${visiblePatients.length} ${visiblePatients.length === 1 ? "record" : "records"}`;

    updateStatistics();
}

function createTextCell(value) {
    const cell = createCell();
    cell.textContent = value;
    return cell;
}

function updateStatistics() {
    totalPatients.textContent = patients.length;

    // filter() counts records belonging to each status.
    admittedPatients.textContent =
        patients.filter(patient => patient.status === "Admitted").length;

    outpatients.textContent =
        patients.filter(patient => patient.status === "Outpatient").length;

    dischargedPatients.textContent =
        patients.filter(patient => patient.status === "Discharged").length;
}

function openNewPatientForm() {
    patientForm.reset();
    patientIdInput.value = "";
    dialogTitle.textContent = "Register Patient";
    patientDialog.showModal();
    patientNameInput.focus();
}

function editPatient(id) {
    // find() locates one patient by their unique ID.
    const patient = patients.find(item => item.id === id);

    if (!patient) {
        showToast("Patient record not found.");
        return;
    }

    patientIdInput.value = patient.id;
    patientNameInput.value = patient.name;
    patientAgeInput.value = patient.age;
    patientGenderInput.value = patient.gender;
    patientConditionInput.value = patient.condition;
    patientDepartmentInput.value = patient.department;
    patientStatusInput.value = patient.status;

    dialogTitle.textContent = "Edit Patient";
    patientDialog.showModal();
    patientNameInput.focus();
}

function deletePatient(id) {
    const patient = patients.find(item => item.id === id);

    if (!patient) {
        showToast("Patient record not found.");
        return;
    }

    const confirmed = window.confirm(
        `Delete the demo record for ${patient.name}?`
    );

    if (!confirmed) {
        return;
    }

    // filter() creates a new array without the selected patient.
    patients = patients.filter(item => item.id !== id);

    savePatients();
    renderPatients();
    showToast("Patient record deleted.");
}

patientForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = patientNameInput.value.trim();
    const age = Number(patientAgeInput.value);
    const gender = patientGenderInput.value;
    const condition = patientConditionInput.value.trim();
    const department = patientDepartmentInput.value;
    const status = patientStatusInput.value;
    const existingId = patientIdInput.value;

    if (!name || !condition || !gender || !department || !status) {
        showToast("Please complete all required fields.");
        return;
    }

    if (!Number.isInteger(age) || age < 0 || age > 120) {
        showToast("Enter a valid age between 0 and 120.");
        return;
    }

    if (existingId) {
        // findIndex() locates the position of the patient to update.
        const index = patients.findIndex(item => item.id === existingId);

        if (index === -1) {
            showToast("Patient record not found.");
            return;
        }

        patients[index] = {
            ...patients[index],
            name,
            age,
            gender,
            condition,
            department,
            status
        };

        showToast("Patient record updated.");
    } else {
        const newPatient = {
            id: generatePatientId(),
            name,
            age,
            gender,
            condition,
            department,
            status
        };

        // push() adds the new patient object to the array.
        patients.push(newPatient);

        showToast("Patient registered successfully.");
    }

    savePatients();
    renderPatients();
    patientDialog.close();
    patientForm.reset();
});

function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");

    toastTimer = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

// Event listeners for searching, filtering, and opening or closing the form.
document.getElementById("addPatientBtn")
    .addEventListener("click", openNewPatientForm);

document.getElementById("closeDialogBtn")
    .addEventListener("click", () => patientDialog.close());

document.getElementById("cancelBtn")
    .addEventListener("click", () => patientDialog.close());

searchInput.addEventListener("input", renderPatients);
statusFilter.addEventListener("change", renderPatients);

// Display the initial records when the page loads.
renderPatients();
```
