const earthquakeList = document.getElementById("earthquakeList");
const countryFilter = document.getElementById("countryFilter");
const magnitudeSort = document.getElementById("magnitudeSort");
const timeRange = document.getElementById("timeRange");

const feeds = {
  week: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
  month: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
  "3months": "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + getPastDate(90),
  "6months": "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + getPastDate(180),
  year: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + getPastDate(365),
};

function getPastDate(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

function fetchEarthquakes(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let earthquakes = data.features;

      // Filter by country
      const country = countryFilter.value.toLowerCase();
      if (country) {
        earthquakes = earthquakes.filter(eq =>
          eq.properties.place && eq.properties.place.toLowerCase().includes(country)
        );
      }

      // Sort by magnitude
      if (magnitudeSort.value === "high") {
        earthquakes.sort((a, b) => b.properties.mag - a.properties.mag);
      } else if (magnitudeSort.value === "low") {
        earthquakes.sort((a, b) => a.properties.mag - b.properties.mag);
      }

      displayEarthquakes(earthquakes);
    });
}

function displayEarthquakes(earthquakes) {
  earthquakeList.innerHTML = "";

  if (earthquakes.length === 0) {
    earthquakeList.innerHTML = "<li>No earthquakes found.</li>";
    return;
  }

  earthquakes.forEach(eq => {
    const { place, mag, time } = eq.properties;
    const li = document.createElement("li");
    li.innerHTML = `<strong>${place}</strong><br>Magnitude: ${mag}<br>Date: ${new Date(time).toLocaleString()}`;
    earthquakeList.appendChild(li);
  });
}

// Event listeners
countryFilter.addEventListener("input", () => fetchEarthquakes(feeds[timeRange.value]));
magnitudeSort.addEventListener("change", () => fetchEarthquakes(feeds[timeRange.value]));
timeRange.addEventListener("change", () => fetchEarthquakes(feeds[timeRange.value]));

// Initial load
fetchEarthquakes(feeds["week"]);
