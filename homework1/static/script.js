// Array to store application data
const applications = [];

// Function to submit an application to the list and send it to the server
function submit() {
    const name = document.getElementById('name').value;
    const zipcode = document.getElementById('zipcode').value;
    
     // Validate inputs
     if (!name || !zipcode) {
        alert("Please fill out both Name and Zipcode.");
        return;
    }
    
    const formattedName = name.replace(/\s+/g,'').toLowerCase();
    const appNumber = `${formattedName}_${zipcode}`;
    const appStatus = "Received";
    
    // Create a JSON object with application data
    const applicationData = {
        appNumber: appNumber,
        appStatus: appStatus
    };

    // Send the application data to the server via POST request
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

            // Add the new application data to the applications array
            applications.push(applicationData);
            console.log(applications)

            // Refresh the application list
            displayApplications();
        })
        .catch(error => {
            console.error('Error adding application:', error);
        });
}

// Function to display applications in the list
function displayApplications() {
    const appList = document.getElementById('applicationList');
    appList.innerHTML = ''; // Clear existing application list

    applications.forEach(application => { 
        const appElement = document.createElement('div');
        appElement.innerHTML = `
            <h2>Added Successfully :${application.appNumber}</h2>
        `;
        appList.appendChild(appElement);
    });
}

// Funciton to check the status of an application
function checkStatus(){
    const appNumber = document.getElementById('appNumberCheck').value.trim();
    
    fetch(`/api/check_appStatus/${appNumber}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const statusElement = document.getElementById('applicationStatus');
        if (data.status){
            statusElement.innerHTML = `Application Status: ${data.status}`;
        } else {
            statusElement.innerHTML = 'Application Status: Not Found';
        }
    })
    .catch(error => {
        console.error('Error fetching application status:', error);
    })
}

// Function to change the status of the application
function changeAppStatus(){
    const appNumber = document.getElementById('appNumberChange').value.trim();
    const appStatus = document.getElementById('statusOptions').value;
    fetch(`api/change_appStatus/${appNumber}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({appStatus: appStatus})
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error updating status:', error));
}
// Function to fetch and display all applications from the server
function showAllApplications() {
    fetch('/api/allApplications')
        .then(response => response.json())
        .then(data => {
            const appList = document.getElementById('allApplications');
            appList.innerHTML = ''; // Clear existing application list
            console.log(data);
            appList.textContent = JSON.stringify(data); // Display the list as a string
        })
        .catch(error => {
            console.error('Error fetching all applications:', error);
        });
}