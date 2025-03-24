const PAGE_ACCESS_TOKEN = "TU_TOKEN_DE_ACCESO";
const POST_ID = "573785479149385_122095125356781154";  // Reemplázalo con un post válido

async function getComments() {
    try {
        const response = await fetch(`https://graph.facebook.com/v18.0/${POST_ID}/comments?fields=from,message,created_time&access_token=${PAGE_ACCESS_TOKEN}`);
        const data = await response.json();

        if (data.error) {
            console.error("Error:", data.error.message);
            return;
        }

        displayComments(data.data);
    } catch (error) {
        console.error("Error al obtener los comentarios:", error);
    }
}

function displayComments(comments) {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";  // Limpia la lista antes de agregar nuevos comentarios

    comments.forEach(comment => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${comment.from.name}:</strong> ${comment.message} <br><small>${comment.created_time}</small>`;
        commentsList.appendChild(li);
    });
}

// Ejecutar la función cuando cargue la página
document.addEventListener("DOMContentLoaded", getComments);
