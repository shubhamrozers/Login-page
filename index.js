document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('loginMessage').textContent = '';

    // Get form inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Validate email with allowed domains
    if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email from the allowed domains (e.g., gmail.com, yahoo.com).';
        return;
    }

    // Validate password
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';

    // Mock API login call
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        // Hide spinner
        document.getElementById('loadingSpinner').style.display = 'none';

        // Simulate success or error
        if (data.id) {
            document.getElementById('loginMessage').textContent = 'Login successful!';
            document.getElementById('loginMessage').style.color = 'green';
        } else {
            document.getElementById('loginMessage').textContent = 'Login failed. Please check your credentials.';
            document.getElementById('loginMessage').style.color = 'red';
        }
    })
    .catch(error => {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('loginMessage').textContent = 'An error occurred. Please try again later.';
        document.getElementById('loginMessage').style.color = 'red';
    });
});

// Function to validate email and check allowed domains
function validateEmail(email) {
    
    // Regular expression to check basic email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        return false;
    }

    // Check if the domain is in the allowed list
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com']; 
    const emailDomain = email.split('@')[1]; 
    return allowedDomains.includes(emailDomain);
}

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const togglePasswordText = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordText.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        togglePasswordText.textContent = 'Show';
    }
});
