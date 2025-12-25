let travelData = {};

// Load JSON data
fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
  });

// Runs ONLY when Search button is clicked
function searchPlaces() {
  const inputField = document.getElementById("searchInput");
  const keyword = inputField.value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");

  // Clear previous results
  resultsDiv.innerHTML = "";

  // BEACH keyword logic
  if (keyword === "beach" || keyword === "beaches") {
    travelData.beaches.forEach(beach => {
      createCard(beach);
    });
  }

  // TEMPLE keyword logic
  else if (keyword === "temple" || keyword === "temples") {
    travelData.temples.forEach(temple => {
      createCard(temple);
    });
  }

  // COUNTRY keyword logic
  else if (keyword === "country" || keyword === "countries") {
    travelData.countries.forEach(country => {
      country.cities.forEach(city => {
        createCard(city);
      });
    });
  }

  // Invalid keyword
  else {
    resultsDiv.innerHTML =
      "<p>Please enter a valid keyword: beach, temple, or country.</p>";
  }
}

// Create result card
function createCard(place) {
  const resultsDiv = document.getElementById("results");

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${place.imageUrl}" alt="${place.name}">
    <div class="card-content">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    </div>
  `;

  resultsDiv.appendChild(card);
  resultsDiv.scrollIntoView({ behavior: "smooth" });

}

// Clear button logic (Task 9)
function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
}
