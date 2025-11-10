function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateDate(date) {
    const re = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return re.test(date);
}

function calcNbChar(id) {
    //document.querySelector(`#${id} + span`).textContent = document.querySelector(`#${id}`).value.length + 1 + " car.";

    const input = document.getElementById(id);
    const span = document.getElementById(`span-${id}`);
    span.textContent = input.value.length + " car.";
}

function displayContactList() {
    const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
    const contactList = contactListString ? JSON.parse(contactListString) : [];
    const tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = '';

    for (const contact of contactList) {
        document.querySelector("table tbody").innerHTML +=
            `<tr>
    <td>${contact.name}</td>
    <td> ${contact.firstname} </td>
    <td> ${contact.date} </td>
    <td><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.adress)}" target="_blank">${contact.adress}</a></td>
    <td><a href="mailto:${contact.mail}?subject=Good Morning!&body=How are you doing?">${contact.mail}</a></td>
    <tr>`;
    }

    document.getElementById('List').textContent = `Listes des contacts (${contactList.length})`;
}
// <td> ${contact.adress} </td>
window.onload = function () {

    //document.getElementById("MyForm").reset();
    console.log("DOM ready!");

    displayContactList();

    // Récupérer le formulaire et le champ texte
    const formulaire = document.getElementById("MyForm");
    const champNom = document.getElementById("nom");
    const champPrenom = document.getElementById("prénom");
    const champDate = document.getElementById("date");
    const champAdresse = document.getElementById("adresse");
    const champEmail = document.getElementById("mail");

    //const messageErreur = document.getElementById("messageErreur");
    var modalBodyError = document.querySelector(".modal-body-error");
    var modalBodyGlobalError = document.querySelector(".modal-body-global-error");
    var modalTitleDisplay = document.querySelector(".modal-title-display");
    var modalBodyDisplay = document.querySelector(".modal-body-display");

    // Fonction de validation
    function validerFormulaire(event) {
        // Empêcher la soumission par défaut
        event.preventDefault();

        // Vérifier la longueur du champ texte
        var Total = "";
        var ErrorNom = "";
        var ErrorPrenom = "";
        var ErrorAdresse = "";
        var DateVide = "";
        var DateInvalide = "";
        var ErrorDate = "";
        var ErrorMail = "";
        var ErrorGlobal = "";

        const birthday = champDate.value
        const birthdayDate = new Date(birthday);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (champNom.value === "" && champPrenom.value === "" && champAdresse.value === "" && champEmail.value === "" && champDate.value === "") {
            ErrorGlobal = "Tous les champs sont obligatoires";
            modalBodyGlobalError.textContent = ErrorGlobal;
            var myModal_GlobalError = new bootstrap.Modal(document.getElementById('myModal-GlobalError'));
            myModal_GlobalError.show();
        } else if (ErrorGlobal === "") {

            if (champNom.value.length < 5) ErrorNom = "Nom doit avoir au moins 5 caractères <br>";
            if (champPrenom.value.length < 5) ErrorPrenom = "Prénom doit avoir au moins 5 caractères <br>";
            if (champAdresse.value.length < 5) ErrorAdresse = "Adresse doit avoir au moins 5 caractères <br>";
            if (champDate.value === "") DateVide = "La date de naissance est obligatoire <br>";
            else if (!validateDate(champDate.value)) DateInvalide = "La date de naissance n'est pas valide <br>";
            if (birthdayTimestamp > nowTimestamp) ErrorDate = "La date de naissance n'est pas encore venu <br>";
            if (champEmail.value === "") ErrorMail = "L'Email est obligatoire <br>";
            else if (!validateEmail(champEmail.value)) ErrorMail = "Mail n'est pas valide <br>";

            Total = ErrorNom + ErrorPrenom + DateVide + DateInvalide + ErrorDate + ErrorAdresse + ErrorMail;

            if (Total !== "") {
                modalBodyError.innerHTML = Total;
                var myModal_Error = new bootstrap.Modal(document.getElementById('myModal-Error'));
                myModal_Error.show();
            } else {
                const message = document.getElementById('message');
                message.textContent = "Contact ajouté avec succès.";
                message.style.display = 'block';

                contactStore.add(champNom.value, champPrenom.value, champDate.value, champAdresse.value, champEmail.value);
            }
        }
    }

    // Écouter l'événement "submit" du formulaire
    formulaire.addEventListener("submit", validerFormulaire);

    document.getElementById('buttonGPS').addEventListener('click', function () {
        getLocation();
    });

    document.getElementById('btnReset').addEventListener('click', function () {
        contactStore.reset();
        //document.getElementById('tableBody').innerHTML = '';;
        const message = document.getElementById('message');
        message.textContent = "La liste de contacts a été réinitialisée avec succès.";
        message.style.display = 'block';
    });

    document.getElementById('btnRefresh').addEventListener('click', function () {
        window.location.reload();
        displayContactList();
    });
};
