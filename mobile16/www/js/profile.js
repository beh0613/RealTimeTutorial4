function toggleNav() {
    var sideNav = document.getElementById("sideNav");
    if (sideNav.style.width === "250px") {
        sideNav.style.width = "0";
    } else {
        sideNav.style.width = "250px";
    }
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://triptact.cmsa.digital/profile.php", {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
    })
    .then(response => response.text())  // Change to text() temporarily for debugging
    .then(data => {
        console.log("Raw response:", data);  // Debug line
        try {
            const jsonData = JSON.parse(data);
            if (jsonData.error) {
                console.log("Session error:", jsonData.error);  // Debug line
                alert(jsonData.error);
                window.location.href = "login.html";
            } else {
                document.getElementById("username").textContent = jsonData.username;
                document.getElementById("email").textContent = jsonData.email;
                document.getElementById("birthday").textContent = jsonData.birthday;
                document.getElementById("gender").textContent = jsonData.gender;

                const profilePic = document.getElementById("profile-pic");
                if (jsonData.gender === "Female") {
                    profilePic.src = "img/female.gif";
                } else if (jsonData.gender === "Male") {
                    profilePic.src = "img/male.gif";
                } else {
                    profilePic.src = "img/other.gif";
                }
            }
        } catch (e) {
            console.error("JSON parse error:", e, "Raw data:", data);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
});


function editField(field) {
    const span = document.getElementById(field);
    const currentValue = span.textContent;

    let inputElement;

    if (field === "birthday") {
        inputElement = document.createElement("input");
        inputElement.type = "date";
    } else if (field === "gender") {
        inputElement = document.createElement("select");
        ["Male", "Female", "Other"].forEach(optionValue => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            if (optionValue === currentValue) {
                option.selected = true;
            }
            inputElement.appendChild(option);
        });
    } else {
        inputElement = document.createElement("input");
        inputElement.type = "text";
    }

    inputElement.value = currentValue;
    span.textContent = "";
    span.appendChild(inputElement);

    document.getElementById("save-btn").style.display = "block";
}

function saveProfile() {
    const username = document.querySelector("#username input")?.value || document.getElementById("username").textContent;
    const birthday = document.querySelector("#birthday input")?.value || document.getElementById("birthday").textContent;
    const gender = document.querySelector("#gender select")?.value || document.getElementById("gender").textContent;

    fetch("https://triptact.cmsa.digital/editProfile.php", {
        method: "POST",
        credentials: 'include',
        mode: 'cors', // Important for session cookies
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, birthday, gender })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Profile updated successfully!");
            location.reload();
        } else {
            alert(data.error || "Error updating profile");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to update profile. Please try again later.");
    });
}
// Function to confirm logout
function confirmLogout() {
    const isConfirmed = confirm("Are you sure you want to logout?");
    if (isConfirmed) {
        // Send a request to the logout.php script
        fetch("https://triptact.cmsa.digital/logout.php", {
            method: 'GET',
            credentials: 'include', // Include session cookies
            mode: 'cors' // Cross-origin requests
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // The server handles the redirection, so we don't need to redirect here
            console.log("Logout successful");
            window.location.href = "index.html";

        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
    }
}


