// Array to store book data
const applications = [];

// Function to submit an application to the list and send it to the server
function submit() {
    const name = document.getElementById('name').value;
    const zipcode = document.getElementById('zipcode').value;
    name = name.replace(/\s+/g,'').toLowerCase();
    const appNumber = '${name}_${zipcode}';
    
    // Create a JSON object with book data
    const applicationData = {
        appNumber: appNumber
    };

    // Send the book data to the server via POST request
    fetch('/api/add_appNumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
    })
        .then(response => response.json())
        .then(data => {
            // Display a success message or handle errors if needed
            console.log(data.message);

            // Add the new book data to the books array
            applications.push(applicationData);
            console.log(applications)

            // Refresh the book list
            displayApplications();
        })
        .catch(error => {
            console.error('Error adding application:', error);
        });
}

// Function to display books in the list
function displayApplications() {
    const appList = document.getElementById('appList');
    appList.innerHTML = ''; // Clear existing book list

    applications.forEach(application => { 
        const appElement = document.createElement('div');
        appElement.innerHTML = `
            <h2>Added Successfully :${application.appNumber}</h2>
        `;
        appList.appendChild(appElement);
    });
}
// Function to fetch and display all books from the server
function showAllBooks() {
    fetch('/api/books')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('allbooks');
            bookList.innerHTML = ''; // Clear existing book list
            console.log(data);
            bookList.textContent = JSON.stringify(data); // Display the list as a string
        })
        .catch(error => {
            console.error('Error fetching all books:', error);
        });
}