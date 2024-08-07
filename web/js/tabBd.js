document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('columns-table').getElementsByTagName('tbody')[0];
    
    function addRow() {
        const newRow = tableBody.insertRow();
        
        const columns = ['Column Name', 'Datatype', 'PK', 'NN', 'UQ', 'B', 'UN', 'ZF', 'AI', 'G', 'Default/Expression'];
        columns.forEach((column, index) => {
            const cell = newRow.insertCell(index);
            if (index >= 2 && index <= 9) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                cell.appendChild(checkbox);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                cell.appendChild(input);
            }
        });

        newRow.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', handleInputChange);
        });
    }

    function handleInputChange() {
        const lastRow = tableBody.rows[tableBody.rows.length - 1];
        const inputs = lastRow.querySelectorAll('input[type="text"]');
        
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value === '') {
                allFilled = false;
            }
        });

        if (allFilled) {
            addRow();
        }
    }

    document.getElementById('apply').addEventListener('click', function() {
        alert('Aplicar cambios.');
        window.location.href = '/Tablas';
    });

    document.getElementById('revert').addEventListener('click', function() {
        alert('Revertir cambios.');
    });

    // Inicializa con una fila vacía
    addRow();
});