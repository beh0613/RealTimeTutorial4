
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
    
    document.getElementById('backButton').addEventListener('click', () => {
window.history.back(); // Navigate to the previous page
});
let allCollections = []; // To store all collection data

function displayCollections(data) {
const collectionList = document.getElementById('collection-list');
collectionList.innerHTML = '';


// Group data by country and state using reduce
const groupedData = {};

for (const item of data) {
    const key = `${item.country || item.hotel_country} - ${item.state || item.hotel_state}`;
    if (!groupedData[key]) {
        groupedData[key] = {
            country: item.country || item.hotel_country,
            state: item.state || item.hotel_state,
            items: [],
        };
    }
    groupedData[key].items.push(item);
}
console.log("Input data:", data);
console.log("Number of items in data:", Array.isArray(data) ? data.length : 0);

console.log(groupedData);


// Loop through the grouped data
for (const [key, group] of Object.entries(groupedData)) {
    const { country, state, items } = group;

   // Create the title for each country and state only once
const sectionHeader = document.createElement('h5');
sectionHeader.textContent = `${state}, ${country}`;

// Apply custom inline styles
sectionHeader.style.fontFamily = 'Arial, sans-serif';
sectionHeader.style.fontWeight = 'bold';
sectionHeader.style.fontSize = '24px';
sectionHeader.style.color = '#2C3E50'; // Dark blue
sectionHeader.style.textAlign = 'center';
sectionHeader.style.marginTop = '20px';
sectionHeader.style.marginBottom = '10px';

collectionList.appendChild(sectionHeader);

    // Loop through each item in the current group (both hotels and attractions)
    items.forEach(item => {
        const collectionItem = document.createElement('div');
        collectionItem.classList.add('col-md-4', 'collection-item');

        collectionItem.innerHTML = `
            <div class="card mb-3">
                ${item.hotel_id ? 
                    `<img src="${item.hotel_image}" class="card-img-top" alt="${item.hotel_name}" />` : 
                    `<img src="${item.attraction_image}" class="card-img-top" alt="${item.attraction_name}" />`
                }

                <div class="card-body d-flex">
                    <!-- Left: Content (80%) -->
                    <div class="content" style="flex: 4;">
                        ${item.hotel_id ? 
                            ` 
                            <h5 class="card-title">${item.hotel_name}</h5>
                            <p class="card-text"><strong>State:</strong> ${item.hotel_state}</p>
                            <p class="card-text"><strong>Country:</strong> ${item.hotel_country}</p>
                            <p class="card-text"><strong>Address:</strong> ${item.hotel_address}</p>
                            <div class="collapse" id="details-${item.hotel_id}">
                                <p class="card-text"><strong>Price Range:</strong> ${item.hotel_price_range}</p>
                                <p class="card-text"><strong>Rating:</strong> ${item.hotel_star_rating} stars</p>
                                <p class="card-text"><strong>Website:</strong> <a href="${item.hotel_website}" target="_blank">${item.hotel_website}</a></p>
                                <p class="card-text"><strong>Nearby Attractions:</strong> ${item.hotel_nearbyAttraction}</p>
                                <p class="card-text"><strong>Description:</strong> ${item.hotel_description}</p>
                            </div>
                            ` : 
                            ` 
                            <h5 class="card-title">${item.attraction_name}</h5>
                            <p class="card-text"><strong>State:</strong> ${item.state}</p>
                            <p class="card-text"><strong>Country:</strong> ${item.country}</p>
                            <div class="collapse" id="details-${item.collection_id}">
                                <p class="card-text"><strong>Category:</strong> ${item.attraction_category}</p>
                                <p class="card-text"><strong>Description:</strong> ${item.attraction_description}</p>
                                <p class="card-text"><strong>Rating:</strong> ${item.attraction_rating} / 5</p>
                                <p class="card-text"><strong>Location:</strong> ${item.attraction_location}</p>
                                <p class="card-text"><strong>Opening Hours:</strong> ${item.attraction_opening_hours}</p>
                                <p class="card-text"><strong>Entrance Fee:</strong> ${item.attraction_entrance_fee}</p>
                                <p class="card-text"><strong>Nearby Attractions:</strong> ${item.attraction_nearby_attraction}</p>
                            </div>
                            `
                        }

                        <a class="btn btn-link p-0 mb-2" data-toggle="collapse" href="#details-${item.hotel_id ? item.hotel_id : item.collection_id}" role="button" aria-expanded="false" aria-controls="details-${item.hotel_id ? item.hotel_id : item.collection_id}">
                            Read More
                        </a>
                    </div>

                    <!-- Right: Buttons (20%) -->
                    <div class="buttons text-right" style="flex: 1; display: flex; flex-direction: column; gap: 10px; justify-content: flex-start;">
                        <button class="btn btn-primary" onclick="navigateToJournal(${item.collection_id})">Journal</button>
                        <button class="btn btn-success" onclick="navigateToWeather(${item.collection_id})">Weather</button>
                        <button class="btn btn-danger shadow-sm" onclick="deleteCollection(${item.collection_id})">Delete</button>
                    </div>
                </div>
            </div>
        `;

        collectionList.appendChild(collectionItem);
    });
}
}


function loadCollections() {
    fetch('https://triptact.cmsa.digital/myTrip.php?action=fetch', {
        credentials: 'include',
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            allCollections = data;
            displayCollections(data);
        })
        .catch(error => {
            console.error('Error fetching collection data:', error);
        });
}


// Perform the delete request using fetch
function deleteCollection(collectionId) {
    if (!confirm("Are you sure you want to delete this collection?")) return;

    fetch(`https://triptact.cmsa.digital/myTrip.php?action=delete&collection_id=${collectionId}`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Collection deleted successfully!");
                loadCollections(); // Refresh collections
            } else {
                alert("Failed to delete collection: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error deleting collection:", error);
            alert("An error occurred while deleting the collection.");
        });
}

function navigateToJournal(collectionId) {
// Redirect to journal_form.html with collection_id as a query parameter
window.location.href = `journalForm.html?collection_id=${collectionId}`;
}

function navigateToWeather(collectionId) {
// Redirect to the weather page, passing the collection_id in the URL
window.location.href = `weather.html?collection_id=${collectionId}`;
}

// Fetch collections data and display them
// Fetch collections data and display them
fetch('https://triptact.cmsa.digital/myTrip.php?action=fetch', {
    credentials: 'include',
    mode: 'cors'
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse as JSON
    })
    .then(data => {
        console.log("Fetched data:", data); // Log parsed JSON data
        allCollections = data; // Assign data to global variable
        displayCollections(data); // Display collections
    })
    .catch(error => {
        console.error('Error fetching collection data:', error);
    });

