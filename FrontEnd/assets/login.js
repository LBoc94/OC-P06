const form = document.querySelector("form");
form.addEventListener("submit", submitForm);

async function submitForm(event) {
    event.preventDefault();

    // POST DE L'API   
    try {
        const url = "http://localhost:5678/api/users/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            email: email.value,
            password: password.value
            })
        });
        const responseData = await response.json();

    // REPONSE STATUT SERVEUR OK
      if (response.status === 200) {
        const token = responseData.token;
        window.localStorage.setItem("token", token);
        window.location.href = "./index.html";

    // REPONSE STATUT ERREURS
      } else if (response.status === 401 || 404) {
        alert("E-mail ou mot de passe incorrect.");
      }

    // CATCH ERREURS
    } catch (error) {
      alert("Une erreur est survenue lors de la connexion.<br>Veuillez réessayer.");
    }
};
