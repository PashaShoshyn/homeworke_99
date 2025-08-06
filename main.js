let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
    const contactsDiv = document.getElementById("contacts");
    contactsDiv.innerHTML = "";

    contacts.forEach((contact, index) => {
        const div = document.createElement("div");
        div.className = "contact";
        div.innerHTML = `
            <strong>${contact.firstName} ${contact.lastName}</strong><br>
            Телефон: ${contact.phone}<br>
            Email: ${contact.email}<br>
            <button onclick="editContact(${index})">Редагувати</button>
            <button onclick="deleteContact(${index})">Видалити</button>
        `;
        contactsDiv.appendChild(div);
    });
}

function addContact() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!firstName || !lastName || !phone || !email) {
        alert("Будь ласка, заповніть всі поля.");
        return;
    }

    contacts.push({ firstName, lastName, phone, email });
    saveContacts();
    renderContacts();
    clearForm();
}

function deleteContact(index) {
    if (confirm("Видалити цей контакт?")) {
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
    }
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById("firstName").value = contact.firstName;
    document.getElementById("lastName").value = contact.lastName;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;

    deleteContact(index);
}

function clearForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}

renderContacts();