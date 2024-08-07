document.addEventListener('DOMContentLoaded', function() {
    const tables = [
        { database: 'database1', name: 'table1' },
        { database: 'database1', name: 'table2' },
        { database: 'database2', name: 'table1' }
    ];

    const tableBody = document.querySelector('#tables-table tbody');

    function loadTables() {
        tableBody.innerHTML = '';
        tables.forEach(table => {
            const row = document.createElement('tr');

            const dbCell = document.createElement('td');
            dbCell.textContent = table.database;
            row.appendChild(dbCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = table.name;
            row.appendChild(nameCell);

            const actionsCell = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.classList.add('button', 'edit');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editTable(table.database, table.name));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('button', 'delete');
            deleteButton.textContent = 'Borrar';
            deleteButton.addEventListener('click', () => deleteTable(table.database, table.name));
            actionsCell.appendChild(deleteButton);

            const queryButton = document.createElement('button');
            queryButton.classList.add('button', 'query');
            queryButton.textContent = 'Consultas';
            queryButton.addEventListener('click', () => queryTable(table.database, table.name));
            actionsCell.appendChild(queryButton);

            row.appendChild(actionsCell);
            tableBody.appendChild(row);
        });
    }

    function editTable(database, name) {
        alert(`Editar ${database}.${name}`);
        // Lógica para editar la tabla
    }

    function deleteTable(database, name) {
        if (confirm(`¿Estás seguro de que deseas borrar ${database}.${name}?`)) {
            const index = tables.findIndex(table => table.database === database && table.name === name);
            if (index !== -1) {
                tables.splice(index, 1);
                loadTables();
            }
        }
    }

    function queryTable(database, name) {
        alert(`Consultas en ${database}.${name}`);
        // Redirige a consultas pasando el nombre de la base de datos y de la tabla como parámetros
        window.location.href = `/Consultas?db=${database}&table=${name}`;
    }

    loadTables();
});