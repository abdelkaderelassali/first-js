const form = document.getElementById("crud-form");
const tableBody = document.querySelector("#data-table tbody");
const logoutButton = document.getElementById("logout");

let data = JSON.parse(localStorage.getItem("crudData")) || [];
let idCounter = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
let editMode = false;
let editId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("name-input");
  const name = nameInput.value.trim();

  if (!name) return;

  if (!editMode && data.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
    alert("Name already exists!");
    return;
  }

  if (editMode) {
    // Update existing item
    const index = data.findIndex(item => item.id === editId);
    if (index !== -1) {
      data[index].name = name;
      editMode = false;
      editId = null;
      form.querySelector('button[type="submit"]').textContent = "Add";
    }
  } else {
    // Add new item
    const newData = { id: idCounter++, name };
    data.push(newData);
  }

  renderTable();
  nameInput.value = "";
});

function renderTable() {
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="id-column">${item.id}</td>
      <td class="name-column">${item.name}</td>
      <td class="actions-column">
        <button class="crud-button edit" data-id="${item.id}">Edit</button>
        <button class="crud-button delete" data-id="${item.id}">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", () => deleteItem(parseInt(btn.dataset.id)));
  });

  document.querySelectorAll(".edit").forEach((btn) => {
    btn.addEventListener("click", () => editItem(parseInt(btn.dataset.id)));
  });

  saveData();
}

function deleteItem(id) {
  data = data.filter((item) => item.id !== id);
  renderTable();
}

function editItem(id) {
  const item = data.find(item => item.id === id);
  if (item) {
    const nameInput = document.getElementById("name-input");
    nameInput.value = item.name;
    editMode = true;
    editId = id;
    form.querySelector('button[type="submit"]').textContent = "Update";
  }
}

function saveData() {
  localStorage.setItem("crudData", JSON.stringify(data));
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

logoutButton.addEventListener("click", logout);

const submitButton = form.querySelector('button[type="submit"]');
submitButton.className = 'crud-button add';

renderTable();
