const form = document.querySelector("form");
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const logout = document.querySelector("#headerlogin")
const storedToken = localStorage.token

form.addEventListener("submit", submitForm);

// POST DE L'API   
async function submitForm(event) {
    event.preventDefault();

    // APPEL API
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

    // REPONSE STATUT OK
        if (response.status === 200) {
            const token = responseData.token;
            localStorage.setItem("token", token);
            return window.location.href = "./index.html";

    // REPONSE STATUT ERREURS
        } else if (response.status === 401) {
            alert("Erreur dans l’identifiant ou le mot de passe.");
        } else if (response.status === 404) {
            alert("Utilisateur non trouvé.");
        }

    // CATCH ERREURS
    } catch (error) {
      alert("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    }
}