function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

window.onload = function () {

    //document.getElementById("MyForm").reset();
    console.log("DOM ready!");

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
            if (birthdayTimestamp > nowTimestamp) ErrorDate = "La date de naissance n'est pas encore venu <br>";

            if (champEmail.value === "") ErrorMail = "L'Email est obligatoire <br>";
            else if (!validateEmail(champEmail.value)) ErrorMail = "Mail n'est pas valide <br>";

            Total = ErrorNom + ErrorPrenom + DateVide + ErrorDate + ErrorAdresse + ErrorMail;

            if (Total !== "") {
                modalBodyError.innerHTML = Total;
                var myModal_Error = new bootstrap.Modal(document.getElementById('myModal-Error'));
                myModal_Error.show();
            } else {

                modalTitleDisplay.innerHTML = "Bienvenue,  " + champNom.value + "  " + champPrenom.value;
                modalBodyDisplay.innerHTML = "Vous êtes nés le  " + champDate.value + ",  et vous habitez à";

                var mapImage = document.createElement('img');
                var mapURL = "https://maps.googleapis.com/maps/api/staticmap?center=" + encodeURIComponent(champAdresse.value)
                    + "&markers=color:red%7Clabel:C%7C" + encodeURIComponent(champAdresse.value)
                    + "&zoom=13&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
                mapImage.src = mapURL;
                modalBodyDisplay.appendChild(mapImage);

                var additionalMessage = document.createElement('p');
                var linkToGoogleMaps = document.createElement('a');

                linkToGoogleMaps.href = "https://www.google.com/maps/search/" + encodeURIComponent(champAdresse.value);
                linkToGoogleMaps.innerHTML = champAdresse.value;
                additionalMessage.appendChild(linkToGoogleMaps);

                modalBodyDisplay.appendChild(additionalMessage);

                var myModal_Display = new bootstrap.Modal(document.getElementById('myModal-Display'));
                myModal_Display.show();
            }
        } /*else {
            // Réinitialiser le message d'erreur
            messageErreur.textContent = "";

            // Soumettre le formulaire si la validation est réussie
            formulaire.submit();
        }*/
    }

    // Écouter l'événement "submit" du formulaire
    formulaire.addEventListener("submit", validerFormulaire);

};