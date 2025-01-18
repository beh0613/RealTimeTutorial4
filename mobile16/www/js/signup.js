document.getElementById('signupForm').addEventListener('submit', function (event) {
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

    // Validate username
    const username = document.getElementById('username').value;
    if (username === "") {
        document.getElementById('usernameError').innerText = 'Username is required.';
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }

    // Validate birthday
    const birthday = document.getElementById('birthday').value;
    if (birthday === "") {
        document.getElementById('birthdayError').innerText = 'Birthday is required.';
        document.getElementById('birthdayError').style.display = 'block';
        isValid = false;
    }

    // Validate password
    const password = document.getElementById('password').value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').innerText = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special symbol.';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Validate gender
    const gender = document.getElementById('gender').value;
    if (gender === "") {
        document.getElementById('genderError').innerText = 'Gender is required.';
        document.getElementById('genderError').style.display = 'block';
        isValid = false;
    }

    // Check if any field is not filled
    if (!email || !username || !birthday || !password || !gender) {
        alert('Please fill in all fields!');
        isValid = false;
    }

    // If all validations are passed, proceed to check if email already exists
      // If all validations are passed, proceed to check if email already exists
      if (isValid) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://triptact.cmsa.digital/check_email.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText); // Parse the server's JSON response

                    if (response.success) {
                        alert(response.message); // Success message
                        submitFormData();
                        window.location.href = "login.html";
                    } else {
                        alert(response.message); // Error message from the server
                    }
                } catch (error) {
                    alert("An error occurred while processing the server response.");
                }
            }

        };

        xhr.onerror = function () {
            alert("An error occurred during the request. Please check your connection.");
        };

        xhr.send("email=" + encodeURIComponent(email));
    }

});

function submitFormData() {
    const form = document.getElementById('signupForm');
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://triptact.cmsa.digital/signup.php", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);

                if (response.success) {
                    alert(response.message); // Display success message
                    // Redirect to login page after successful signup

                } else {
                    alert(`Error: ${response.message}`); // Display error message from response
                }
            } catch (error) {
                alert("An error occurred while processing the response.");
            }
        }
    };

    xhr.onerror = function () {
        alert("An error occurred during the request. Please check your connection.");
    };

    xhr.send(formData);
}

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
});

// Add input event listeners to show error messages while typing
document.getElementById('email').addEventListener('input', function () {
    const email = this.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        document.getElementById('emailError').style.display = 'block';
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
});

document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').innerText = 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special symbol.';
        document.getElementById('passwordError').style.display = 'block';
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
});

document.getElementById('username').addEventListener('input', function () {
    const username = this.value;
    if (username === "") {
        document.getElementById('usernameError').innerText = 'Username is required.';
        document.getElementById('usernameError').style.display = 'block';
    } else {
        document.getElementById('usernameError').style.display = 'none';
    }
});

document.getElementById('birthday').addEventListener('input', function () {
    const birthday = this.value;
    if (birthday === "") {
        document.getElementById('birthdayError').innerText = 'Birthday is required.';
        document.getElementById('birthdayError').style.display = 'block';
    } else {
        document.getElementById('birthdayError').style.display = 'none';
    }
});

document.getElementById('gender').addEventListener('change', function () {
    const gender = this.value;
    if (gender === "") {
        document.getElementById('genderError').innerText = 'Gender is required.';
        document.getElementById('genderError').style.display = 'block';
    } else {
        document.getElementById('genderError').style.display = 'none';
    }
});


