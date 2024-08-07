document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tableName = urlParams.get('table');
    
    const tableNameDiv = document.getElementById('table-name');
    tableNameDiv.textContent = 'Tabla: ' + tableName;
    
    // Aquí puedes agregar la lógica para mostrar y manejar las consultas en la tabla
});