document.addEventListener('DOMContentLoaded', function() {
    fetch('pdf-files.json')
        .then(response => response.json())
        .then(files => {
            const pdfFiles = files.filter(file => file.name.endsWith('.pdf'));
            pdfFiles.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

            const tableBody = document.querySelector('#pdf-table tbody');
            pdfFiles.forEach(file => {
                const row = document.createElement('tr');
                const fileNameCell = document.createElement('td');
                const lastModifiedCell = document.createElement('td');

                const link = document.createElement('a');
                link.href = `pdf/${file.name}`;
                link.textContent = file.name;
                fileNameCell.appendChild(link);

                lastModifiedCell.textContent = new Date(file.lastModified).toLocaleString();

                row.appendChild(fileNameCell);
                row.appendChild(lastModifiedCell);
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching PDF files:', error));
});