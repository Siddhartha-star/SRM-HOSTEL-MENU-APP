// Get reference to the database
const database = firebase.database();

// Get reference to the feedback form
const feedbackForm = document.getElementById('feedbackForm');

// Handle form submission
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toISOString();

    // Create feedback object
    const feedbackData = {
        name: name,
        email: email,
        category: category,
        message: message,
        timestamp: timestamp,
        status: 'new' // for tracking feedback status
    };

    // Push feedback to Firebase
    database.ref('feedback').push(feedbackData)
        .then(() => {
            // Show success message
            showAlert('Feedback submitted successfully!', 'success');
            // Reset form
            feedbackForm.reset();
        })
        .catch((error) => {
            // Show error message
            showAlert('Error submitting feedback: ' + error.message, 'error');
        });
});

// Function to show alert messages
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Add alert styles
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.padding = '15px';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.zIndex = '1000';

    if (type === 'success') {
        alertDiv.style.backgroundColor = '#4CAF50';
        alertDiv.style.color = 'white';
    } else {
        alertDiv.style.backgroundColor = '#f44336';
        alertDiv.style.color = 'white';
    }

    document.body.appendChild(alertDiv);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}