document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar las bases de datos desde el servidor
    async function loadDatabases() {
        try {
            const response = await fetch('/api/basesDatos');
            if (!response.ok) {
                throw new Error('Error al cargar las bases de datos');
            }
            const databases = await response.json();
            const tableBody = document.querySelector('#databases-table tbody');
            tableBody.innerHTML = '';

            databases.forEach(db => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = db.name;
                row.appendChild(nameCell);

                const actionsCell = document.createElement('td');

                const editButton = document.createElement('button');
                editButton.classList.add('button', 'edit');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => editDatabase(db.name));
                actionsCell.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('button', 'delete');
                deleteButton.textContent = 'Borrar';
                deleteButton.addEventListener('click', () => deleteDatabase(db.name));
                actionsCell.appendChild(deleteButton);

                const viewTablesButton = document.createElement('button');
                viewTablesButton.classList.add('button', 'view-tables');
                viewTablesButton.textContent = 'Ver Tablas';
                viewTablesButton.addEventListener('click', () => viewTables(db.name));
                actionsCell.appendChild(viewTablesButton);

                const addTablesButton = document.createElement('button');
                addTablesButton.classList.add('button', 'add-tables');
                addTablesButton.textContent = 'Agregar Tablas';
                addTablesButton.addEventListener('click', () => addTables(db.name));
                actionsCell.appendChild(addTablesButton);

                row.appendChild(actionsCell);
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function editDatabase(name) {
        alert('Editar ' + name);
        // Lógica para editar la base de datos
    }

    async function deleteDatabase(name) {
        if (confirm('¿Estás seguro de que deseas borrar ' + name + '?')) {
            try {
                const response = await fetch(`/borrarBD/${name}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    loadDatabases(); // Recarga las bases de datos después de eliminar
                } else {
                    alert('Error al borrar la base de datos');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    function viewTables(name) {
        window.location.href = `/Tablas?db=${name}`;
    }

    function addTables(name) {
        window.location.href = `/CrearTabla?db=${name}`;
    }

    loadDatabases();
});