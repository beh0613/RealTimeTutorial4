document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');
    
    // Validate email
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Validate password
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        document.getElementById('passwordError').innerText = 'Password must be at least 8 characters.';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitButton = document.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Logging in...';
        }

        // Function to make the login request
        const makeLoginRequest = () => {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            // Convert FormData to URLSearchParams for better compatibility
            const searchParams = new URLSearchParams();
            for (const pair of formData) {
                searchParams.append(pair[0], pair[1]);
            }

            // Log attempt
            console.log('Making login request to:', 'https://triptact.cmsa.digital/login.php');

            return fetch('https://triptact.cmsa.digital/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: searchParams.toString(),
                credentials: 'include',
                mode: 'cors'
            });
        };

        // Check for Cordova environment
        if (window.cordova) {
            console.log('Running in Cordova environment');
            
            // Check network status first
            document.addEventListener('deviceready', () => {
                if (navigator.connection.type === Connection.NONE) {
                    alert('No internet connection available. Please check your connection and try again.');
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Login';
                    }
                    return;
                }

                // Make the request with network check
                makeLoginRequest()
                    .then(handleResponse)
                    .catch(handleError);
            });
        } else {
            console.log('Running in web environment');
            makeLoginRequest()
                .then(handleResponse)
                .catch(handleError);
        }

        // Response handler function
        function handleResponse(response) {
            console.log('Response received:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json()
                .then(data => {
                    console.log('Response data:', data);
                    if (data.success) {
                        // Store login state
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userId', data.user_id);
                        
                        alert('Login successful!');
                        window.location.href = 'travel.html';
                    } else {
                        throw new Error(data.error || 'Login failed');
                    }
                });
        }

        // Error handler function
        function handleError(error) {
            console.error('Login error:', error);
            let errorMessage = '';
            
            if (!navigator.onLine) {
                errorMessage = 'No internet connection. Please check your connection and try again.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Unable to connect to the server. Please check your internet connection or try again later.';
            } else {
                errorMessage = error.message || 'An error occurred during login. Please try again.';
            }
            
            alert(errorMessage);
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
            }
        }
    }
});

// Add network status listeners for Cordova
document.addEventListener('deviceready', function() {
    document.addEventListener('online', function() {
        console.log('Device is online');
    }, false);
    
    document.addEventListener('offline', function() {
        console.log('Device is offline');
        alert('Internet connection lost');
    }, false);
});