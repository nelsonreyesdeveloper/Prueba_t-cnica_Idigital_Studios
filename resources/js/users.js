document.addEventListener("DOMContentLoaded", function () {
    /* Guardar Usuario */

    const form = document.querySelector("#form-users");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contraseña = document.getElementById("contraseña").value;
        const rol = document.getElementById("rol").value;

        const id = document.querySelector('input[name="id"]')
            ? document.querySelector('input[name="id"]').value
            : "";

        if (id) {
            fetch("/users/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]  '
                    ).content,
                },
                body: JSON.stringify({
                    name: nombre,
                    email: correo,
                    password: contraseña,
                    role: rol,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "successfully") {
                        fetchUsers();
                        alert("Usuario actualizado correctamente.");

                        //cerrar modal
                        const modal = document.getElementById("myModal");
                        modal.classList.add("hidden");

                        //vaciar campos
                        document.getElementById("nombre").value = "";
                        document.getElementById("correo").value = "";
                        document.getElementById("contraseña").value = "";
                        document.getElementById("rol").value = "";

                        //eliminar id del form
                        if (document.querySelector('input[name="id"]')) {
                            document.querySelector('input[name="id"]').remove();
                            //cambiar texto al boton
                            document.getElementById(
                                "actualizar-guardar"
                            ).innerText = "Guardar";
                        }
                    } else {
                        alert(data.error);
                    }
                })
                .catch((error) => console.error("Error updating user:", error));

            return;
        }

        if (!nombre || !correo || !contraseña || !rol) {
            alert("Todos los campos son requeridos.");
            return;
        }

        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]  '
                ).content,
            },
            body: JSON.stringify({
                name: nombre,
                email: correo,
                password: contraseña,
                role: rol,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "successfully") {
                    fetchUsers();
                    alert("Usuario creado correctamente.");

                    //cerrar modal
                    const modal = document.getElementById("myModal");
                    modal.classList.add("hidden");

                    //vaciar campos
                    document.getElementById("nombre").value = "";
                    document.getElementById("correo").value = "";
                    document.getElementById("contraseña").value = "";
                    document.getElementById("rol").value = "";
                } else {
                    alert(data.error);
                }
            })
            .catch((error) => console.error("Error creating user:", error));
    });

    //modal
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");
    const modal = document.getElementById("myModal");

    openModalButton.addEventListener("click", function () {
        modal.classList.add("flex");
        modal.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
    });

    closeModalButton.addEventListener("click", function () {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.classList.remove("overflow-hidden");

        //vaciar campos

        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("contraseña").value = "";
        document.getElementById("rol").value = "";

        //eliminar id del form
        if (document.querySelector('input[name="id"]')) {
            document.querySelector('input[name="id"]').remove();
            //cambiar texto al boton
            document.getElementById("actualizar-guardar").innerText = "Guardar";
        }
    });

    const searchInput = document.getElementById("search");
    const usersTable = document.getElementById("users-table");
    const paginationLinks = document.getElementById("pagination-links");

    const userDelete = document.getElementById("user-delete");

    usersTable.addEventListener("click", function (e) {
        if (e.target.id === "user-delete") {
            const userId =
                e.target.parentElement.parentElement.querySelector(
                    "td"
                ).innerText;
            if (confirm("¿Estás seguro de eliminar este usuario?")) {
                fetch("/users/" + userId, {
                    method: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector(
                            'meta[name="csrf-token"]'
                        ).content,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.message === "successfully") {
                            fetchUsers();
                            alert("Usuario eliminado correctamente.");
                        } else {
                            alert("Error al eliminar el usuario.");
                        }
                    })
                    .catch((error) =>
                        console.error("Error deleting user:", error)
                    );
            }
        }

        if (e.target.innerText === "Editar") {
            const userId = e.target.dataset.id;
            fetch("/users/" + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById("nombre").value = data.name;
                    document.getElementById("correo").value = data.email;
                    document.getElementById("rol").value =
                        data.role_id !== undefined ? data.role_id : "";
                    document.getElementById("contraseña").value = "";

                    //insertar id en el form
                    const idInput = document.createElement("input");
                    idInput.type = "hidden";
                    idInput.name = "id";
                    idInput.value = data.id;
                    form.appendChild(idInput);

                    const modal = document.getElementById("myModal");
                    modal.classList.add("flex");
                    modal.classList.remove("hidden");
                    document.body.classList.add("overflow-hidden");

                    //cambiar texto al boton

                    document.getElementById("actualizar-guardar").innerText =
                        "Actualizar";
                })
                .catch((error) => console.error("Error fetching user:", error));
        }
    });
    searchInput.addEventListener("input", function () {
        fetchUsers();
    });

    function fetchUsers(page = 1) {
        const searchValue = searchInput.value.trim();

        fetch("/users/json?page=" + page + "&search=" + searchValue)
            .then((response) => response.json())
            .then((data) => {
                usersTable.innerHTML = "";
                paginationLinks.innerHTML = "";

                if (data.data.length > 0) {
                    data.data.forEach((user) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                                <td class="border px-4 py-2">${user.id}</td>
                                <td class="border px-4 py-2">${user.name}</td>
                                <td class="border px-4 py-2">${user.email}</td>
                                <td class="border px-4 py-2">${user.created_at}</td>
                                <td class="border px-4 py-2">
                              
                                    <div class="flex gap-2 flex-column ">
                                        <button class="bg-red-600 block p-2 text-white rounded-sm" id="user-delete">Eliminar</button>
                                <button data-id="${user.id}" class="bg-orange-600 block p-2 text-white rounded-sm">Editar</button>
                                        </div>
                               
                                </td>

                                
                            `;
                        usersTable.appendChild(row);
                    });

                    data.links.forEach((link) => {
                        const button = document.createElement("button");

                        // Eliminar los caracteres "&raquo;" y "&laquo;" del texto del botón
                        const buttonText = link.label.replace(
                            /&raquo;|&laquo;/g,
                            ""
                        );
                        button.innerText = buttonText.trim(); // Eliminar espacios en blanco alrededor del texto

                        // Establecer clases comunes para todos los botones
                        button.className =
                            "px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600";

                        // Agregar clase específica para el botón activo
                        if (link.active) {
                            button.classList.add("bg-blue-600");
                            button.disabled = true;
                        } else if (link.url) {
                            // Agregar evento de clic para cargar la página correspondiente
                            button.addEventListener("click", () =>
                                fetchUsers(link.url.split("page=")[1])
                            );
                            button.classList.add("hover:bg-blue-700");
                        }

                        // Agregar el botón al contenedor de paginación
                        paginationLinks.appendChild(button);
                    });
                } else {
                    const row = document.createElement("tr");
                    row.innerHTML = `<td class="border px-4 py-2" colspan="4">No hay Usuarios.</td>`;
                    usersTable.appendChild(row);
                }
            })
            .catch((error) => console.error("Error fetching users:", error));
    }

    fetchUsers();
});
